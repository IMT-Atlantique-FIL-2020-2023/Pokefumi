import { fork, ChildProcess } from 'child_process';
import { waitUntil } from 'async-wait-until';
import { User, Matchmaking, Round, Stats } from '@pokefumi/pokefumi-api';
const JWT_SECRET = 'ILIKETOTESTPOTATOES';
const processes: ChildProcess[] = [];
beforeAll(async () => {
  // on fork chaque processus node pour chaque service. Bref on les lance tous en meme temps
  for (const name of ['stats', 'user', 'round', 'matchmaking']) {
    fork(`dist/apps/${name}/main.js`, {
      env: {
        JWT_SECRET,
      },
    });
  }
  await Promise.all([
    //waitUntil(async () => (await User.UserService.getAllUsers().catch(() => null)) !== null, { intervalBetweenAttempts: 500 }),
    waitUntil(async () => (await Matchmaking.MatchesService.getAllMatches().catch(() => null), { intervalBetweenAttempts: 500 }) !== null),
    // waitUntil(async () => (await Round.DefaultService.get().catch(() => null)) !== null),
    // waitUntil(async () => (await Stats.RoundService.getRoundsAdayLast30Days().catch(() => null)) !== null),
  ]);
}, 20 * 1000);
describe('pokefumiE2e', () => {
  it('should work', () => {
    expect(null).toEqual('pokefumi-e2e');
  });
});

afterAll(() => {
  processes.forEach(function (child) {
    child.kill();
  });
});
