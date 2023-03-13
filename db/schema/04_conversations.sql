DROP TABLE IF EXISTS conversations CASCADE;

CREATE TABLE conversations (
  id SERIAL PRIMARY KEY NOT NULL,
  user_one INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_two INTEGER REFERENCES users(id) ON DELETE CASCADE
);