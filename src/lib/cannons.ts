/* eslint-disable max-lines */
// all scorched cannons for their seasons
export type SCORCHED_DICTIONARY_TYPE = {
    [key: string]: SCORCHED_SEASON_TYPE
}

export type SCORCHED_SEASON_TYPE = {
    "name": string,
    "release_date": number,
    "twas": string,
    "pass_price": number,
    "cannons": SCORCHED_CANNONS[]
}

export type SCORCHED_CANNONS = {
    "id": string,
    "name": string,
    "alt_name": string,
    "author": string,
    "cost": number,
    "scoin_bonus": number,
    "description": string,
    "image": string
}

const SCORCHED_CANNONS: SCORCHED_DICTIONARY_TYPE = {
    "season_1": {
        "name": "Season 1",
        "release_date": 0,
        "twas": "",
        "pass_price": 0,
        "cannons": [
            {
                "id": "2f463bb9-367c-4785-aead-e104e86f4584",
                "name": "Pistol",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 100,
                "scoin_bonus": 1,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Shrapnel Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 250,
                "scoin_bonus": 1,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Scrap Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 500,
                "scoin_bonus": 1,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Basic Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 1000,
                "scoin_bonus": 2,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Shock Cannon",
                "alt_name": "Arc Cannon",
                "author": "GerbSnail",
                "cost": 1250,
                "scoin_bonus": 3,
                "description": "",
                "image": "/images/cannons/season1/arc.png"
            },
            {
                "id": "",
                "name": "Null Cannon",
                "alt_name": "Void Cannon",
                "author": "GerbSnail",
                "cost": 1500,
                "scoin_bonus": 4,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Shatter Cannon",
                "alt_name": "Stasis Cannon",
                "author": "GerbSnail",
                "cost": 2000,
                "scoin_bonus": 5,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Scorchality",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 2500,
                "scoin_bonus": 6,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "MIRV Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 3000,
                "scoin_bonus": 7,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Wave Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 3500,
                "scoin_bonus": 8,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Scorch Breaker",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 4000,
                "scoin_bonus": 9,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Scorch Bringer",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 4000,
                "scoin_bonus": 10,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Scorched Simulant",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 6000,
                "scoin_bonus": 12,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Saladin's Criticism",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 7000,
                "scoin_bonus": 15,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Trials Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 8000,
                "scoin_bonus": 19,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Saint's Reverence",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 9000,
                "scoin_bonus": 23,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Scorching Lion",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 10000,
                "scoin_bonus": 29,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Scorched Lens",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 12500,
                "scoin_bonus": 36,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Malice Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 15000,
                "scoin_bonus": 45,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Gjallon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 17500,
                "scoin_bonus": 56,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Polaris Halberd",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 20000,
                "scoin_bonus": 70,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Fusor Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 25000,
                "scoin_bonus": 90,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Coming Soon...",
                "alt_name": "Telesto Cannon",
                "author": "GerbSnail",
                "cost": 999999,
                "scoin_bonus": 100,
                "description": "",
                "image": ""
            },
        ]
    },
    "season_2": {
        "name": "Season 2",
        "release_date": 1682913600,
        "twas": "1682913600",
        "pass_price": 0,
        "cannons": [
            {
                "id": "",
                "name": "Threadbound Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 1500,
                "scoin_bonus": 4,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "The Whispering Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 2000,
                "scoin_bonus": 5,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Heirloom Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 2500,
                "scoin_bonus": 6,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Nanite Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 3000,
                "scoin_bonus": 7,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "The Cooler Nanite Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 3500,
                "scoin_bonus": 8,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "The Taped Travesty",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 4000,
                "scoin_bonus": 9,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Scorched Cannon?",
                "alt_name": "Vex Head Cannon",
                "author": "GerbSnail",
                "cost": 5000,
                "scoin_bonus": 10,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Headcanon",
                "alt_name": "Cerb Cannon",
                "author": "GerbSnail",
                "cost": 6000,
                "scoin_bonus": 12,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Divinity Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 7000,
                "scoin_bonus": 15,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Ruthless Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 8000,
                "scoin_bonus": 19,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Vulcan Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 9000,
                "scoin_bonus": 23,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Witherscorched",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 10000,
                "scoin_bonus": 29,
                "description": "",
                "image": "/images/cannons/season2/witherhoard.png"
            },
            {
                "id": "",
                "name": "The Closing Act",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 12500,
                "scoin_bonus": 36,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Necro Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 15000,
                "scoin_bonus": 45,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Cryo Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 17500,
                "scoin_bonus": 56,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Scorchcalibur",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 25000,
                "scoin_bonus": 90,
                "description": "",
                "image": ""
            },
        ]
    },
    "season_3": {
        "name": "Season 3",
        "release_date": 1707850800,
        "twas": "1707850800",
        "pass_price": 2500,
        "cannons": [
            {
                "id": "",
                "name": "Tool of Evil",
                "alt_name": "Wicked Implement",
                "author": "GerbSnail",
                "cost": 0,
                "scoin_bonus": 4,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Calus' Nightmare",
                "alt_name": "Duality",
                "author": "GerbSnail",
                "cost": 400,
                "scoin_bonus": 5,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Paradoxical Flame",
                "alt_name": "Dawn",
                "author": "GerbSnail",
                "cost": 550,
                "scoin_bonus": 6,
                "description": "",
                "image": ""
            },
            {
                "id": "53bfb800-ba99-40e9-9838-7fce016ab5f2",
                "name": "Scorched Calamity 12",
                "alt_name": "Curse of Osiris",
                "author": "GerbSnail",
                "cost": 750,
                "scoin_bonus": 8,
                "description": "",
                "image": "/images/cannons/season3/Curse_of_Osiris.png"
            },
            {
                "id": "",
                "name": "The GPS",
                "alt_name": "Navigator",
                "author": "GerbSnail",
                "cost": 1000,
                "scoin_bonus": 10,
                "description": "",
                "image": ""
            },
            {
                "id": "42ea3e2a-ed8f-4030-9122-c4ef310f1cbb",
                "name": "EM Cannon",
                "alt_name": "Lorentz",
                "author": "uniQ",
                "cost": 1200,
                "scoin_bonus": 12,
                "description": "",
                "image": "/images/cannons/season3/Lorentz.png"
            },
            {
                "id": "ccbba7a7-c588-439a-b324-f72b135b6ec5",
                "name": "Cannon?",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 1400,
                "scoin_bonus": 15,
                "description": "",
                "image": "/images/cannons/season3/cannon.png"
            },
            {
                "id": "",
                "name": "Burning Opulence",
                "alt_name": "Leviathan",
                "author": "GerbSnail",
                "cost": 1600,
                "scoin_bonus": 19,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Wishful Cannon",
                "alt_name": "LastWish",
                "author": "GerbSnail",
                "cost": 1900,
                "scoin_bonus": 23,
                "description": "",
                "image": ""
            },
            {
                "id": "beccd689-c783-468e-bb5b-b20c82361013",
                "name": "Ada's Retirement Plan",
                "alt_name": "Black Armory",
                "author": "GerbSnail",
                "cost": 2200,
                "scoin_bonus": 29,
                "description": "",
                "image": "/images/cannons/season3/BlackArmory.png"
            },
            {
                "id": "",
                "name": "Sanctified Cannon",
                "alt_name": "GOS",
                "author": "GerbSnail",
                "cost": 2500,
                "scoin_bonus": 36,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "STATUS: INFERNO",
                "alt_name": "DSC",
                "author": "GerbSnail",
                "cost": 3000,
                "scoin_bonus": 45,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Lubrae's Resolution",
                "alt_name": "Vow",
                "author": "GerbSnail",
                "cost": 3500,
                "scoin_bonus": 56,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Refraction",
                "alt_name": "Tesselation",
                "author": "GerbSnail",
                "cost": 4000,
                "scoin_bonus": 70,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "Fire of the Future",
                "alt_name": "Nine",
                "author": "GerbSnail",
                "cost": 5000,
                "scoin_bonus": 90,
                "description": "",
                "image": ""
            },
            {
                "id": "",
                "name": "■■■.Name = String::new(\"placeholder\");",
                "alt_name": "SimpleProp",
                "author": "GerbSnail",
                "cost": 999999,
                "scoin_bonus": 100,
                "description": "",
                "image": ""
            },
        ]
    },
    "special": {
        "name": "Special Cannons",
        "release_date": 0,
        "twas": "",
        "pass_price": 0,
        "cannons": [
            {
                "id": "",
                "name": "10201",
                "alt_name": "Coriolis Cannon",
                "author": "GerbSnail",
                "cost": Math.max(),
                "scoin_bonus": 0,
                "description": "",
                "image": ""
            },
            {
                "id": "ScornchedCannon",
                "name": "Scornched Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": Math.max(),
                "scoin_bonus": 0,
                "description": "",
                "image": "/images/cannons/special/normal.png"
            },
            {
                "id": "",
                "name": "18470",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": Math.max(),
                "scoin_bonus": 0,
                "description": "",
                "image": ""
            },
        ]
    }
}

export default SCORCHED_CANNONS;