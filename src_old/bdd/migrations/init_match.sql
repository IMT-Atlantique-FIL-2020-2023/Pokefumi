CREATE TABLE IF NOT EXISTS pokemon_match (
    id INTEGER PRIMARY KEY,
    player1 INTEGER,
    player2 INTEGER,
    pokemons_player1 TEXT NOT NULL,
    pokemons_player2 TEXT,
    match_status TEXT NOT NULL DEFAULT "OPENED" CHECK( match_status IN ('OPENED','PLAYING','FINISHED')),
    winner INTEGER,
    FOREIGN KEY (player1) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (player2) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (winner) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS match_round (
  round_number INTEGER NOT NULL,
  match_id INTEGER NOT NULL,
  pokemon_player1 TEXT,
  pokemon_player2 TEXT,
  match_round_status TEXT NOT NULL DEFAULT "STARTED" CHECK( match_round_status IN ('STARTED','FINISHED') ),
  winner INTEGER,
  PRIMARY KEY (round_number, match_id),
  FOREIGN KEY (match_id) REFERENCES pokemon_match(id) ON DELETE CASCADE,
  FOREIGN KEY (winner) REFERENCES users(user_id) ON DELETE CASCADE,
);