CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    score INTEGER DEFAULT 0,
    UNIQUE(username)
);

INSERT INTO users (username,password)
VALUES('user1', 'password1');

CREATE TABLE IF NOT EXISTS rooms (
    room_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id1 INTEGER FOREIGN KEY NOT NULL,
    user_id2 INTEGER FOREIGN KEY,
    score INTEGER DEFAULT 0
);