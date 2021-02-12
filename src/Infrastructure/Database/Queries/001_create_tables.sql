DROP TABLE IF EXISTS quality;
CREATE TABLE quality (
  id    INTEGER UNIQUE,
  color VARCHAR(10)
);

DROP TABLE IF EXISTS character;
CREATE TABLE character (
  id      INTEGER PRIMARY KEY,
  name    VARCHAR(255),
  quality INTEGER REFERENCES quality (id)
);

DROP TABLE IF EXISTS weapon;
CREATE TABLE weapon (
  id      INTEGER PRIMARY KEY,
  name    VARCHAR(255),
  type    VARCHAR(25) CHECK (type IN ('Bow', 'Catalyst', 'Claymore', 'Polearm', 'Sword')),
  quality INTEGER REFERENCES quality (id),
  source  VARCHAR(255)
);

DROP TABLE IF EXISTS item_type;
CREATE TABLE item_type (
  id      INTEGER PRIMARY KEY,
  in_code VARCHAR(255), -- the types as they appear in the code (keys in objects)
  in_data VARCHAR(255)  -- the "pretty" version, based on HoneyHunterWorld's categories.
);

DROP TABLE IF EXISTS item;
CREATE TABLE item (
  id      INTEGER PRIMARY KEY,
  name    VARCHAR(255),
  quality INTEGER REFERENCES quality (id),
  type    INTEGER REFERENCES item_type (id),
  details VARCHAR(255) NULL DEFAULT NULL -- i.e. what element a gem is for, or what days a domain item is up on.
);

