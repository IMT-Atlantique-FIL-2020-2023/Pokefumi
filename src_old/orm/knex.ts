import { Model } from 'objection';
import Knex from 'knex';
import config from '../configs/development.json';

import Deck from '../models/deck';
import Invitation from '../models/invitation';
import { Match, Round } from '../models/match';
import { Pokemon, TypePokemon } from '../models/pokemon';
import User from '../models/user';

const dbConnection = {
  client: 'sqlite3',
  connection: config.dbConfig,
};

const knex = Knex(dbConnection);
Model.knex(knex);
