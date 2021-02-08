DROP TABLE IF EXISTS character_experience;
CREATE TABLE character_experience (
  level       INTEGER,
  exp_to_next INTEGER,
  PRIMARY KEY (level)
);

DROP TABLE IF EXISTS character_ascension_amounts;
CREATE TABLE character_ascension_amounts (
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
  FOREIGN KEY (common_quality) REFERENCES quality (id)
);

DROP TABLE IF EXISTS character_ascension;
CREATE TABLE character_ascension (
  character INTEGER NOT NULL,
  level     INTEGER CHECK ( level IN (20, 40, 50, 60, 70, 80) ),
  gem       INTEGER NOT NULL,
  boss      INTEGER NULL, -- must be nullable for the Traveler.
  gather    INTEGER NOT NULL,
  common    INTEGER NOT NULL,
  PRIMARY KEY (character, level),
  FOREIGN KEY (character) REFERENCES characters (id),
  FOREIGN KEY (level) REFERENCES character_ascension_amounts (level),
  FOREIGN KEY (gem) REFERENCES items (id),
  FOREIGN KEY (boss) REFERENCES items (id),
  FOREIGN KEY (gather) REFERENCES items (id),
  FOREIGN KEY (common) REFERENCES items (id)
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

DROP TABLE IF EXISTS weapon_ascension_amounts;
CREATE TABLE weapon_ascension_amounts (
  level         INTEGER CHECK ( level IN (20, 40, 50, 60, 70, 80) ),
  quality       INTEGER CHECK (quality IN (1, 2, 3, 4, 5)),
  domain_amount INTEGER DEFAULT 0,
  elite_amount  INTEGER DEFAULT 0,
  common_amount INTEGER DEFAULT 0,
  mora          INTEGER DEFAULT 0,
  PRIMARY KEY (level, quality),
  FOREIGN KEY (quality) REFERENCES quality (id)
);

DROP TABLE IF EXISTS weapon_ascension;
CREATE TABLE weapon_ascension (
  weapon INTEGER NOT NULL PRIMARY KEY,
  FOREIGN KEY (weapon) REFERENCES weapons (id)
);