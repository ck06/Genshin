INSERT INTO characters (name, quality)
VALUES ('Rosaria', 4),
       ('Ayaka', 5),
       ('Hu Tao', 5)
;

--------------------------------------------------------------------------------------------------------------------

DROP TABLE IF EXISTS temp_character_ascension_levels;
CREATE TEMP TABLE temp_character_ascension_levels (
  level INTEGER
);
INSERT INTO temp_character_ascension_levels (level)
VALUES (20),
       (40),
       (50),
       (60),
       (70),
       (80);

DROP TABLE IF EXISTS temp_character_resource_names;
CREATE TEMP TABLE temp_character_resource_names (
  character VARCHAR(255),
  gem       VARCHAR(255),
  boss      VARCHAR(255),
  gather    VARCHAR(255),
  common    VARCHAR(255)
);
INSERT INTO temp_character_resource_names (character, gem, boss, gather, common)
VALUES ('Rosaria', 'Cryo', 'Hoarfrost Core', 'Valberry', '%''s Insignia'),
       ('Ayaka', 'Cryo', 'Hoarfrost Core', 'Small Lamp Grass', '%scroll'),
       ('Hu Tao', 'Pyro', 'Juvenile Jade', 'Silk Flower', '%Nectar');

DROP TABLE IF EXISTS temp_talent_levels;
CREATE TEMP TABLE temp_talent_levels (
  level INTEGER
);
INSERT INTO temp_talent_levels (level)
VALUES (1),
       (2),
       (3),
       (4),
       (5),
       (6),
       (7),
       (8),
       (9);

DROP TABLE IF EXISTS temp_talent_resource_names;
CREATE TEMP TABLE temp_talent_resource_names (
  character VARCHAR(255),
  book      VARCHAR(255),
  common    VARCHAR(255),
  weekly    VARCHAR(255)
);

INSERT INTO temp_talent_resource_names (character, book, common, weekly)
VALUES ('Rosaria', '%ballad', '%''s Insignia', 'Shadow of the Warrior'),
       ('Ayaka', '%prosperity', '%Nectar', 'Ring of Boreas'),
       ('Hu Tao', '%diligence', '%Nectar', 'Shard of a Foul Legacy');
;

--------------------------------------------------------------------------------------------------------------------


-- use the temp tables to insert IDs semi-dynamically for each level with the correct qualities.
INSERT INTO character_ascension (level, character, gem, boss, gather, common)
SELECT levels.level, characters.id, gems.id, bosses.id, gathers.id, commons.id
  FROM temp_character_ascension_levels levels,
       character_ascension_details details,
       temp_character_resource_names names
         LEFT JOIN characters ON names.character = characters.name
         LEFT JOIN items AS gems ON (names.gem = gems.details AND gems.quality = details.gem_quality)
         LEFT JOIN items AS bosses ON (names.boss = bosses.name AND bosses.quality = details.boss_quality)
         LEFT JOIN items AS gathers ON (names.gather = gathers.name AND gathers.quality = details.gather_quality)
         LEFT JOIN items AS commons ON (commons.name LIKE names.common AND commons.quality = details.common_quality)
 WHERE levels.level = details.level
   AND characters.name IN ('Rosaria', 'Ayaka', 'Hu Tao')
;


INSERT INTO character_talent_ascension (level, character, book, common, weekly, crown)
SELECT levels.level,
       characters.id AS character,
       books.id      AS book,
       commons.id    AS common,
       weeklies.id   AS weekly,
       crowns.id     AS crown
  FROM temp_talent_levels levels,
       character_talent_ascension_details details,
       temp_talent_resource_names names
         LEFT JOIN characters ON names.character = characters.name
         LEFT JOIN items AS books ON (books.name LIKE names.book AND books.quality = details.book_quality)
         LEFT JOIN items AS commons ON (commons.name LIKE names.common AND commons.quality = details.common_quality)
         LEFT JOIN items AS weeklies ON (weeklies.name = names.weekly)
         LEFT JOIN items AS crowns ON (crowns.type = 11)
 WHERE levels.level = details.level
   AND characters.name IN ('Rosaria', 'Ayaka', 'Hu Tao')
;

-- cleanup
DROP TABLE IF EXISTS temp_talent_levels;
DROP TABLE IF EXISTS temp_talent_resource_names;
DROP TABLE IF EXISTS temp_character_ascension_levels;
DROP TABLE IF EXISTS temp_character_resource_names;
