import { waitUntil } from 'async-wait-until';
import { User, Matchmaking, Round, Stats } from '@pokefumi/pokefumi-api';
import { node, ExecaChildProcess } from 'execa';
import { faker } from '@faker-js/faker';
import { join } from 'path';
import knex from 'knex';
import tableClean from 'knex-tablecleaner';

const JWT_SECRET = 'ILIKETOTESTPOTATOES';
const processes: ExecaChildProcess[] = [];
const author = {
  username: faker.internet.userName(),
  password: 'password',
  statut: 'online',
  score: 0,
};

const opponent = {
  username: faker.internet.userName(),
  password: 'motdepasse',
  statut: 'online',
  score: 0,
};
// WORKAROUND: permet de passer une valeur entre les tests : impliquent qu'ils soient executer en séquentiel
export interface global {}
declare global {
  var authorId: number;
  var opponentId: number;
  var authorToken: string;
  var opponentToken: string;
  var matchId: number;
}

beforeAll(async () => {
  // juste pour empêcher les messages d'erreurs dans la console
  const tmp = console.error;

  // nettoyage des BDDs
  // une bdd par table
  for (const db of [
    ['stats', 'StatRound'],
    ['user', 'User'],
    ['matchmaking', 'Match'],
  ]) {
    const conn = knex({
      client: 'sqlite3',
      connection: {
        filename: join(__dirname, '../../../../apps', db[0], `prisma/${db[0]}.sqlite`),
      },
    });
    try {
      await tableClean.cleanTables(conn, [db[1]], true);
    } catch (e) {}
    conn.destroy();
  }

  // on fork chaque processus node pour chaque service. Bref on les lance tous en meme temps
  for (const name of ['stats', 'user', 'round', 'matchmaking']) {
    processes.push(
      node(join(__dirname, '../../../../', `dist/apps/${name}/main.js`), {
        env: {
          JWT_SECRET,
        },
        stdin: process.stdin,
        stdout: process.stdout,
        stderr: process.stderr,
        cleanup: true,
        cwd: join(__dirname, '../../../../'),
        detached: false,
      }),
    );
  }
  // on attend que tous les services soient up
  await Promise.all([
    waitUntil(async () => (await User.UserService.getAllUsers().catch(e => {})) !== undefined, { intervalBetweenAttempts: 500 }),
    waitUntil(async () => (await Matchmaking.MatchesService.getAllMatches().catch(e => {})) !== undefined, { intervalBetweenAttempts: 500 }),
    waitUntil(async () => (await Round.DefaultService.getApi().catch(e => {})) !== undefined, { intervalBetweenAttempts: 500 }),
    waitUntil(async () => (await Stats.RoundService.getRoundsAdayLast30Days().catch(e => {})) !== undefined, { intervalBetweenAttempts: 500 }),
  ]);
  console.error = tmp;
}, 20 * 1000);

describe('simple scenario', () => {
  beforeAll(async () => {
    const user = await User.UserService.createUser(author);
    expect(user).toEqual(expect.objectContaining({ username: author.username, score: author.score, statut: author.statut }));
    expect(user.password).not.toEqual(author.password); // devrait etre hashé
    global.authorId = user.id!;
  });
  beforeAll(async () => {
    const user = await User.UserService.createUser(opponent);
    expect(user).toEqual(expect.objectContaining({ username: opponent.username, score: opponent.score, statut: opponent.statut }));
    global.opponentId = user.id!;
  });

  /*
  ###############################################################################################
  User
  ###############################################################################################
  */
  describe('user-service', () => {
    it('should get author', async () => {
      const user = await User.UserService.getUserById(global.authorId);
      expect(user).toEqual(expect.objectContaining({ username: author.username, score: author.score, statut: author.statut }));
      expect(user.password).not.toEqual(author.password); // devrait etre hashé
    });

    it('should contain author and opponent', async () => {
      const users = await User.UserService.getAllUsers();
      expect(users).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ username: author.username, score: author.score, statut: author.statut }),
          expect.objectContaining({ username: opponent.username, score: opponent.score, statut: opponent.statut }),
        ]),
      );
    });

    it('should connect', async () => {
      const tokenAuthor = await User.UserService.connectUser(author.username, author.password);
      expect(tokenAuthor).toBeTruthy();
      global.authorToken = tokenAuthor;
      const tokenOpponent = await User.UserService.connectUser(opponent.username, opponent.password);
      expect(tokenOpponent).toBeTruthy();
      global.opponentToken = tokenOpponent;
    });

    it('should not connect with an invalid password', async () => {
      const t = () => User.UserService.connectUser(author.username, 'badpassword');
      await expect(t()).rejects.toThrow();
    });

    it('should not connect with an invalid username', async () => {
      const t = () => User.UserService.connectUser('badusername##########', 'badpassword');
      await expect(t()).rejects.toThrow();
    });
  });

  /*
  ###############################################################################################
  # Matchmaking
  ###############################################################################################
  */
  describe('matchmaking-service', () => {
    beforeAll(async () => {
      Matchmaking.OpenAPI.TOKEN = global.authorToken;
      const match = await Matchmaking.MatchesService.createMatch({
        opponentId: global.opponentId,
        deck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      });
      expect(match).toEqual(expect.objectContaining({ authorId: global.authorId, opponentId: global.opponentId }));
      global.matchId = match.id!;
    });

    it('should not create a match with invalid pokemons', async () => {
      Matchmaking.OpenAPI.TOKEN = global.authorToken;

      const m1 = async () =>
        await Matchmaking.MatchesService.createMatch({
          opponentId: global.opponentId,
          deck: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15],
        });
      await expect(m1()).rejects.toThrow();

      const m2 = async () =>
        await Matchmaking.MatchesService.createMatch({
          opponentId: global.opponentId,
          deck: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        });
      await expect(m2()).rejects.toThrow();

      const m3 = async () =>
        await Matchmaking.MatchesService.createMatch({
          opponentId: global.opponentId,
          deck: [1, 2, 3, 4, 5, 6, 7, 8, 9, -5],
        });
      await expect(m3()).rejects.toThrow();
    });

    it('should appears in match list', async () => {
      const matches = await Matchmaking.MatchesService.getAllMatches();
      expect(matches).toEqual(
        expect.arrayContaining([expect.objectContaining({ id: global.matchId, authorId: global.authorId, opponentId: global.opponentId })]),
      );
    });

    it('should be fetchable by id', async () => {
      const match = await Matchmaking.MatchesService.getMatchById(global.matchId);
      expect(match).toEqual(expect.objectContaining({ id: global.matchId, authorId: global.authorId, opponentId: global.opponentId }));
    });

    it('should be an empty list of invitations for author', async () => {
      Matchmaking.OpenAPI.TOKEN = global.authorToken;
      const invitations = await Matchmaking.MatchesService.getAllMatchesWaitingForInvitation();
      expect(invitations).toHaveLength(0);
    });

    it('should be in opponent invitation list', async () => {
      Matchmaking.OpenAPI.TOKEN = global.opponentToken;
      const invitations = await Matchmaking.MatchesService.getAllMatchesWaitingForInvitation();
      expect(invitations).toEqual(expect.arrayContaining([expect.objectContaining({ id: global.matchId, authorId: global.authorId })]));
    });

    it('should join the match and the match should be removed from invitation list', async () => {
      Matchmaking.OpenAPI.TOKEN = global.opponentToken;
      const match = await Matchmaking.MatchesService.joinMatch(global.matchId, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      expect(match).toEqual(
        expect.objectContaining({
          id: global.matchId,
          authorId: global.authorId,
          opponentId: global.opponentId,
          opponentPokemons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        }),
      );
      const invitations = await Matchmaking.MatchesService.getAllMatchesWaitingForInvitation();
      expect(invitations).not.toEqual(expect.arrayContaining([expect.objectContaining({ id: global.matchId, authorId: global.authorId })]));
    });
  });
});

describe('stats-service', () => {
  beforeAll(async () => {
    // envoi de stats de test
    const invalidDate = new Date();
    invalidDate.setMonth(invalidDate.getMonth() - 3);

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const testData = [
      {
        dateMatch: new Date().toISOString(),
        team: 0,
        idMatch: 5,
        idPokemon: 6,
        victory: false,
      },
      {
        dateMatch: new Date().toISOString(),
        team: 1,
        idMatch: 8,
        idPokemon: 9,
        victory: false,
      },
      {
        dateMatch: new Date().toISOString(),
        team: 1,
        idMatch: 9,
        idPokemon: 9,
        victory: true,
      },
      {
        dateMatch: new Date().toISOString(),
        team: 0,
        idMatch: 5,
        idPokemon: 12,
        victory: true,
      },
      {
        dateMatch: twoDaysAgo.toISOString(),
        team: 1,
        idMatch: 5,
        idPokemon: 12,
        victory: false,
      },
      {
        dateMatch: twoDaysAgo.toISOString(),
        team: 1,
        idMatch: 9,
        idPokemon: 13,
        victory: false,
      },
      {
        dateMatch: invalidDate.toISOString(),
        team: 1,
        idMatch: 5,
        idPokemon: 10,
        victory: true,
      },
    ];
    for (const data of testData) {
      await Stats.StatsService.uploadStatRow(data);
    }
  });
  it("shouldn't work if you upload an invalid stats row", async () => {
    const t = () => Stats.StatsService.uploadStatRow();
    await expect(t()).rejects.toThrow();
  });

  it('should return the number of matchs of the last month', async () => {
    const res = await Stats.RoundService.getRoundsAdayLast30Days();
    expect(res).toEqual(expect.arrayContaining([expect.objectContaining({ numberOfRounds: 4 }), expect.objectContaining({ numberOfRounds: 2 })]));
    expect(res).not.toEqual(expect.arrayContaining([expect.objectContaining({ numberOfRounds: 1 })]));
  });

  it('should return the number of matchs for the pokemon', async () => {
    const res = await Stats.PokemonService.getNumberOfRoundsByPokemon(9);
    expect(res).toEqual(expect.objectContaining({ id: 9, numberOfRounds: 2 }));

    const res6 = await Stats.PokemonService.getNumberOfRoundsByPokemon(6);
    expect(res6).toEqual(expect.objectContaining({ id: 6, numberOfRounds: 1 }));
  });

  it('should return the number of victories for the pokemon', async () => {
    const res = await Stats.PokemonService.getNumberOfVictoriesByPokemon(9);
    expect(res).toEqual(expect.objectContaining({ id: 9, numberOfVictories: 1 }));

    const res6 = await Stats.PokemonService.getNumberOfVictoriesByPokemon(6);
    expect(res6).toEqual(expect.objectContaining({ id: 6, numberOfVictories: 0 }));
  });
});

afterAll(() => {
  console.log('Killing childrens, oh noooo !');
  // on kill tous les processus
  processes.forEach(p => p.kill());
});
