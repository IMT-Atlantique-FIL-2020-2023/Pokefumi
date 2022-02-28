import { ExpressParameters } from '@oats-ts/openapi-http-server/lib/express';
import { fluent } from '@oats-ts/try';
import { StatsServiceApi } from './generated-oats/api/StatsServiceApi';
import { Issue, stringify } from '@oats-ts/validators';
import { GetNumberOfMatchsByPokemonServerRequest } from './generated-oats/requests/GetNumberOfMatchsByPokemonServerRequest';
import { GetNumberOfVictoriesByPokemonServerRequest } from './generated-oats/requests/GetNumberOfVictoriesByPokemonServerRequest';
import { GetMatchsAdayLast30DaysResponse } from './generated-oats/responses/GetMatchsAdayLast30DaysResponse';
import { GetNumberOfMatchsByPokemonResponse } from './generated-oats/responses/GetNumberOfMatchsByPokemonResponse';
import { GetNumberOfVictoriesByPokemonResponse } from './generated-oats/responses/GetNumberOfVictoriesByPokemonResponse';
import { GetPokemonsWithNumberOfMatchsResponse } from './generated-oats/responses/GetPokemonsWithNumberOfMatchsResponse';
import { UploadStatRowServerRequest } from './generated-oats/requests/UploadStatRowServerRequest';
import { UploadStatRowResponse } from './generated-oats/responses/UploadStatRowResponse';
import { PrismaClient } from '@prisma/client';
import { AppError } from './generated-oats/types/AppError';
import { ArrayOfMatches } from './generated-oats/types/ArrayOfMatches';

export class StatsApiImpl implements StatsServiceApi<ExpressParameters> {
  prisma;
  constructor() {
    this.prisma = new PrismaClient();
  }
  uploadStatRow(request: UploadStatRowServerRequest): Promise<UploadStatRowResponse> {
    return fluent(request.body).get(
      async (body): Promise<UploadStatRowResponse> => ({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        body: await this.prisma.statRound.upsert({
          where: {
            idPokemon_dateMatch_idMatch_team: {
              dateMatch: body.dateMatch,
              idMatch: body.idMatch,
              idPokemon: body.idPokemon,
              team: body.team,
            },
          },
          update: body,
          create: body,
        }),
        statusCode: 200,
        headers: undefined,
        mimeType: 'application/json',
      }),
      async (issues: Issue[]): Promise<UploadStatRowResponse> => ({
        body: issues.map(stringify).map((message): AppError => ({ message, code: 0 })),
        headers: undefined,
        mimeType: 'application/json',
        statusCode: 400,
      }),
    );
  }
  async getMatchsAdayLast30Days(): Promise<GetMatchsAdayLast30DaysResponse> {
    return {
      body: await this.prisma.$queryRaw<ArrayOfMatches>`
SELECT 
  strftime('%d-%m-%Y', dateMatch) as date, 
  COUNT(*) as numberOfMatches 
FROM 
  'statRound' 
WHERE 
  dateMatch >= date('now', '-30 day') 
GROUP BY 
  date;
`,
      statusCode: 200,
      headers: undefined,
      mimeType: 'application/json',
    };
  }
  async getNumberOfMatchsByPokemon(request: GetNumberOfMatchsByPokemonServerRequest): Promise<GetNumberOfMatchsByPokemonResponse> {
    return fluent(request.path).get(
      async ({ id }): Promise<GetNumberOfMatchsByPokemonResponse> => ({
        body: {
          id,
          numberOfMatchs: await this.prisma.statRound.count({
            where: {
              idPokemon: id,
            },
          }),
        },
        headers: undefined,
        mimeType: 'application/json',
        statusCode: 200,
      }),
      async (issues: Issue[]): Promise<GetNumberOfMatchsByPokemonResponse> => ({
        body: issues.map(stringify).map((message): AppError => ({ message, code: 0 })),
        headers: undefined,
        mimeType: 'application/json',
        statusCode: 400,
      }),
    );
  }

  async getNumberOfVictoriesByPokemon(request: GetNumberOfVictoriesByPokemonServerRequest): Promise<GetNumberOfVictoriesByPokemonResponse> {
    return fluent(request.path).get(
      async ({ id }): Promise<GetNumberOfVictoriesByPokemonResponse> => ({
        body: {
          id,
          numberOfVictories: await this.prisma.statRound.count({
            where: {
              idPokemon: id,
              victory: true,
            },
          }),
        },
        headers: undefined,
        mimeType: 'application/json',
        statusCode: 200,
      }),
      async (issues: Issue[]): Promise<GetNumberOfVictoriesByPokemonResponse> => ({
        body: issues.map(stringify).map((message): AppError => ({ message, code: 0 })),
        headers: undefined,
        mimeType: 'application/json',
        statusCode: 400,
      }),
    );
  }
  async getPokemonsWithNumberOfMatchs(): Promise<GetPokemonsWithNumberOfMatchsResponse> {
    return {
      body: (
        await this.prisma.statRound.groupBy({
          by: ['idPokemon'],
          _count: {
            _all: true,
          },
        })
      ).map(({ idPokemon, _count }) => ({ id: idPokemon, numberOfMatches: _count })),
      headers: undefined,
      mimeType: 'application/json',
      statusCode: 200,
    };
  }
}
