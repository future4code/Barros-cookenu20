-- Active: 1674082182139@@35.226.146.116@3306@jbl-4416561-samuel-silva
CREATE TABLE
    IF NOT EXISTS cookenu_users(
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS cookenu_recipes(
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        author_id VARCHAR(255),
        FOREIGN KEY (author_id) REFERENCES cookenu_users (id)
    );

CREATE TABLE
    IF NOT EXISTS cookenu_friends(
        id VARCHAR(255) PRIMARY KEY,
        friend VARCHAR(255) NOT NULL
    );


ALTER TABLE cookenu_users ADD role ENUM("ADMIN","NORMAL") NOT NULL DEFAULT "NORMAL";