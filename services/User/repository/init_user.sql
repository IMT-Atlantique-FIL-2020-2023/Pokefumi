CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    score INTEGER DEFAULT 0,
    UNIQUE(username)
);

INSERT INTO users (username,password)
VALUES('user1', 'password1');
