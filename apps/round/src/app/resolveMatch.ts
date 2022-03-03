import lru from 'lru-cache';
import { v4 as uuidv4 } from 'uuid';
import { Matchmaking, User as Users, Round as Rounds } from '@pokefumi/pokefumi-api';
import { Round, Match, User } from '@pokefumi/pokefumi-common';

const RELOAD_DELAY = 1000;
const ROUND_COUNT = 10;

const cache = new lru({
  max: 500,
  maxSize: 5000,
  ttl: 1000 * 60 * 5,
});

const url_match = 'localhost:3335/match';

function getCacheUserId(id: number) {
  return `user_${id}`;
}
function getCacheMatchId(id: number) {
  return `match_${id}`;
}

/*
@param matchId id du match en cours
@param userId id de l'utilisateur jouant 
@param deckId index du pokemon dans le deck du joueur

@return match mis a jour
*/
export default async function resolveMatch(matchId: number, userId: number, deckId: number): Promise<Matchmaking.MatchDto> {
  // On récupère le match a partir de l'id fourni
  const match = await Matchmaking.MatchesService.getMatchById(matchId);

  // Si le match n'existe pas, on renvoie une erreur
  if (!match) throw "Le match n'existe pas ou a expiré";

  // On vérifie que l'utilisateur est autorisé a jouer
  if (![match.authorId, match.opponentId].includes(userId)) throw "Le joueur n'est pas authorisé sur ce match";

  // On determine si le joueur actuel est le propriétaire
  const isHost = match.authorId === userId;
  const pokemons = isHost ? match.authorPokemons : match.opponentPokemons;
  const playerPokemon = pokemons[deckId];

  // Si le match existe, on récupère ou crée les rounds dans le cache
  let rounds: Round[] = cache.get(getCacheMatchId(match.id)) as Round[];

  if (!rounds) {
    rounds = [];
    cache.set(getCacheMatchId(match.id), rounds);
  }

  // On renseigne ensuite le pokemon indiqué dans le cache
  cache.set(userId, playerPokemon);

  let isLastToPlay = true; // On vérifie lequel des joueurs joue en dernier

  // On attends que les deux joueurs aient fourni leur pokemon
  const opponentId = isHost ? match.opponentId : match.authorId;
  let opponentPokemon = cache.get(getCacheUserId(opponentId));

  while (!opponentPokemon) {
    isLastToPlay = false; // On attends l'adversaire, c'est donc lui qui joue en dernier
    await setTimeout(() => {
      opponentPokemon = cache.get(getCacheUserId(opponentId));
    }, RELOAD_DELAY);

    // Si un des joueurs est en timeout, on annule et renvoie un message d'erreur
    // TODO: ...
  }

  // On calcule le résultat du round et on complète le match
  const winnerPokemon = await Rounds.RoundService.get(String(playerPokemon), String(opponentPokemon));
  const isWinner: boolean = winnerPokemon.id === playerPokemon;

  // On met les rounds a jour
  const pokemonPlayer1 = await Rounds.PokemonService.get1((isHost ? playerPokemon : opponentPokemon) as number);
  const pokemonPlayer2 = await Rounds.PokemonService.get1((isHost ? opponentPokemon : playerPokemon) as number);

  rounds.push({
    id: Math.random(),
    matchId: match.id,
    roundNumber: rounds.length,
    pokemonPlayer1: pokemonPlayer1.name,
    pokemonPlayer2: pokemonPlayer2.name,
    status: 'FINISHED',
    winner: isWinner ? userId : opponentId,
  } as Round);

  const isLastMatch = rounds.length === ROUND_COUNT;

  if (isLastToPlay) {
    cache.set(getCacheMatchId(match.id), rounds); // On met a jour dans le cache

    // On reset les valeurs du cache
    cache.set(userId, undefined);
    cache.set(opponentId, undefined);

    // Si c'étais le dernier round, on termines le match
    if (isLastMatch) {
      await Matchmaking.InternalService.closeMatch(matchId);
    }
  }

  // const joueur1 = await Users.UserService.getUserById(match.authorId);
  // const joueur2 = await Users.UserService.getUserById(match.opponentId);

  // On renvoie enfin le match mis a jour
  return {
    id: match.id,
    status: isLastMatch ? Matchmaking.MatchDto.status.FINISHED : Matchmaking.MatchDto.status.STARTED,
    authorId: match.authorId,
    opponentId: match.opponentId,
    winnerId: isLastMatch && (isWinner ? userId : opponentId),
    createdAt: match.createdAt,
    updatedAt: match.updatedAt,
    authorPokemons: match.authorPokemons,
    opponentPokemons: match.opponentPokemons,
  };
}
