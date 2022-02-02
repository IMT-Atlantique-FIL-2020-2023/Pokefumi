import * as t from '../api/pokemon/types'
import { Api } from '../models'

async function getPokemonsWithNumberOfMatchs(): Promise<t.GetPokemonsWithNumberOfMatchsResponse> {
	throw 'Unimplemented'
}

async function getNumberOfMatchsByPokemon(id: number): Promise<t.GetNumberOfMatchsByPokemonResponse> {
	throw 'Unimplemented'
}

async function getNumberOfVictoriesByPokemon(id: number): Promise<t.GetNumberOfVictoriesByPokemonResponse> {
	throw 'Unimplemented'
}


const api: t.PokemonApi = {
	getPokemonsWithNumberOfMatchs,
	getNumberOfMatchsByPokemon,
	getNumberOfVictoriesByPokemon,
}

export default api
