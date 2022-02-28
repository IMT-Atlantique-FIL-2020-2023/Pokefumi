import { ExpressParameters } from '@oats-ts/openapi-http-server/lib/express';
import { fluent } from '@oats-ts/try';
import { StatsServiceApi } from './generated-oats/api/StatsServiceApi';
import { Issue, stringify } from '@oats-ts/validators';
import { GetNumberOfRoundsByPokemonServerRequest } from './generated-oats/requests/GetNumberOfRoundsByPokemonServerRequest';
import { GetNumberOfVictoriesByPokemonServerRequest } from './generated-oats/requests/GetNumberOfVictoriesByPokemonServerRequest';
import { GetRoundsAdayLast30DaysResponse } from './generated-oats/responses/GetRoundsAdayLast30DaysResponse';
import { GetNumberOfRoundsByPokemonResponse } from './generated-oats/responses/GetNumberOfRoundsByPokemonResponse';
import { GetNumberOfVictoriesByPokemonResponse } from './generated-oats/responses/GetNumberOfVictoriesByPokemonResponse';
import { GetPokemonsWithNumberOfRoundsResponse } from './generated-oats/responses/GetPokemonsWithNumberOfRoundsResponse';
import { UploadStatRowServerRequest } from './generated-oats/requests/UploadStatRowServerRequest';
import { UploadStatRowResponse } from './generated-oats/responses/UploadStatRowResponse';
import { PrismaClient } from '@prisma/client';
import { AppError } from './generated-oats/types/AppError';
import { ArrayOfRounds } from './generated-oats/types/ArrayOfRounds';

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
  async getRoundsAdayLast30Days(): Promise<GetRoundsAdayLast30DaysResponse> {
    return {
      body: await this.prisma.$queryRaw<ArrayOfRounds>`
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
  async getNumberOfRoundsByPokemon(request: GetNumberOfRoundsByPokemonServerRequest): Promise<GetNumberOfRoundsByPokemonResponse> {
    return fluent(request.path).get(
      async ({ id }): Promise<GetNumberOfRoundsByPokemonResponse> => ({
        body: {
          id,
          numberOfRounds: await this.prisma.statRound.count({
            where: {
              idPokemon: id,
            },
          }),
        },
        headers: undefined,
        mimeType: 'application/json',
        statusCode: 200,
      }),
      async (issues: Issue[]): Promise<GetNumberOfRoundsByPokemonResponse> => ({
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
  async getPokemonsWithNumberOfRounds(): Promise<GetPokemonsWithNumberOfRoundsResponse> {
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
