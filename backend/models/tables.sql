--- SQL commands to create the tables in the database

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

CREATE TABLE IF NOT EXISTS topics (
    id SERIAL PRIMARY KEY,
    topic VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user_topics (
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    topic_id INT REFERENCES topics(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, keyword_id)
);

CREATE TABLE IF NOT EXISTS saved_stocks (
    user_id UUID REFERENCES auth.users ON DELETE CASCADE,
    stock_ticker VARCHAR(10) NOT NULL,
    PRIMARY KEY (user_id, stock_id)
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_topics ENABLE ROW LEVEL SECURITY;

