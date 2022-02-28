import { HasRequestBody } from '@oats-ts/openapi-http';
import { Try } from '@oats-ts/try';
import { StatsDto } from '../types/StatsDto';

export type UploadStatRowServerRequest = HasRequestBody<'application/json', Try<StatsDto>>;
