--- SQL commands to create the tables in the database

--- Users tables
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE CHECK (email ~* '^.+@.+\..+$')
);

CREATE TABLE IF NOT EXISTS user_profiles (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    region_code VARCHAR(2) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS user_settings (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    settings JSON NOT NULL,
    PRIMARY KEY (user_id)
);


--- Articles tables
CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    published_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS keywords (
    id SERIAL PRIMARY KEY,
    keyword VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS article_keywords (
    article_id INT REFERENCES articles(id) ON DELETE CASCADE,
    keyword_id INT REFERENCES keywords(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, keyword_id)
);

CREATE TABLE IF NOT EXISTS saved_articles (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    article_id INT REFERENCES articles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, article_id)
);

CREATE TABLE IF NOT EXISTS user_keywords (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    keyword_id INT REFERENCES keywords(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, keyword_id)
);

--- Stocks tables
CREATE TABLE IF NOT EXISTS stocks (
    id SERIAL PRIMARY KEY,
    ticker VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS saved_stocks (
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    stock_ticker VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id, stock_ticker)
);
