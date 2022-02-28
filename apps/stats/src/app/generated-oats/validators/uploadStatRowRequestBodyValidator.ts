import { statsDtoTypeValidator } from './statsDtoTypeValidator';

export const uploadStatRowRequestBodyValidator = { 'application/json': statsDtoTypeValidator } as const;
