-- Weapon EXP Material (details: amount of EXP given)
INSERT INTO items (name, quality, type, details)
VALUES ('Enhancement Ore', 1, 1, '400'),
       ('Fine Enhancement Ore', 2, 1, '2000'),
       ('Mystic Enhancement Ore', 3, 1, '10000')
;

-- Character EXP Material (details: amount of EXP given)
INSERT INTO items (name, quality, type, details)
VALUES ('Wanderer''s Advice', 2, 2, '1000'),
       ('Adventurer''s Experience', 3, 2, '5000'),
       ('Hero''s Wit', 4, 2, '20000')
;

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
       ('Philosophies of Prosperity', 4, 3, '[Monday, Thursday, Sunday]')
;

-- Local Materials
INSERT INTO items (name, quality, type)
VALUES ('Calla Lily', 1, 4),
       ('Cecilia', 1, 4),
       ('Cor Lapis', 1, 4),
       ('Dandelion Seed', 1, 4),
       ('Glaze Lily', 1, 4),
       ('Jueyun Chili', 1, 4),
       ('Noctilucous Jade', 1, 4),
       ('Philanemo Mushroom', 1, 4),
       ('Silk Flower', 1, 4),
       ('Small Lamp Grass', 1, 4),
       ('Valberry', 1, 4),
       ('Violetgrass', 1, 4),
       ('Windwheel Aster', 1, 4),
       ('Wolfhook', 1, 4),
       ('Qingxin', 1, 4),
       ('Starconch', 1, 4)
;

-- Weapon Primary Materials (details: on which days their domain is up)
INSERT INTO items (name, quality, type, details)
VALUES -- Mondstadt
       ('Tile of Decarabian''s Tower', 2, 5, '[Monday, Thursday, Sunday]'),
       ('Debris of Decarabian''s City', 3, 5, '[Monday, Thursday, Sunday]'),
       ('Fragment of Decarabian''s Epic', 4, 5, '[Monday, Thursday, Sunday]'),
       ('Scattered Piece of Decarabian''s Dream', 5, 5, '[Monday, Thursday, Sunday]'),
       ('Boreal Wolf''s Milk Tooth', 2, 5, '[Tuesday, Friday, Sunday]'),
       ('Boreal Wolf''s Cracked Tooth', 3, 5, '[Tuesday, Friday, Sunday]'),
       ('Boreal Wolf''s Broken Fang', 4, 5, '[Tuesday, Friday, Sunday]'),
       ('Boreal Wolf''s Nostalgia', 5, 5, '[Tuesday, Friday, Sunday]'),
       ('Fetters of the Dandelion Gladiator', 2, 5, '[Wednesday, Saturday, Sunday]'),
       ('Chains of the Dandelion Gladiator', 3, 5, '[Wednesday, Saturday, Sunday]'),
       ('Shackles of the Dandelion Gladiator', 4, 5, '[Wednesday, Saturday, Sunday]'),
       ('Dream of the Dandelion Gladiator', 5, 5, '[Wednesday, Saturday, Sunday]'),

       -- Liyue
       ('Luminous Sands from Guyun', 2, 5, '[Monday, Thursday, Sunday]'),
       ('Lustrous Stone from Guyun', 3, 5, '[Monday, Thursday, Sunday]'),
       ('Relic from Guyun', 4, 5, '[Monday, Thursday, Sunday]'),
       ('Divine Body from Guyun', 5, 5, '[Monday, Thursday, Sunday]'),
       ('Mist Veiled Lead Elixir', 2, 5, '[Tuesday, Friday, Sunday]'),
       ('Mist Veiled Mercury Elixir', 3, 5, '[Tuesday, Friday, Sunday]'),
       ('Mist Veiled Gold Elixir', 4, 5, '[Tuesday, Friday, Sunday]'),
       ('Mist Veiled Primo Elixir', 5, 5, '[Tuesday, Friday, Sunday]'),
       ('Grain of Aerosiderite', 2, 5, '[Wednesday, Saturday, Sunday]'),
       ('Piece of Aerosiderite', 3, 5, '[Wednesday, Saturday, Sunday]'),
       ('Bit of Aerosiderite', 4, 5, '[Wednesday, Saturday, Sunday]'),
       ('Chunk of Aerosiderite', 5, 5, '[Wednesday, Saturday, Sunday]')
;

-- Jewels (details: what element they are)
INSERT INTO items (name, quality, type, details)
VALUES ('Brilliant Diamond Sliver', 2, 6, 'Traveler-specific'),
       ('Brilliant Diamond Fragment', 3, 6, 'Traveler-specific'),
       ('Brilliant Diamond Chunk', 4, 6, 'Traveler-specific'),
       ('Brilliant Diamond Gemstone', 5, 6, 'Traveler-specific'),
       ('Agnidus Agate Sliver', 2, 6, 'Pyro'),
       ('Agnidus Agate Fragment', 3, 6, 'Pyro'),
       ('Agnidus Agate Chunk', 4, 6, 'Pyro'),
       ('Agnidus Agate Gemstone', 5, 6, 'Pyro'),
       ('Varunada Lazurite Sliver', 2, 6, 'Hydro'),
       ('Varunada Lazurite Fragment', 3, 6, 'Hydro'),
       ('Varunada Lazurite Chunk', 4, 6, 'Hydro'),
       ('Varunada Lazurite Gemstone', 5, 6, 'Hydro'),
       ('Vajrada Amethyst Sliver', 2, 6, 'Electro'),
       ('Vajrada Amethyst Fragment', 3, 6, 'Electro'),
       ('Vajrada Amethyst Chunk', 4, 6, 'Electro'),
       ('Vajrada Amethyst Gemstone', 5, 6, 'Electro'),
       ('Shivada Jade Sliver', 2, 6, 'Cryo'),
       ('Shivada Jade Fragment', 3, 6, 'Cryo'),
       ('Shivada Jade Chunk', 4, 6, 'Cryo'),
       ('Shivada Jade Gemstone', 5, 6, 'Cryo'),
       ('Vayuda Turquoise Sliver', 2, 6, 'Anemo'),
       ('Vayuda Turquoise Fragment', 3, 6, 'Anemo'),
       ('Vayuda Turquoise Chunk', 4, 6, 'Anemo'),
       ('Vayuda Turquoise Gemstone', 5, 6, 'Anemo'),
       ('Prithiva Topaz Sliver', 2, 6, 'Geo'),
       ('Prithiva Topaz Fragment', 3, 6, 'Geo'),
       ('Prithiva Topaz Chunk', 4, 6, 'Geo'),
       ('Prithiva Topaz Gemstone', 5, 6, 'Geo'),
       ('Nagadus Emerald Sliver', 2, 6, 'Dendro'),
       ('Nagadus Emerald Fragment', 3, 6, 'Dendro'),
       ('Nagadus Emerald Chunk', 4, 6, 'Dendro'),
       ('Nagadus Emerald Gemstone', 5, 6, 'Dendro')
;

-- Common Materials
INSERT INTO items (name, quality, type)
VALUES ('Slime Condensate', 1, 7),
       ('Slime Secretions', 2, 7),
       ('Slime Concentrate', 3, 7),
       ('Damaged Mask', 1, 7),
       ('Stained Mask', 2, 7),
       ('Ominous Mask', 3, 7),
       ('Divining Scroll', 1, 7),
       ('Sealed Scroll', 2, 7),
       ('Forbidden Curse Scroll', 3, 7),
       ('Firm Arrowhead', 1, 7),
       ('Sharp Arrowhead', 2, 7),
       ('Weathered Arrowhead', 3, 7),
       ('Recruit''s Insignia', 1, 7),
       ('Sergeant''s Insignia', 2, 7),
       ('Lieutenant''s Insignia', 3, 7),
       ('Treasure Hoarder Insignia', 1, 7),
       ('Silver Raven Insignia', 2, 7),
       ('Golden Raven Insignia', 3, 7),
       ('Whopperflower Nectar', 1, 7),
       ('Shimmering Nectar', 2, 7),
       ('Energy Nectar', 3, 7),
       ('Gloomy Statuette', 2, 7),
       ('Dark Statuette', 3, 7),
       ('Deathly Statuette', 4, 7)
;

-- Weapon Secondary Materials
INSERT INTO items (name, quality, type)
VALUES ('Heavy Horn', 2, 7),
       ('Black Bronze Horn', 3, 7),
       ('Black Crystal Horn', 4, 7),
       ('Dead Ley Line Branch', 2, 7),
       ('Dead Ley Line Leaves', 3, 7),
       ('Ley Line Sprout', 4, 7),
       ('Chaos Device', 2, 7),
       ('Chaos Circuit', 3, 7),
       ('Chaos Core', 4, 7),
       ('Mist Grass Pollen', 2, 7),
       ('Mist Grass', 3, 7),
       ('Mist Grass Wick', 4, 7),
       ('Hunter''s Sacrificial Knife', 2, 7),
       ('Agent''s Sacrificial Knife', 3, 7),
       ('Inspector''s Sacrificial Knife', 4, 7),
       ('Fragile Bone Shard', 2, 7),
       ('Sturdy Bone Shard', 3, 7),
       ('Fossilized Bone Shard', 4, 7)
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
VALUES ('Dvalin''s Plume', 5, 10, 'Stormterror'),
       ('Dvalin''s Claw', 5, 10, 'Stormterror'),
       ('Dvalin''s Sigh', 5, 10, 'Stormterror'),
       ('Tail of Boreas', 5, 10, 'Lupus Boreas'),
       ('Ring of Boreas', 5, 10, 'Lupus Boreas'),
       ('Spirit Locket of Boreas', 5, 10, 'Lupus Boreas'),
       ('Tusk of Monoceros Caeli', 5, 10, 'Childe'),
       ('Shard of a Foul Legacy', 5, 10, 'Childe'),
       ('Shadow of the Warrior', 5, 10, 'Childe')
;

-- Special Talent Level-Up Materials (details: how to obtain)
INSERT INTO items (name, quality, type, details)
VALUES ('Crown of Insight', 5, 11, 'Only obtainable through event reward')
;
