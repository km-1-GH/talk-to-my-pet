CREATE TABLE word_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE words (
  id SERIAL PRIMARY KEY,
  content VARCHAR(255) NOT NULL,
  word_category_id INTEGER NOT NULL REFERENCES word_categories(id)
);

CREATE TABLE templates (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  word_category_id INTEGER NOT NULL REFERENCES word_categories(id),
  motion VARCHAR(50) NOT NULL
);
