DROP TABLE IF EXISTS quality;
CREATE TABLE quality (
  id    INTEGER UNIQUE,
  color VARCHAR(10)
);

DROP TABLE IF EXISTS characters;
CREATE TABLE characters (
  id      INTEGER PRIMARY KEY,
  name    VARCHAR(255),
  quality INTEGER REFERENCES quality (id)
);

DROP TABLE IF EXISTS weapons;
CREATE TABLE weapons (
  id      INTEGER PRIMARY KEY,
  name    VARCHAR(255),
  type    VARCHAR(25) CHECK (type IN ('Bow', 'Catalyst', 'Claymore', 'Polearm', 'Sword')),
  quality INTEGER REFERENCES quality (id),
  source  VARCHAR(255)
);

DROP TABLE IF EXISTS item_types;
CREATE TABLE item_types (
  id      INTEGER PRIMARY KEY,
  in_code VARCHAR(255), -- the types as they appear in the code (keys in objects)
  in_data VARCHAR(255)  -- the "pretty" version, based on HoneyHunterWorld's categories.
);

DROP TABLE IF EXISTS items;
CREATE TABLE items (
  id      INTEGER PRIMARY KEY,
  name    VARCHAR(255),
  quality INTEGER REFERENCES quality (id),
  type    INTEGER REFERENCES item_types (id),
  details VARCHAR(255) NULL DEFAULT NULL -- i.e. what element a gem is for, or what days a domain item is up on.
);

