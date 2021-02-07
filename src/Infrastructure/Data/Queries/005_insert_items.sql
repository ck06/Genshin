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

-- Talent Level-Up Materials (details: which days their domain is up on)
INSERT INTO items (name, quality, type, details)
VALUES ('', 0, 0, NULL)
;

-- TODO
INSERT INTO items (name, quality, type, details)
VALUES ('', 0, 0, NULL)
;

-- TODO
INSERT INTO items (name, quality, type, details)
VALUES ('', 0, 0, NULL)
;

-- TODO
INSERT INTO items (name, quality, type, details)
VALUES ('', 0, 0, NULL)
;

-- TODO
INSERT INTO items (name, quality, type, details)
VALUES ('', 0, 0, NULL)
;

-- TODO
INSERT INTO items (name, quality, type, details)
VALUES ('', 0, 0, NULL)
;

-- TODO
INSERT INTO items (name, quality, type, details)
VALUES ('', 0, 0, NULL)
;

-- Special Talent Level-Up Materials (details: how to obtain)
INSERT INTO items (name, quality, type, details)
VALUES ('Crown of Insight', 5, 10, 'Only obtainable through event reward');