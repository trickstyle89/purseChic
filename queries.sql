-- INDEX PAGE
SELECT first_name, last_name
FROM users
WHERE id = 1 --We need to change this to the current session id

-- LOGIN PAGE
SELECT * FROM users WHERE username = '${username}' AND password = '${password}'; -- we need to change it to prevent injection $1, $2

-- REGISTER PAGE
INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4);

-- FEATURE PAGE
SELECT *
FROM products;
