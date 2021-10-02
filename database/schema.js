DROP DATABASE IF EXISTS product_overview;
CREATE DATABASE product_overview;
\c product_overview;

CREATE TABLE product_list (
  id  SERIAL NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  default_price MONEY NOT NULL
);

CREATE TABLE features (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id INT NOT NULL,
  feature TEXT NOT NULL,
  value TEXT NOT NULL,
  CONSTRAINT fk_product_id
    FOREIGN KEY (product_id)
      REFERENCES product_list(id)
      ON DELETE CASCADE
);

CREATE TABLE related (
  id SERIAL NOT NULL PRIMARY KEY,
  current_product_id INT NOT NULL,
  related_product_id INT NOT NULL,
  CONSTRAINT fk_current_product_id
    FOREIGN KEY (current_product_id)
      REFERENCES product_list(id)
      ON DELETE CASCADE,
  CONSTRAINT fk_related_product_id
    FOREIGN KEY(related_product_id)
      REFERENCES product_list(id)
        ON DELETE CASCADE
);

CREATE TABLE styles (
  id SERIAL NOT NULL PRIMARY KEY,
  productId INT NOT NULL,
  name TEXT NOT NULL,
  sale_price MONEY,
  original_price MONEY NOT NULL,
  default_style BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT fk_product_id
    FOREIGN KEY(productId)
      REFERENCES product_list(id)
      ON DELETE CASCADE
);

CREATE TABLE photos (
  id SERIAL NOT NULL PRIMARY KEY,
  styleId INT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  CONSTRAINT fk_styleId
    FOREIGN KEY(styleId)
      REFERENCES styles(id)
      ON DELETE CASCADE
);

CREATE TABLE skus (
  id SERIAL NOT NULL PRIMARY KEY,
  styleId INT NOT NULL,
  size TEXT NOT NULL,
  quantity INT NOT NULL,
  CONSTRAINT fk_styleId
    FOREIGN KEY (styleId)
      REFERENCES styles(id)
      ON DELETE CASCADE
);

COPY product_list(id, name, slogan, description, category, default_price)
FROM '/Users/sewell/Hack Reactor/Repos/SDC/sdc-products/csvData/product.csv'
DELIMITER ','
CSV HEADER;

COPY styles(id, productId, name, sale_price, original_price, default_style)
FROM '/Users/sewell/Hack Reactor/Repos/SDC/sdc-products/csvData/styles.csv'
DELIMITER ','
CSV HEADER;

COPY skus(id, styleId, size, quantity)
FROM '/Users/sewell/Hack Reactor/Repos/SDC/sdc-products/csvData/skus.csv'
DELIMITER ','
CSV HEADER;

COPY features(id, product_id, feature, value)
FROM '/Users/sewell/Hack Reactor/Repos/SDC/sdc-products/csvData/features.csv'
DELIMITER ','
CSV HEADER;

COPY photos(id, styleId, url, thumbnail_url)
FROM '/Users/sewell/Hack Reactor/Repos/SDC/sdc-products/csvData/photos.csv'
DELIMITER ','
CSV HEADER;

COPY related(id, current_product_id, related_product_id)
FROM '/Users/sewell/Hack Reactor/Repos/SDC/sdc-products/csvData/related.csv'
DELIMITER ','
CSV HEADER;