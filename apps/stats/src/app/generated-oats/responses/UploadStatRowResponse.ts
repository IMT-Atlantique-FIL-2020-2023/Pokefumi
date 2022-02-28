import { HttpResponse } from '@oats-ts/openapi-http';
import { AppError } from '../types/AppError';
import { StatsDto } from '../types/StatsDto';

export type UploadStatRowResponse =
  | HttpResponse<StatsDto, 200, 'application/json', undefined>
  | HttpResponse<AppError[], 400, 'application/json', undefined>;
