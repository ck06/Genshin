-- Weapon EXP Material (details: amount of EXP given)
INSERT INTO items (name, quality, type, details)
VALUES ('Enhancement Ore', 1, 1, '400'),
       ('Fine Enhancement Ore', 2, 1, '2000'),
       ('Mystic Enhancement Ore', 3, 1, '10000');

-- Character EXP Material (details: amount of EXP given)
INSERT INTO items (name, quality, type, details)
VALUES ('Wanderer''s Advice', 2, 2, '1000'),
       ('Adventurer''s Experience', 3, 2, '5000'),
       ('Hero''s Wit', 4, 2, '20000');

-- Talent Level-Up Materials (details: on which days their domain is up)
INSERT INTO items (name, quality, type, details)
VALUES -- Mondstadt
       ('Teachings of Ballad', 2, 3, '[Wednesday, Saturday, Sunday]'),
       ('Guide to Ballad', 3, 3, '[Wednesday, Saturday, Sunday]'),
       ('Philosophies of Ballad', 4, 3, '[Wednesday, Saturday, Sunday]'),
       ('Teachings of Freedom', 2, 3, '[Monday, Thursday, Sunday]'),
       ('Guide to Freedom', 3, 3, '[Monday, Thursday, Sunday]'),
       ('Philosophies of Freedom', 4, 3, '[Monday, Thursday, Sunday]'),
       ('Teachings of Resistance', 2, 3, '[Tuesday, Friday, Sunday]'),
       ('Guide to Resistance', 3, 3, '[Tuesday, Friday, Sunday]'),
       ('Philosophies of Resistance', 4, 3, '[Tuesday, Friday, Sunday]'),

       -- Liyue
       ('Teachings of Diligence', 2, 3, '[Tuesday, Friday, Sunday]'),
       ('Guide to Diligence', 3, 3, '[Tuesday, Friday, Sunday]'),
       ('Philosophies of Diligence', 4, 3, '[Tuesday, Friday, Sunday]'),
       ('Teachings of Gold', 2, 3, '[Wednesday, Saturday, Sunday]'),
       ('Guide to Gold', 3, 3, '[Wednesday, Saturday, Sunday]'),
       ('Philosophies of Gold', 4, 3, '[Wednesday, Saturday, Sunday]'),
       ('Teachings of Prosperity', 2, 3, '[Monday, Thursday, Sunday]'),
       ('Guide to Prosperity', 3, 3, '[Monday, Thursday, Sunday]'),
       ('Philosophies of Prosperity', 4, 3, '[Monday, Thursday, Sunday]'),
;

-- Local Materials
INSERT INTO items (name, quality, type)
VALUES ('', 0, 0)
;

-- Weapon Primary Materials (details: on which days their domain is up)
INSERT INTO items (name, quality, type, details)
VALUES ('', 0, 0, NULL)
;

-- Jewels (details: what element they are)
INSERT INTO items (name, quality, type, details)
VALUES ('', 0, 0, NULL)
;

-- Common Materials
INSERT INTO items (name, quality, type)
VALUES ('', 0, 0)
;

-- Weapon Secondary Materials
INSERT INTO items (name, quality, type, details)
VALUES ('', 0, 0, NULL)
;

-- Elemental Stones (details: what boss they drop from)
INSERT INTO items (name, quality, type, details)
VALUES ('Everflame Seed', 4, 9, 'Pyro Regisvine'),
       ('Cleansing Heart', 4, 9, 'Oceanid'),
       ('Lightning Prism', 4, 9, 'Electro Hypostasis'),
       ('Hoarfrost Core', 4, 9, 'Cryo Regisvine'),
       ('Hurricane Seed', 4, 9, 'Geo Hypostasis'),
       ('Basalt Pillar', 4, 9, 'Anemo Hypostasis'),
       ('Juvenile Jade', 4, 9, 'Primo Geovishap')
;

-- Weekly Talent Level-Up Materials (details: which boss they drop from, if needed)
INSERT INTO items (name, quality, type, details)
VALUES ('Dvalin''s Plume', 5, 10, NULL),
       ('Dvalin''s Claw', 5, 10, NULL),
       ('Dvalin''s Sigh', 5, 10, NULL),
       ('Tail of Boreas', 5, 10, NULL),
       ('Ring of Boreas', 5, 10, NULL),
       ('Spirit Locket of Boreas', 5, 10, NULL),
       ('Tusk of Monoceros Caeli', 5, 10, 'Childe'),
       ('Shard of a Foul Legacy', 5, 10, 'Childe'),
       ('Shadow of the Warrior', 5, 10, 'Childe'),
;

-- Special Talent Level-Up Materials (details: how to obtain)
INSERT INTO items (name, quality, type, details)
VALUES ('Crown of Insight', 5, 11, 'Only obtainable through event reward');
