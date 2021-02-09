DROP TABLE IF EXISTS character_experience;
CREATE TABLE character_experience (
  level       INTEGER,
  exp_to_next INTEGER,
  PRIMARY KEY (level)
);

DROP TABLE IF EXISTS character_ascension_details;
CREATE TABLE character_ascension_details (
  level          INTEGER PRIMARY KEY CHECK ( level IN (20, 40, 50, 60, 70, 80) ),
  gem_amount     INTEGER DEFAULT 0,
  gem_quality    INTEGER CHECK (gem_quality IN (1, 2, 3, 4, 5)),
  boss_amount    INTEGER DEFAULT 0,
  boss_quality   INTEGER CHECK (gem_quality IN (1, 2, 3, 4, 5)),
  gather_amount  INTEGER DEFAULT 0,
  gather_quality INTEGER CHECK (gem_quality IN (1, 2, 3, 4, 5)),
  common_amount  INTEGER DEFAULT 0,
  common_quality INTEGER CHECK (gem_quality IN (1, 2, 3, 4, 5)),
  mora           INTEGER DEFAULT 0,
  FOREIGN KEY (gem_quality) REFERENCES quality (id),
  FOREIGN KEY (boss_quality) REFERENCES quality (id),
  FOREIGN KEY (gather_quality) REFERENCES quality (id),
  FOREIGN KEY (common_quality) REFERENCES quality (id)
);

DROP TABLE IF EXISTS character_ascension;
CREATE TABLE character_ascension (
  id        INTEGER PRIMARY KEY,
  character INTEGER NOT NULL,
  level     INTEGER CHECK ( level IN (20, 40, 50, 60, 70, 80) ),
  gem       INTEGER NOT NULL,
  boss      INTEGER NULL, -- must be nullable for the Traveler.
  gather    INTEGER NOT NULL,
  common    INTEGER NOT NULL,
  UNIQUE (character, level),
  FOREIGN KEY (character) REFERENCES characters (id),
  FOREIGN KEY (level) REFERENCES character_ascension_details (level),
  FOREIGN KEY (gem) REFERENCES items (id),
  FOREIGN KEY (boss) REFERENCES items (id),
  FOREIGN KEY (gather) REFERENCES items (id),
  FOREIGN KEY (common) REFERENCES items (id)
);

---------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS character_talent_ascension_details;
CREATE TABLE character_talent_ascension_details (
  level          INTEGER PRIMARY KEY CHECK (level IN (1, 2, 3, 4, 5, 6, 7, 8, 9)),
  book_amount    INTEGER DEFAULT 0,
  book_quality   INTEGER CHECK (book_quality IN (1, 2, 3, 4, 5)),
  common_amount  INTEGER DEFAULT 0,
  common_quality INTEGER CHECK (common_quality IN (1, 2, 3, 4, 5)),
  weekly_amount  INTEGER DEFAULT 0,
  crown          BOOLEAN DEFAULT FALSE,
  mora           INTEGER DEFAULT 0,
  FOREIGN KEY (book_quality) REFERENCES quality (id),
  FOREIGN KEY (common_quality) REFERENCES quality (id)
);

DROP TABLE IF EXISTS character_talent_ascension;
CREATE TABLE character_talent_ascension (
  id        INTEGER PRIMARY KEY,
  character INTEGER NOT NULL,
  level     INTEGER CHECK (level IN (1, 2, 3, 4, 5, 6, 7, 8, 9)),
  book      INTEGER NOT NULL,
  common    INTEGER NOT NULL,
  weekly    INTEGER NOT NULL,
  crown     INTEGER NOT NULL,
  UNIQUE (character, level),
  FOREIGN KEY (level) REFERENCES character_talent_ascension_details (level),
  FOREIGN KEY (book) REFERENCES items (id),
  FOREIGN KEY (common) REFERENCES items (id),
  FOREIGN KEY (weekly) REFERENCES items (id),
  FOREIGN KEY (crown) REFERENCES items (id)
);

---------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS weapon_experience;
CREATE TABLE weapon_experience (
  level       INTEGER,
  quality     INTEGER CHECK (quality IN (1, 2, 3, 4, 5)),
  exp_to_next INTEGER,
  PRIMARY KEY (level, quality),
  FOREIGN KEY (quality) REFERENCES quality (id)
);

DROP TABLE IF EXISTS weapon_ascension_details;
CREATE TABLE weapon_ascension_details (
  level          INTEGER CHECK ( level IN (20, 40, 50, 60, 70, 80) ),
  weapon_quality INTEGER CHECK (weapon_quality IN (1, 2, 3, 4, 5)),
  domain_amount  INTEGER DEFAULT 0,
  domain_quality INTEGER CHECK (domain_quality IN (1, 2, 3, 4, 5)),
  elite_amount   INTEGER DEFAULT 0,
  elite_quality  INTEGER CHECK (elite_quality IN (1, 2, 3, 4, 5)),
  common_amount  INTEGER DEFAULT 0,
  common_quality INTEGER CHECK (common_quality IN (1, 2, 3, 4, 5)),
  mora           INTEGER DEFAULT 0,
  PRIMARY KEY (level, weapon_quality),
  FOREIGN KEY (weapon_quality) REFERENCES quality (id),
  FOREIGN KEY (domain_quality) REFERENCES quality (id),
  FOREIGN KEY (elite_quality) REFERENCES quality (id),
  FOREIGN KEY (common_quality) REFERENCES quality (id)
);

-- TODO: finish table
DROP TABLE IF EXISTS weapon_ascension;
CREATE TABLE weapon_ascension (
  weapon INTEGER NOT NULL PRIMARY KEY,
  FOREIGN KEY (weapon) REFERENCES weapons (id)
);