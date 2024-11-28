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
    "hash": string,
    "name": string,
    "alt_name": string,
    "author": string,
    "cost": number,
    "scoin_bonus": number,
    "description": string,
    "image": string
}

const SCORCHED_CANNONS: SCORCHED_DICTIONARY_TYPE = {
    "S1": {
        "name": "Season 1",
        "release_date": 0,
        "twas": "",
        "pass_price": 0,
        "cannons": [
            {
                "hash": "PistolCannon",
                "name": "Pistol",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 100,
                "scoin_bonus": 1,
                "description": "",
                "image": "/images/cannons/season1/PistolCannon.png"
            },
            {
                "hash": "ShrapnelCannon",
                "name": "Shrapnel Cannon",
                "alt_name": "Scorch Rifle",
                "author": "GerbSnail",
                "cost": 250,
                "scoin_bonus": 1,
                "description": "",
                "image": "/images/cannons/season1/ShrapnelCannon.png"
            },
            {
                "hash": "ScrapCannon",
                "name": "Scrap Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 500,
                "scoin_bonus": 1,
                "description": "",
                "image": "/images/cannons/season1/"
            },
            {
                "hash": "BasicCannon",
                "name": "Basic Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 1000,
                "scoin_bonus": 2,
                "description": "",
                "image": "/images/cannons/season1/BasicCannon.png"
            },
            {
                "hash": "ArcCannon",
                "name": "Shock Cannon",
                "alt_name": "Arc Cannon",
                "author": "GerbSnail",
                "cost": 1250,
                "scoin_bonus": 3,
                "description": "",
                "image": "/images/cannons/season1/ArcCannon.png"
            },
            {
                "hash": "VoidCannon",
                "name": "Null Cannon",
                "alt_name": "Void Cannon",
                "author": "GerbSnail",
                "cost": 1500,
                "scoin_bonus": 4,
                "description": "",
                "image": "/images/cannons/season1/VoidCannon.png"
            },
            {
                "hash": "StasisCannon",
                "name": "Shatter Cannon",
                "alt_name": "Stasis Cannon",
                "author": "GerbSnail",
                "cost": 2000,
                "scoin_bonus": 5,
                "description": "",
                "image": "/images/cannons/season1/StasisCannon.png"
            },
            {
                "hash": "Scorchality",
                "name": "Scorchality",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 2500,
                "scoin_bonus": 6,
                "description": "",
                "image": "/images/cannons/season1/Scorchality.png"
            },
            {
                "hash": "MIRVCannon",
                "name": "MIRV Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 3000,
                "scoin_bonus": 7,
                "description": "",
                "image": "/images/cannons/season1/MIRVCannon.png"
            },
            {
                "hash": "WaveCannon",
                "name": "Wave Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 3500,
                "scoin_bonus": 8,
                "description": "",
                "image": "/images/cannons/season1/WaveCannon.png"
            },
            {
                "hash": "ScorchBreaker",
                "name": "Scorch Breaker",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 4000,
                "scoin_bonus": 9,
                "description": "",
                "image": "/images/cannons/season1/ScorchBreaker.png"
            },
            {
                "hash": "ScorchBringer",
                "name": "Scorch Bringer",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 4000,
                "scoin_bonus": 10,
                "description": "",
                "image": "/images/cannons/season1/ScorchBringer.png"
            },
            {
                "hash": "ScorchedSimulant",
                "name": "Scorched Simulant",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 6000,
                "scoin_bonus": 12,
                "description": "",
                "image": "/images/cannons/season1/ScorchedSimulant.png"
            },
            {
                "hash": "SaladinsCriticism",
                "name": "Saladin's Criticism",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 7000,
                "scoin_bonus": 15,
                "description": "",
                "image": "/images/cannons/season1/SaladinsCriticism.png"
            },
            {
                "hash": "TrialsCannon",
                "name": "Trials Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 8000,
                "scoin_bonus": 19,
                "description": "",
                "image": "/images/cannons/season1/TrialsCannon.png"
            },
            {
                "hash": "SaintsReverence",
                "name": "Saint's Reverence",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 9000,
                "scoin_bonus": 23,
                "description": "",
                "image": "/images/cannons/season1/SaintsReverence.png"
            },
            {
                "hash": "ScorchingLion",
                "name": "Scorching Lion",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 10000,
                "scoin_bonus": 29,
                "description": "",
                "image": "/images/cannons/season1/ScorchingLion.png"
            },
            {
                "hash": "ScorchedLens",
                "name": "Scorched Lens",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 12500,
                "scoin_bonus": 36,
                "description": "",
                "image": "/images/cannons/season1/ScorchedLens.png"
            },
            {
                "hash": "MaliceCannon",
                "name": "Malice Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 15000,
                "scoin_bonus": 45,
                "description": "",
                "image": "/images/cannons/season1/MaliceCannon.png"
            },
            {
                "hash": "Gjallon",
                "name": "Gjallon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 17500,
                "scoin_bonus": 56,
                "description": "",
                "image": "/images/cannons/season1/Gjallon.png"
            },
            {
                "hash": "PolarisHalberd",
                "name": "Polaris Halberd",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 20000,
                "scoin_bonus": 70,
                "description": "",
                "image": "/images/cannons/season1/PolarisHalberd.png"
            },
            {
                "hash": "FusorCannon",
                "name": "Fusor Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 25000,
                "scoin_bonus": 90,
                "description": "",
                "image": "/images/cannons/season1/FusorCannon.png"
            },
            {
                "hash": "TelestoCannon",
                "name": "Coming Soon...",
                "alt_name": "Telesto Cannon",
                "author": "GerbSnail",
                "cost": 999999,
                "scoin_bonus": 100,
                "description": "",
                "image": "/images/cannons/season1/TelestoCannon.png"
            },
        ]
    },
    "S2": {
        "name": "Season 2",
        "release_date": 1682913600,
        "twas": "1682913600",
        "pass_price": 0,
        "cannons": [
            {
                "hash": "ThreadboundCannon",
                "name": "Threadbound Cannon",
                "alt_name": "Strand",
                "author": "GerbSnail",
                "cost": 1500,
                "scoin_bonus": 4,
                "description": "",
                "image": "/images/cannons/season2/ThreadboundCannon.png"
            },
            {
                "hash": "WhisperingCannon",
                "name": "The Whispering Cannon",
                "alt_name": "Taken",
                "author": "GerbSnail",
                "cost": 2000,
                "scoin_bonus": 5,
                "description": "",
                "image": "/images/cannons/season2/WhisperingCannon.png"
            },
            {
                "hash": "HeirloomCannon",
                "name": "Heirloom Cannon",
                "alt_name": "Heir",
                "author": "GerbSnail",
                "cost": 2500,
                "scoin_bonus": 6,
                "description": "",
                "image": "/images/cannons/season2/HeirloomCannon.png"
            },
            {
                "hash": "NaniteCannon",
                "name": "Nanite Cannon",
                "alt_name": "Outbreak",
                "author": "GerbSnail",
                "cost": 3000,
                "scoin_bonus": 7,
                "description": "",
                "image": "/images/cannons/season2/NaniteCannon.png"
            },
            {
                "hash": "CoolerNaniteCannon",
                "name": "The Cooler Nanite Cannon",
                "alt_name": "Quicksilver",
                "author": "GerbSnail",
                "cost": 3500,
                "scoin_bonus": 8,
                "description": "",
                "image": "/images/cannons/season2/CoolerNaniteCannon.png"
            },
            {
                "hash": "TapedTravesty",
                "name": "The Taped Travesty",
                "alt_name": "By definition a trident",
                "author": "GerbSnail",
                "cost": 4000,
                "scoin_bonus": 9,
                "description": "",
                "image": "/images/cannons/season2/TapedTravesty.png"
            },
            {
                "hash": "VexHeadCannon",
                "name": "Scorched Cannon?",
                "alt_name": "Vex Head Cannon; ah_yup_that_things_a_scorch_cannon",
                "author": "GerbSnail",
                "cost": 5000,
                "scoin_bonus": 10,
                "description": "",
                "image": "/images/cannons/season2/VexHeadCannon.png"
            },
            {
                "hash": "CerbCannon",
                "name": "Headcanon",
                "alt_name": "Cerb Cannon",
                "author": "GerbSnail",
                "cost": 6000,
                "scoin_bonus": 12,
                "description": "",
                "image": "/images/cannons/season2/CerbCannon.png"
            },
            {
                "hash": "DivCannon",
                "name": "Divinity Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 7000,
                "scoin_bonus": 15,
                "description": "",
                "image": "/images/cannons/season2/DivCannon.png"
            },
            {
                "hash": "RuthlessCannon",
                "name": "Ruthless Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 8000,
                "scoin_bonus": 19,
                "description": "",
                "image": "/images/cannons/season2/RuthlessCannon.png"
            },
            {
                "hash": "VulcanCannon",
                "name": "Vulcan Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 9000,
                "scoin_bonus": 23,
                "description": "",
                "image": "/images/cannons/season2/VulcanCannon.png"
            },
            {
                "hash": "WitherScorched",
                "name": "Witherscorched",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 10000,
                "scoin_bonus": 29,
                "description": "",
                "image": "/images/cannons/season2/WitherScorched.png"
            },
            {
                "hash": "ClosingAct",
                "name": "The Closing Act",
                "alt_name": "ngl_I_forgot_what_this_one_was_called",
                "author": "GerbSnail",
                "cost": 12500,
                "scoin_bonus": 36,
                "description": "",
                "image": "/images/cannons/season2/ClosingAct.png"
            },
            {
                "hash": "NecroCannon",
                "name": "Necro Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 15000,
                "scoin_bonus": 45,
                "description": "",
                "image": "/images/cannons/season2/NecroCannon.png"
            },
            {
                "hash": "CryoCannon",
                "name": "Cryo Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 17500,
                "scoin_bonus": 56,
                "description": "",
                "image": "/images/cannons/season2/CryoCannon.png"
            },
            {
                "hash": "IcyHotCannon",
                "name": "IcyHot Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 20000,
                "scoin_bonus": 56,
                "description": "",
                "image": "/images/cannons/season2/IcyHotCannon.png"
            },
            {
                "hash": "Scorchcalibur",
                "name": "Scorchcalibur",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 25000,
                "scoin_bonus": 90,
                "description": "",
                "image": "/images/cannons/season2/Scorchcalibur.png"
            },
        ]
    },
    "S3": {
        "name": "Season 3",
        "release_date": 1707850800,
        "twas": "1707850800",
        "pass_price": 2500,
        "cannons": [
            {
                "hash": "WickedImplement",
                "name": "Tool of Evil",
                "alt_name": "Wicked Implement, this_thing_is_still_really_ugly",
                "author": "GerbSnail",
                "cost": 0,
                "scoin_bonus": 4,
                "description": "",
                "image": "/images/cannons/season3/WickedImplement.png"
            },
            {
                "hash": "Duality",
                "name": "Calus' Nightmare",
                "alt_name": "Duality",
                "author": "GerbSnail",
                "cost": 400,
                "scoin_bonus": 5,
                "description": "",
                "image": "/images/cannons/season3/Duality.png"
            },
            {
                "hash": "Dawn",
                "name": "Paradoxical Flame",
                "alt_name": "Dawn",
                "author": "GerbSnail",
                "cost": 550,
                "scoin_bonus": 6,
                "description": "",
                "image": "/images/cannons/season3/Dawn.png"
            },
            {
                "hash": "CurseofOsiris",
                "name": "Scorched Calamity 12",
                "alt_name": "Curse of Osiris",
                "author": "GerbSnail",
                "cost": 750,
                "scoin_bonus": 8,
                "description": "",
                "image": "/images/cannons/season3/Curse_of_Osiris.png"
            },
            {
                "hash": "Navigator",
                "name": "The GPS",
                "alt_name": "Navigator",
                "author": "GerbSnail",
                "cost": 1000,
                "scoin_bonus": 10,
                "description": "",
                "image": "/images/cannons/season3/Navigator.png"
            },
            {
                "hash": "Lorentz",
                "name": "EM Cannon",
                "alt_name": "Lorentz",
                "author": "uniQ",
                "cost": 1200,
                "scoin_bonus": 12,
                "description": "",
                "image": "/images/cannons/season3/Lorentz.png"
            },
            {
                "hash": "Cannon?",
                "name": "Cannon?",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 1400,
                "scoin_bonus": 15,
                "description": "",
                "image": "/images/cannons/season3/cannon.png"
            },
            {
                "hash": "Leviathan",
                "name": "Burning Opulence",
                "alt_name": "Leviathan",
                "author": "GerbSnail",
                "cost": 1600,
                "scoin_bonus": 19,
                "description": "",
                "image": "/images/cannons/season3/Leviathan.png"
            },
            {
                "hash": "LastWish",
                "name": "Wishful Cannon",
                "alt_name": "LastWish",
                "author": "GerbSnail",
                "cost": 1900,
                "scoin_bonus": 23,
                "description": "",
                "image": "/images/cannons/season3/LastWish.png"
            },
            {
                "hash": "BlackArmory",
                "name": "Ada's Retirement Plan",
                "alt_name": "Black Armory",
                "author": "GerbSnail",
                "cost": 2200,
                "scoin_bonus": 29,
                "description": "",
                "image": "/images/cannons/season3/BlackArmory.png"
            },
            {
                "hash": "GOS",
                "name": "Sanctified Cannon",
                "alt_name": "GOS",
                "author": "GerbSnail",
                "cost": 2500,
                "scoin_bonus": 36,
                "description": "",
                "image": "/images/cannons/season3/GOS.png"
            },
            {
                "hash": "DSC",
                "name": "STATUS: INFERNO",
                "alt_name": "DSC",
                "author": "GerbSnail",
                "cost": 3000,
                "scoin_bonus": 45,
                "description": "",
                "image": "/images/cannons/season3/DSC.png"
            },
            {
                "hash": "Vow",
                "name": "Lubrae's Resolution",
                "alt_name": "Vow",
                "author": "GerbSnail",
                "cost": 3500,
                "scoin_bonus": 56,
                "description": "",
                "image": "/images/cannons/season3/Vow.png"
            },
            {
                "hash": "Tesselation",
                "name": "Refraction",
                "alt_name": "Tesselation",
                "author": "GerbSnail",
                "cost": 4000,
                "scoin_bonus": 70,
                "description": "",
                "image": "/images/cannons/season3/Tesselation.png"
            },
            {
                "hash": "Nine",
                "name": "Fire of the Future",
                "alt_name": "Nine",
                "author": "GerbSnail",
                "cost": 5000,
                "scoin_bonus": 90,
                "description": "",
                "image": "/images/cannons/season3/Nine.png"
            },
            {
                "hash": "SimpleProp",
                "name": "■■■.Name = String::new(\"placeholder\");",
                "alt_name": "SimpleProp",
                "author": "GerbSnail",
                "cost": 999999,
                "scoin_bonus": 100,
                "description": "",
                "image": "/images/cannons/season3/SimpleProp.png"
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
                "hash": "CoriolisCannon",
                "name": "10201",
                "alt_name": "Coriolis Cannon",
                "author": "GerbSnail",
                "cost": Math.max(),
                "scoin_bonus": 0,
                "description": "This is Ecdragonz's Secret Cannon. More details about it can be found in the TWAS, but the gist is that this cannon appears in our DnD campaign and is wielded by an eldritch abomination (played by Zombie). It's made of mostly small parts of the Rasputin heavy frame model and other Rasputin assets, and its 'taken' looking corruption at the front reflects its corrupted power source. Its name ingame is the Scourge Cannon, if you were wondering.",
                "image": "/images/cannons/special/CoriolisCannon.png"
            },
            {
                "hash": "ScornchedCannon",
                "name": "Scornched Cannon",
                "alt_name": "Cob Cannon",
                "author": "GerbSnail",
                "cost": Math.max(),
                "scoin_bonus": 0,
                "description": "This is Zombie's Secret Cannon. It is one of the very first ever created, and its use is fairly outdated since we very rarely see anyone earning a multiple of seven anymore. Either way, I see it as a landmark and it plays into Zombie's love for corn so I think it's nice. Definitely on the list of ones to redo in the future though.",
                "image": "/images/cannons/special/ScornchedCannon.png"
            },
            {
                "hash": "CoriolisCannon2",
                "name": "18470",
                "alt_name": "[PLACEHOLDER NAME], Scourge_Cannon",
                "author": "GerbSnail",
                "cost": Math.max(),
                "scoin_bonus": 0,
                "description": "This is my secret cannon. Outside of Scorched and 3D art, I also have a love for going out of bounds and glitching Destiny as a whole. The Simple Prop at the center of the cannon is actually an asset that exists in Destiny, and it can be seen rarely in places such as out of box in the Dreadnaught and the Menagerie, and down below the final boss arena in the original Black Garden. This cannon represents all three of my Destiny-related passions in one neat little package.",
                "image": "/images/cannons/special/CoriolisCannon2.png"
            },
        ]
    }
}

export default SCORCHED_CANNONS;