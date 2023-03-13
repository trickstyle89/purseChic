-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
DROP TABLE IF EXISTS conversations CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  price INTEGER  NOT NULL DEFAULT 0,
  description TEXT NOT NULL,
  product_photo VARCHAR(255) NOT NULL,
  posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sold BOOLEAN DEFAULT FALSE
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE conversations (
  id SERIAL PRIMARY KEY NOT NULL,
  user_one INTEGER REFERENCES users(id) ON DELETE CASCADE,
  item_two INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
  message_content VARCHAR(255) NOT NULL,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
