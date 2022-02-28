import { StatsDto } from '../types/StatsDto';

export function isStatsDto(input: any): input is StatsDto {
  return (
    input !== null &&
    typeof input === 'object' &&
    typeof input.dateMatch === 'string' &&
    typeof input.idMatch === 'number' &&
    typeof input.idPokemon === 'number' &&
    typeof input.team === 'number' &&
    typeof input.victory === 'boolean'
  );
}
