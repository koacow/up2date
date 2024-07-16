--- SQL commands to create the tables in the database

--- Users tables

CREATE TABLE IF NOT EXISTS user_profiles (
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    username VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    region_code VARCHAR(2) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS user_settings (
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    settings JSON NOT NULL,
    PRIMARY KEY (user_id)
);


CREATE TABLE IF NOT EXISTS keywords (
    id SERIAL PRIMARY KEY,
    keyword VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS saved_articles (
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    article_url REFERENCES articles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, article_id)
);

CREATE TABLE IF NOT EXISTS user_keywords (
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    keyword_id INT REFERENCES keywords(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, keyword_id)
);

--- Stocks tables
CREATE TABLE IF NOT EXISTS stocks (
    id UUID PRIMARY KEY,
    ticker VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS saved_stocks (
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    stock_id UUID REFERENCES stocks(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, stock_ticker)
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_keywords ENABLE ROW LEVEL SECURITY;

