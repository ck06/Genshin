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
VALUES ('Albedo', '%ballad', '%scroll', 'Tusk of Monoceros Caeli'),
       ('Amber', '%freedom', '%arrowhead', 'Dvalin''s Sigh'),
       ('Barbara', '%freedom', '%scroll', 'Ring of Boreas'),
       ('Beidou', '%gold', '%e_ Insignia', 'Dvalin''s Sigh'),
       ('Bennett', '%resistance', '%e_ Insignia', 'Dvalin''s Plume'),
       ('Chongyun', '%diligence', '%Mask', 'Dvalin''s Sigh'),
       ('Diluc', '%resistance', '%''s Insignia', 'Dvalin''s Plume'),
       ('Diona', '%freedom', '%Arrowhead', 'Shard of a Foul Legacy'),
       ('Fischl', '%ballad', '%Arrowhead', 'Spirit Locket of Boreas'),
       ('Ganyu', '%diligence', '%Nectar', 'Shadow of the Warrior'),
       ('Jean', '%resistance', '%Mask', 'Dvalin''s Plume'),
       ('Kaeya', '%ballad', '%e_ Insignia', 'Spirit Locket of Boreas'),
       ('Keqing', '%prosperity', '%Nectar', 'Ring of Boreas'),
       ('Klee', '%freedom', '%scroll', 'Ring of Boreas'),
       ('Lisa', '%ballad', 'Slime%', 'Dvalin''s Claw'),
       ('Mona', '%resistance', '%Nectar', 'Ring of Boreas'),
       ('Ningguang', '%prosperity', '%''s Insignia', 'Spirit Locket of Boreas'),
       ('Noelle', '%resistance', '%Mask', 'Dvalin''s Claw'),
       ('Qiqi', '%prosperity', '%scroll', 'Tail of Boreas'),
       ('Razor', '%resistance', '%Mask', 'Dvalin''s Claw'),
       ('Sucrose', '%freedom', '%Nectar', 'Spirit Locket of Boreas'),
       ('Tartaglia', '%freedom', '%''s Insignia', 'Shard of a Foul Legacy'),
       ('Traveler (Anemo)', '%freedom', '%Mask', 'Dvalin''s Sigh'),
       ('Traveler (Geo)', '%freedom', '%Mask', 'Tail of Boreas'),
       ('Venti', '%ballad', 'Slime%', 'Tail of Boreas'),
       ('Xiangling', '%diligence', 'Slime%', 'Dvalin''s Claw'),
       ('Xiao', '%prosperity', 'Slime%', 'Shadow of the Warrior'),
       ('Xingqiu', '%gold', '%Mask', 'Tail of Boreas'),
       ('Xinyan', '%gold', 'Slime%', 'Tusk of Monoceros Caeli'),
       ('Zhongli', '%gold', 'Slime%', 'Tusk of Monoceros Caeli')
;

-- use the temp tables to insert IDs semi-dynamically for each level with the correct qualities.
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
;

-- cleanup
DROP TABLE IF EXISTS temp_talent_levels;
DROP TABLE IF EXISTS temp_talent_resource_names;
