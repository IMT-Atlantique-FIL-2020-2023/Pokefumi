# Pokemon

## Operations

### getPokemonsWithNumberOfMatchs

```http
GET /pokemons/matchs
```

Returns the list of pokemons with their number of matchs

### getNumberOfMatchsByPokemon

```http
GET /pokemons/{id}/number-of-matchs
```

Returns the number of matchs for a specific pokemon

### getNumberOfVictoriesByPokemon

```http
GET /pokemons/{id}/number-of-victories
```

Returns the number of victories for a specific pokemon

## Implementation

This is an example of the API implementation to use to update the actual API implementation
when the API structure has changed.

```typescript
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
```
