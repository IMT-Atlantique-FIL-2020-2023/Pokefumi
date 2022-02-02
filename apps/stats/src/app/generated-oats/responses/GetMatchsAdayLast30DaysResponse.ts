import { HttpResponse } from '@oats-ts/openapi-http';
import { ArrayOfMatches } from '../types/ArrayOfMatches';

export type GetMatchsAdayLast30DaysResponse = HttpResponse<ArrayOfMatches, 200, 'application/json', undefined>;
