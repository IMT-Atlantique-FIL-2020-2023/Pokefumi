
import axios from 'axios'
import lru from 'lru-cache'

// import {  } from '@pokefumi/pokefumi-api'

const cache = new lru({
  max: 500,
  maxSize: 5000,
  ttl: 1000 * 60 * 5,
})

const url_match = 'localhost:3335/match'
export default async function resolveMatch(idMatch: number): Promise<Match> {
  
  // On récupère le match a partir de l'id fourni
  const res = await User.UserService.getUserById(newMatch.opponnentId); // check user exists

  // Si le match n'existe pas, on revoie une erreur

  // Si le match existe, on attends que les deux joueurs aient fourni leur pokemon

  // On calcule le résultat du round et on complète le match

  // Si un des joueurs est en timeout, on annule et renvoie un message d'erreur

  // Sinon, on renvoie le match mis a jour
}



export default async function resolveMatch(pokemonsA: number[], pokemonsB: number[]): Promise<number> {
  if (pokemonsA?.length != pokemonsB?.length) throw new Error("nombres de pokemons différents pour les deux joueurs")
  return 1
  
  /*
  return pokemonsA
  .map((pokemonA, i) => [pokemonA, pokemonsB[i]])
  .reduce(async function(acc, val) {
    const result = await axios.get(`${url_match}/${val[0]}/${val[1]}`).then(response => { return response.name == 1 ? 1 : -1 })
    return acc + result
  }, 0) */
}

await 
