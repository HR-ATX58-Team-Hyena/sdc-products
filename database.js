DROP DATABASE IF EXISTS product_overview;

CREATE DATABASE product_overview;

\c product_overview;

DROP TABLE IF EXISTS product_list;

CREATE TABLE product_list (
  id  SERIAL NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  default_price MONEY NOT NULL
);

DROP TABLE IF EXISTS features;

CREATE TABLE features (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id INT NOT NULL REFERENCES product_list,
  feature TEXT NOT NULL,
  value TEXT NOT NULL
);

DROP TABLE IF EXISTS related;

CREATE TABLE related (
  id SERIAL NOT NULL PRIMARY KEY,
  current_product_id INT NOT NULL REFERENCES product_list,
  related_product_id INT NOT NULL REFERENCES product_list,
);

DROP TABLE IF EXISTS styles;

CREATE TABLE styles (
  id SERIAL NOT NULL PRIMARY KEY,
  productId INT NOT NULL REFERENCES product_list,
  name TEXT NOT NULL,
  sale_price MONEY NOT NULL,
  original_price MONEY NOT NULL,
  default_style BOOLEAN NOT NULL DEFAULT false
);

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id SERIAL NOT NULL PRIMARY KEY,
  styleId INT NOT NULL REFERENCES styles,
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL
);

DROP TABLE IF EXISTS skus;

CREATE TABLE skus (
  id SERIAL NOT NULL PRIMARY KEY,
  styleId INT NOT NULL REFERENCES styles,
  size TEXT NOT NULL,
  quantity INT NOT NULL
);

COPY product(id, name, slogan, description, category, default_price)
FROM '/Users/sewell/Downloads/product.csv'
DELIMITER ','
CSV HEADER;

COPY styles(id, productId, name, sale_price, original_price, default_style)
FROM '/Users/sewell/Downloads/styles.csv'
DELIMITER ','
CSV HEADER;

COPY skus(id, styleId, size, quantity)
FROM '/Users/sewell/Downloads/skus.csv'
DELIMITER ','
CSV HEADER;

COPY features(id, product_id, feature, value)
FROM '/Users/sewell/Downloads/features.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, styleId, url, thumbnail_url)
FROM '/Users/sewell/Downloads/photos.csv'
DELIMITER ','
CSV HEADER;

COPY related(id, current_product_id, related_product_id)
FROM '/Users/sewell/Downloads/related.csv'
DELIMITER ','
CSV HEADER;