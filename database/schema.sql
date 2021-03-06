DROP DATABASE IF EXISTS product_overview;
CREATE DATABASE product_overview;
\c product_overview;

DROP TABLE IF EXISTS product_list CASCADE;

CREATE TABLE product_list (
  id  SERIAL NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  default_price TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX products_index ON product_list(id);

CREATE TABLE features (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  feature TEXT NOT NULL,
  value TEXT NOT NULL
);

CREATE INDEX features_index ON features(product_id);

CREATE TABLE related (
  id SERIAL NOT NULL PRIMARY KEY,
  current_product_id INT NOT NULL,
  related_product_id INT NOT NULL
);

CREATE INDEX related_index ON related(current_product_id);

CREATE TABLE styles (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  name TEXT NOT NULL,
  sale_price TEXT,
  original_price TEXT NOT NULL,
  default_style BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX product_styles_index ON styles(product_id);

CREATE TABLE photos (
  id SERIAL NOT NULL PRIMARY KEY,
  styleId INT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL
);

CREATE INDEX product_photo_index ON photos(styleId);

CREATE TABLE skus (
  id SERIAL NOT NULL PRIMARY KEY,
  styleId INT NOT NULL,
  size TEXT NOT NULL,
  quantity INT NOT NULL
);

CREATE INDEX sku_index ON skus(styleId);

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_session INT NOT NULL,
  product_id INT NOT NULL,
  active BOOLEAN NOT NULL
)

ALTER TABLE features ADD FOREIGN KEY (product_id) REFERENCES product_list(id) ON DELETE CASCADE;
ALTER TABLE styles ADD FOREIGN KEY (product_id) REFERENCES product_list(id) ON DELETE CASCADE;
ALTER TABLE photos ADD FOREIGN KEY (styleId) REFERENCES styles(id) ON DELETE CASCADE;
ALTER TABLE skus ADD FOREIGN KEY (styleId) REFERENCES styles(id) ON DELETE CASCADE;

COPY product_list(id, name, slogan, description, category, default_price)
FROM '/Users/sewell/Hack Reactor/Repos/SDC/sdc-products/csvData/product.csv'
DELIMITER ','
CSV HEADER;

COPY features(id, product_id, feature, value)
FROM '/Users/sewell/Hack Reactor/Repos/SDC/sdc-products/csvData/features.csv'
DELIMITER ','
CSV HEADER;

COPY related(id, current_product_id, related_product_id)
FROM '/Users/sewell/Hack Reactor/Repos/SDC/sdc-products/csvData/related.csv'
DELIMITER ','
CSV HEADER;

COPY styles(id, product_id, name, sale_price, original_price, default_style)
FROM '/Users/sewell/Hack Reactor/Repos/SDC/sdc-products/csvData/styles.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, styleId, url, thumbnail_url)
FROM '/Users/sewell/Hack Reactor/Repos/SDC/sdc-products/csvData/photos.csv'
DELIMITER ','
CSV HEADER;

COPY skus(id, styleId, size, quantity)
FROM '/Users/sewell/Hack Reactor/Repos/SDC/sdc-products/csvData/skus.csv'
DELIMITER ','
CSV HEADER;


