import { waitUntil } from 'async-wait-until';
import { node, ExecaChildProcess } from 'execa';
import { join } from 'path';
import { User, Matchmaking, Round, Stats } from '@pokefumi/pokefumi-api';
import tableClean from 'knex-tablecleaner';
import knex from 'knex';

export async function clearDbs() {
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
}

const processes: ExecaChildProcess[] = [];

export async function launchAllProcess(env: NodeJS.ProcessEnv) {
  for (const name of ['stats', 'user', 'round', 'matchmaking']) {
    processes.push(
      node(join(__dirname, '../../../../', `dist/apps/${name}/main.js`), {
        env,
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
}

export function killChildrens() {
  // on kill tous les processus
  processes.forEach(p => p.kill());
}
