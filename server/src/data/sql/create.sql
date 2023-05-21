CREATE TABLE IF NOT EXISTS users (
    userID VARCHAR(200) PRIMARY KEY,
    username VARCHAR(200) NOT NULL,
    coins INTEGER NOT NULL,
    avatarID VARCHAR(200) NOT NULL,
    avatarBackgroundColor VARCHAR(20) NOT NULL
)