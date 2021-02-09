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
VALUES ('Albedo', 'Geo', 'Basalt Pillar', 'Cecilia', '%Scroll'),
       ('Amber', 'Pyro', 'Everflame Seed', 'Small Lamp Grass', '%Arrowhead'),
       ('Barbara', 'Hydro', 'Cleansing Heart', 'Philanemo Mushroom', '%Scroll'),
       ('Beidou', 'Electro', 'Lightning Prism', 'Noctilucous Jade', '%e_ Insignia'),
       ('Bennett', 'Pyro', 'Everflame Seed', 'Windwheel Aster', '%e_ Insignia'),
       ('Chongyun', 'Cryo', 'Hoarfrost Core', 'Cor Lapis', '%Mask'),
       ('Diluc', 'Pyro', 'Everflame Seed', 'Small Lamp Grass', '%''s Insignia'),
       ('Diona', 'Cryo', 'Hoarfrost Core', 'Calla Lily', '%Arrowhead'),
       ('Fischl', 'Electro', 'Lightning Prism', 'Small Lamp Grass', '%Arrowhead'),
       ('Ganyu', 'Cryo', 'Hoarfrost Core', 'Qingxin', '%Nectar'),
       ('Jean', 'Anemo', 'Hurricane Seed', 'Dandelion Seed', '%Mask'),
       ('Kaeya', 'Cryo', 'Hoarfrost Core', 'Calla Lily', '%e_ Insignia'),
       ('Keqing', 'Electro', 'Lightning Prism', 'Cor Lapis', '%Nectar'),
       ('Klee', 'Pyro', 'Everflame Seed', 'Philanemo Mushroom', '%Scroll'),
       ('Lisa', 'Electro', 'Lightning Prism', 'Valberry', 'Slime%'),
       ('Mona', 'Hydro', 'Cleansing Heart', 'Philanemo Mushroom', '%Nectar'),
       ('Ningguang', 'Geo', 'Basalt Pillar', 'Glaze Lily', '%''s Insignia'),
       ('Noelle', 'Geo', 'Basalt Pillar', 'Valberry', '%Mask'),
       ('Qiqi', 'Cryo', 'Hoarfrost Core', 'Violetgrass', '%Scroll'),
       ('Razor', 'Electro', 'Lightning Prism', 'Wolfhook', '%Mask'),
       ('Sucrose', 'Anemo', 'Hurricane Seed', 'Windwheel Aster', '%Nectar'),
       ('Tartaglia', 'Hydro', 'Cleansing Heart', 'Starconch', '%''s Insignia'),
       ('Traveler (Anemo)', 'Traveler-specific', '', 'Windwheel Aster', '%Mask'),
       ('Traveler (Geo)', 'Traveler-specific', '', 'Windwheel Aster', '%Mask'),
       ('Venti', 'Anemo', 'Hurricane Seed', 'Cecilia', 'Slime%'),
       ('Xiangling', 'Pyro', 'Everflame Seed', 'Jueyun Chili', 'Slime%'),
       ('Xiao', 'Anemo', 'Juvenile Jade', 'Qingxin', 'Slime%'),
       ('Xingqiu', 'Hydro', 'Cleansing Heart', 'Silk Flower', '%Mask'),
       ('Xinyan', 'Pyro', 'Everflame Seed', 'Violetgrass', 'Slime%'),
       ('Zhongli', 'Geo', 'Basalt Pillar', 'Cor Lapis', 'Slime%')
;

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
;

-- clean up
DROP TABLE IF EXISTS temp_character_ascension_levels;
DROP TABLE IF EXISTS temp_character_resource_names;
