import { HttpResponse } from '@oats-ts/openapi-http';
import { ArrayOfRounds } from '../types/ArrayOfRounds';

export type GetRoundsAdayLast30DaysResponse = HttpResponse<ArrayOfRounds, 200, 'application/json', undefined>;
