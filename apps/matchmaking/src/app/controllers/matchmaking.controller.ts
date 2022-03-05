import { PrismaClient, Match } from '@prisma/client/matchmaking';
import { z } from 'zod';
import { User } from '@pokefumi/pokefumi-api';
import { PokemonClient } from 'pokenode-ts';

const pokeapi = new PokemonClient();

const prisma = new PrismaClient();

export const DeckDtoSchema = z.number().int().array().min(10).max(10);
export type DeckDto = z.TypeOf<typeof DeckDtoSchema>;
export const CreateMatchSchema = z.object({ opponentId: z.number().int(), deck: DeckDtoSchema });
export type CreateMatchDto = z.TypeOf<typeof CreateMatchSchema>;
export const MatchIdSchema = z.object({ id: z.string().regex(/^\d+$/) });
export type MatchIdPath = z.TypeOf<typeof MatchIdSchema>;
export const CloseDtoSchema = z.object({ winnerId: z.number().int() }).or(z.object({ isDraw: z.literal(true) }));
export type CloseDto = z.TypeOf<typeof CloseDtoSchema>;

const transformMatchToDto = (match: Match) => ({
  ...match,
  authorPokemons: match.authorPokemons?.split(' ')?.map(Number),
  opponentPokemons: match.opponentPokemons?.split(' ')?.map(Number),
});

const transformMatchToDtoArray = (matches: Match[]) => matches.map(transformMatchToDto);

export async function listMatchs() {
  return transformMatchToDtoArray(await prisma.match.findMany());
}

export async function getMatchById(id: number) {
  return transformMatchToDto(await prisma.match.findUnique({ where: { id } }));
}

async function checkDeckValidity(pokemonsIds: number[]) {
  for (const id of pokemonsIds) {
    try {
      await pokeapi.getPokemonById(id);
    } catch (e) {
      throw new Error(`Pokemon ${id} does not exist or pokeapi not available`);
    }
  }
}

export async function createMatch(newMatch: CreateMatchDto, req: Express.Request) {
  const count = await prisma.match.count({
    where: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      OR: [{ opponentId: req.user.id }, { authorId: req.user.id }],
      status: { in: ['waitingInvite', 'started'] },
    },
  });
  if (count > 3) {
    throw new Error('Too many matchs');
  }

  const res = await User.UserService.getUserById(newMatch.opponentId); // check user exists
  if (!res) {
    throw new Error('Opponent does not exist');
  }

  await checkDeckValidity(newMatch.deck); // check if pokemons are valid;
  return await transformMatchToDto(
    await prisma.match.create({
      data: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        authorId: req.user.id,
        opponentId: newMatch.opponentId,
        authorPokemons: newMatch.deck.join(' '),
        status: 'waitingInvite',
      },
    }),
  );
}

export async function listInvitations(req: Express.Request) {
  return await prisma.match.findMany({
    where: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      opponentId: req.user?.id,
      opponentPokemons: null,
      status: 'waitingInvite',
    },
    select: {
      id: true,
      authorId: true,
    },
  });
}

export async function joinMatch(id: number, deck: DeckDto, req: Express.Request) {
  const match = await prisma.match.findUnique({ where: { id } });
  if (match?.status !== 'waitingInvite') {
    throw new Error('Match is not available');
  }
  const count = await prisma.match.count({
    where: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      OR: [{ opponentId: req.user.id }, { authorId: req.user.id }],
      status: { in: ['waitingInvite', 'started'] },
    },
  });
  if (count > 3) {
    throw new Error('Too many matchs');
  }

  checkDeckValidity(deck); // check if pokemons are valid;

  return transformMatchToDto(
    await prisma.match.update({
      where: { id },
      data: {
        opponentPokemons: deck.join(' '),
        status: 'started',
      },
    }),
  );
}

export async function closeMatch(id: number, close: CloseDto) {
  const winnerId = 'winnerId' in close ? close.winnerId : null;

  const res = await prisma.match.updateMany({
    where: { id, status: 'started' },
    data: { status: 'finished', winnerId },
  });
  if (winnerId !== null) {
    User.InternalService.incrementUserScore(winnerId);
  }
  return res;
}
