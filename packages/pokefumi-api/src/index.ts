import * as _User from './lib/generated-sources/open-api-ts-codegen/user';
import * as _Round from './lib/generated-sources/open-api-ts-codegen/round';
import * as _Stats from './lib/generated-sources/open-api-ts-codegen/stats';
import * as _Matchmaking from './lib/generated-sources/open-api-ts-codegen/matchmaking';

_User.OpenAPI.BASE = process.env.BASE_URL_USER || _User.OpenAPI.BASE;
_Round.OpenAPI.BASE = process.env.BASE_URL_ROUND || _Round.OpenAPI.BASE;
_Stats.OpenAPI.BASE = process.env.BASE_URL_STATS || _Stats.OpenAPI.BASE;
_Matchmaking.OpenAPI.BASE = process.env.BASE_URL_MATCHMAKING || _Matchmaking.OpenAPI.BASE;

export * as Round from './lib/generated-sources/open-api-ts-codegen/round';
export * as User from './lib/generated-sources/open-api-ts-codegen/user';
export * as Stats from './lib/generated-sources/open-api-ts-codegen/stats';
export * as Matchmaking from './lib/generated-sources/open-api-ts-codegen/matchmaking';
