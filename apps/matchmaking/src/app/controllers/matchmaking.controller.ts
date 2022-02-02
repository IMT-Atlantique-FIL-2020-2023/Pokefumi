import MatchmakingRepository from '../repository/matchmaking.repository';

const matchmakingRepository = new MatchmakingRepository();

const listMatchs = async () => {
  return await matchmakingRepository.getAllMatchs();
};

export { listMatchs };
