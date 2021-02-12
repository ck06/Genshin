-------------------------------------------------------------------------
/* IDs in this file are all explicitly passed because they are static. */
-------------------------------------------------------------------------
INSERT INTO quality (id, color)
VALUES (1, 'Grey'),
       (2, 'Green'),
       (3, 'Blue'),
       (4, 'Purple'),
       (5, 'Gold')
;

-- types are ordered like documented in the RequiredResourcesConverter.
INSERT INTO item_types (id, in_code, in_data)
VALUES (1, 'experienceOre', 'Weapon EXP Material'),
       (2, 'experienceBook', 'Character EXP Material'),
       (3, 'talentBook', 'Talent Level-Up Materials'),
       (4, 'gather', 'Local Materials'),
       (5, 'domain', 'Weapon Primary Materials'),
       (6, 'gems', 'Jewels'),
       (7, 'common', 'Common Materials'),
       (8, 'elite', 'Weapon Secondary Materials'),
       (9, 'resin', 'Elemental Stones'),

       -- These are handled separately in the code, so they require their own types.
       (10, 'weekly', 'Talent Level-Up Materials'),
       (11, 'crown', 'Talent Level-Up Materials')
;
