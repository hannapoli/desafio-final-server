DROP TABLE IF EXISTS users;

CREATE TABLE users (
    firebase_uid_user VARCHAR(255) UNIQUE NOT NULL,
    name_user VARCHAR(100),
    email_user VARCHAR(255) UNIQUE NOT NULL,
    uid_role_user INT
)