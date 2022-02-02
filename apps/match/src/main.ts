/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import getListPokemons from './app/getListPokemons';
import getListTypes from './app/getListTypes';
import getType from './app/getType';
import getPokemon from './app/getPokemon';
import bagarrePokemon from './app/bagarrePokemon';

const app = express();

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to match!' });
});

app.get('/pokemons', async (req, res) => {
  res.send(await getListPokemons());
});

app.get('/pokemons/:name', async (req, res) => {
  res.send(await getPokemon(req.params.name));
});

app.get('/types', async (req, res) => {
  res.send(await getListTypes());
});

app.get('/types/:name', async (req, res) => {
  res.send(await getType(req.params.name));
});

app.get('/bagarre/:name1/:name2', async (req, res) => {
  res.send(await bagarrePokemon(req.params.name1, req.params.name2));
});

const port = process.env.port || 3335;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
