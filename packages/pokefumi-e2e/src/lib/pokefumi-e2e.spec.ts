import { waitUntil } from 'async-wait-until';
import { User, Matchmaking, Round, Stats } from '@pokefumi/pokefumi-api';
import { node, ExecaChildProcess } from 'execa';
import { faker } from '@faker-js/faker';
import { join } from 'path';

const JWT_SECRET = 'ILIKETOTESTPOTATOES';
const processes: ExecaChildProcess[] = [];
const author = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
  statut: 'online',
  score: 0,
};

const opponent = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
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
  // on fork chaque processus node pour chaque service. Bref on les lance tous en meme temps
  for (const name of ['stats', 'user', 'round', 'matchmaking']) {
    processes.push(
      node(join(__dirname, '../../../../', `dist/apps/${name}/main.js`), {
        env: {
          JWT_SECRET,
        },
        stdio: 'pipe',
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
    waitUntil(async () => (await Round.DefaultService.get().catch(e => {})) !== undefined, { intervalBetweenAttempts: 500 }),
    waitUntil(async () => (await Stats.RoundService.getRoundsAdayLast30Days().catch(e => {})) !== undefined, { intervalBetweenAttempts: 500 }),
  ]);
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

afterAll(() => {
  // on kill tous les processus
  processes.forEach(p => p.kill());
});
