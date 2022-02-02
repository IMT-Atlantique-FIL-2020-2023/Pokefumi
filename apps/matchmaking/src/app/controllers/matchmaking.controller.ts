import MatchmakingRepository from '../repository/matchmaking.repository';
import { Match } from '@pokefumi/pokefumi-common';

const matchmakingRepository = new MatchmakingRepository();

const listMatchs = async () => {
  return await matchmakingRepository.getAllMatchs();
};

const getMatchById = async (id: number) => {
  return await matchmakingRepository.getMatchById(id);
};

const addMatch = async (newMatch: Match) => {
  return await matchmakingRepository.createMatch(newMatch);
};

const setStatus = async (id: number, status: string) => {
  return await matchmakingRepository.setStatus(id, status);
};

export { listMatchs, getMatchById, addMatch, setStatus };
