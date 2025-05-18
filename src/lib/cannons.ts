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
    "image": string,
    "3d"?: string
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
                "image": "/images/cannons/season1/PistolCannon.webp"
            },
            {
                "hash": "ShrapnelCannon",
                "name": "Shrapnel Cannon",
                "alt_name": "Scorch Rifle",
                "author": "GerbSnail",
                "cost": 250,
                "scoin_bonus": 1,
                "description": "",
                "image": "/images/cannons/season1/ShrapnelCannon.webp",
                "3d": "https://cdn.scorched.report/3398177269.glb"
            },
            {
                "hash": "ScrapCannon",
                "name": "Scrap Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 500,
                "scoin_bonus": 1,
                "description": "",
                "image": "/images/cannons/season1/ScrapCannon.webp",
                "3d": "https://cdn.scorched.report/3860411451.glb"
            },
            {
                "hash": "BasicCannon",
                "name": "Basic Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 1000,
                "scoin_bonus": 2,
                "description": "",
                "image": "/images/cannons/season1/BasicCannon.webp",
                "3d": "https://cdn.scorched.report/851616958.glb"
            },
            {
                "hash": "ArcCannon",
                "name": "Shock Cannon",
                "alt_name": "Arc Cannon",
                "author": "GerbSnail",
                "cost": 1250,
                "scoin_bonus": 3,
                "description": "",
                "image": "/images/cannons/season1/ArcCannon.webp",
                "3d": "https://cdn.scorched.report/2448259848.glb"
            },
            {
                "hash": "VoidCannon",
                "name": "Null Cannon",
                "alt_name": "Void Cannon",
                "author": "GerbSnail",
                "cost": 1500,
                "scoin_bonus": 4,
                "description": "",
                "image": "/images/cannons/season1/VoidCannon.webp"
            },
            {
                "hash": "StasisCannon",
                "name": "Shatter Cannon",
                "alt_name": "Stasis Cannon",
                "author": "GerbSnail",
                "cost": 2000,
                "scoin_bonus": 5,
                "description": "",
                "image": "/images/cannons/season1/StasisCannon.webp"
            },
            {
                "hash": "Scorchality",
                "name": "Scorchality",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 2500,
                "scoin_bonus": 6,
                "description": "",
                "image": "/images/cannons/season1/Scorchality.webp"
            },
            {
                "hash": "MIRVCannon",
                "name": "MIRV Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 3000,
                "scoin_bonus": 7,
                "description": "",
                "image": "/images/cannons/season1/MIRVCannon.webp"
            },
            {
                "hash": "WaveCannon",
                "name": "Wave Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 3500,
                "scoin_bonus": 8,
                "description": "",
                "image": "/images/cannons/season1/WaveCannon.webp"
            },
            {
                "hash": "ScorchBreaker",
                "name": "Scorch Breaker",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 4000,
                "scoin_bonus": 9,
                "description": "",
                "image": "/images/cannons/season1/ScorchBreaker.webp"
            },
            {
                "hash": "ScorchBringer",
                "name": "Scorch Bringer",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 4000,
                "scoin_bonus": 10,
                "description": "",
                "image": "/images/cannons/season1/ScorchBringer.webp"
            },
            {
                "hash": "ScorchedSimulant",
                "name": "Scorched Simulant",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 6000,
                "scoin_bonus": 12,
                "description": "",
                "image": "/images/cannons/season1/ScorchedSimulant.webp"
            },
            {
                "hash": "SaladinsCriticism",
                "name": "Saladin's Criticism",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 7000,
                "scoin_bonus": 15,
                "description": "",
                "image": "/images/cannons/season1/SaladinsCriticism.webp"
            },
            {
                "hash": "TrialsCannon",
                "name": "Trials Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 8000,
                "scoin_bonus": 19,
                "description": "",
                "image": "/images/cannons/season1/TrialsCannon.webp"
            },
            {
                "hash": "SaintsReverence",
                "name": "Saint's Reverence",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 9000,
                "scoin_bonus": 23,
                "description": "",
                "image": "/images/cannons/season1/SaintsReverence.webp"
            },
            {
                "hash": "ScorchingLion",
                "name": "Scorching Lion",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 10000,
                "scoin_bonus": 29,
                "description": "",
                "image": "/images/cannons/season1/ScorchingLion.webp"
            },
            {
                "hash": "ScorchedLens",
                "name": "Scorched Lens",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 12500,
                "scoin_bonus": 36,
                "description": "",
                "image": "/images/cannons/season1/ScorchedLens.webp"
            },
            {
                "hash": "MaliceCannon",
                "name": "Malice Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 15000,
                "scoin_bonus": 45,
                "description": "",
                "image": "/images/cannons/season1/MaliceCannon.webp"
            },
            {
                "hash": "Gjallon",
                "name": "Gjallon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 17500,
                "scoin_bonus": 56,
                "description": "",
                "image": "/images/cannons/season1/Gjallon.webp"
            },
            {
                "hash": "PolarisHalberd",
                "name": "Polaris Halberd",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 20000,
                "scoin_bonus": 70,
                "description": "",
                "image": "/images/cannons/season1/PolarisHalberd.webp"
            },
            {
                "hash": "FusorCannon",
                "name": "Fusor Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 25000,
                "scoin_bonus": 90,
                "description": "",
                "image": "/images/cannons/season1/FusorCannon.webp"
            },
            {
                "hash": "TelestoCannon",
                "name": "Coming Soon...",
                "alt_name": "Telesto Cannon",
                "author": "GerbSnail",
                "cost": 999999,
                "scoin_bonus": 100,
                "description": "",
                "image": "/images/cannons/season1/TelestoCannon.webp"
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
                "image": "/images/cannons/season2/ThreadboundCannon.webp"
            },
            {
                "hash": "WhisperingCannon",
                "name": "The Whispering Cannon",
                "alt_name": "Taken",
                "author": "GerbSnail",
                "cost": 2000,
                "scoin_bonus": 5,
                "description": "",
                "image": "/images/cannons/season2/WhisperingCannon.webp"
            },
            {
                "hash": "HeirloomCannon",
                "name": "Heirloom Cannon",
                "alt_name": "Heir",
                "author": "GerbSnail",
                "cost": 2500,
                "scoin_bonus": 6,
                "description": "",
                "image": "/images/cannons/season2/HeirloomCannon.webp"
            },
            {
                "hash": "NaniteCannon",
                "name": "Nanite Cannon",
                "alt_name": "Outbreak",
                "author": "GerbSnail",
                "cost": 3000,
                "scoin_bonus": 7,
                "description": "",
                "image": "/images/cannons/season2/NaniteCannon.webp"
            },
            {
                "hash": "CoolerNaniteCannon",
                "name": "The Cooler Nanite Cannon",
                "alt_name": "Quicksilver",
                "author": "GerbSnail",
                "cost": 3500,
                "scoin_bonus": 8,
                "description": "",
                "image": "/images/cannons/season2/CoolerNaniteCannon.webp"
            },
            {
                "hash": "TapedTravesty",
                "name": "The Taped Travesty",
                "alt_name": "By definition a trident",
                "author": "GerbSnail",
                "cost": 4000,
                "scoin_bonus": 9,
                "description": "",
                "image": "/images/cannons/season2/TapedTravesty.webp"
            },
            {
                "hash": "VexHeadCannon",
                "name": "Scorched Cannon?",
                "alt_name": "Vex Head Cannon; ah yup that things a scorch cannon",
                "author": "GerbSnail",
                "cost": 5000,
                "scoin_bonus": 10,
                "description": "",
                "image": "/images/cannons/season2/VexHeadCannon.webp"
            },
            {
                "hash": "CerbCannon",
                "name": "Headcanon",
                "alt_name": "Cerb Cannon",
                "author": "GerbSnail",
                "cost": 6000,
                "scoin_bonus": 12,
                "description": "",
                "image": "/images/cannons/season2/CerbCannon.webp"
            },
            {
                "hash": "DivCannon",
                "name": "Divinity Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 7000,
                "scoin_bonus": 15,
                "description": "",
                "image": "/images/cannons/season2/DivCannon.webp"
            },
            {
                "hash": "RuthlessCannon",
                "name": "Ruthless Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 8000,
                "scoin_bonus": 19,
                "description": "",
                "image": "/images/cannons/season2/RuthlessCannon.webp"
            },
            {
                "hash": "VulcanCannon",
                "name": "Vulcan Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 9000,
                "scoin_bonus": 23,
                "description": "",
                "image": "/images/cannons/season2/VulcanCannon.webp"
            },
            {
                "hash": "WitherScorched",
                "name": "Witherscorched",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 10000,
                "scoin_bonus": 29,
                "description": "",
                "image": "/images/cannons/season2/WitherScorched.webp"
            },
            {
                "hash": "ClosingAct",
                "name": "The Closing Act",
                "alt_name": "ngl I forgot what this one was called",
                "author": "GerbSnail",
                "cost": 12500,
                "scoin_bonus": 36,
                "description": "",
                "image": "/images/cannons/season2/ClosingAct.webp"
            },
            {
                "hash": "NecroCannon",
                "name": "Necro Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 15000,
                "scoin_bonus": 45,
                "description": "",
                "image": "/images/cannons/season2/NecroCannon.webp"
            },
            {
                "hash": "CryoCannon",
                "name": "Cryo Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 17500,
                "scoin_bonus": 56,
                "description": "",
                "image": "/images/cannons/season2/CryoCannon.webp"
            },
            {
                "hash": "IcyHotCannon",
                "name": "IcyHot Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 20000,
                "scoin_bonus": 56,
                "description": "",
                "image": "/images/cannons/season2/IcyHotCannon.webp"
            },
            {
                "hash": "Scorchcalibur",
                "name": "Scorchcalibur",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 25000,
                "scoin_bonus": 90,
                "description": "",
                "image": "/images/cannons/season2/Scorchcalibur.webp"
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
                "alt_name": "Wicked Implement, this thing is still really ugly",
                "author": "GerbSnail",
                "cost": 0,
                "scoin_bonus": 4,
                "description": "",
                "image": "/images/cannons/season3/WickedImplement.webp"
            },
            {
                "hash": "Duality",
                "name": "Calus' Nightmare",
                "alt_name": "Duality",
                "author": "GerbSnail",
                "cost": 400,
                "scoin_bonus": 5,
                "description": "",
                "image": "/images/cannons/season3/Duality.webp"
            },
            {
                "hash": "Dawn",
                "name": "Paradoxical Flame",
                "alt_name": "Dawn",
                "author": "GerbSnail",
                "cost": 550,
                "scoin_bonus": 6,
                "description": "",
                "image": "/images/cannons/season3/Dawn.webp"
            },
            {
                "hash": "CurseofOsiris",
                "name": "Scorched Calamity 12",
                "alt_name": "Curse of Osiris",
                "author": "GerbSnail",
                "cost": 750,
                "scoin_bonus": 8,
                "description": "",
                "image": "/images/cannons/season3/Curse_of_Osiris.webp"
            },
            {
                "hash": "Navigator",
                "name": "The GPS",
                "alt_name": "Navigator",
                "author": "GerbSnail",
                "cost": 1000,
                "scoin_bonus": 10,
                "description": "",
                "image": "/images/cannons/season3/Navigator.webp"
            },
            {
                "hash": "Lorentz",
                "name": "EM Cannon",
                "alt_name": "Lorentz",
                "author": "uniQ",
                "cost": 1200,
                "scoin_bonus": 12,
                "description": "",
                "image": "/images/cannons/season3/Lorentz.webp"
            },
            {
                "hash": "Cannon?",
                "name": "Cannon?",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 1400,
                "scoin_bonus": 15,
                "description": "",
                "image": "/images/cannons/season3/cannon.webp"
            },
            {
                "hash": "Leviathan",
                "name": "Burning Opulence",
                "alt_name": "Leviathan",
                "author": "GerbSnail",
                "cost": 1600,
                "scoin_bonus": 19,
                "description": "",
                "image": "/images/cannons/season3/Leviathan.webp"
            },
            {
                "hash": "LastWish",
                "name": "Wishful Cannon",
                "alt_name": "LastWish",
                "author": "GerbSnail",
                "cost": 1900,
                "scoin_bonus": 23,
                "description": "",
                "image": "/images/cannons/season3/LastWish.webp"
            },
            {
                "hash": "BlackArmory",
                "name": "Ada's Retirement Plan",
                "alt_name": "Black Armory",
                "author": "GerbSnail",
                "cost": 2200,
                "scoin_bonus": 29,
                "description": "",
                "image": "/images/cannons/season3/BlackArmory.webp"
            },
            {
                "hash": "GOS",
                "name": "Sanctified Cannon",
                "alt_name": "GOS",
                "author": "GerbSnail",
                "cost": 2500,
                "scoin_bonus": 36,
                "description": "",
                "image": "/images/cannons/season3/GOS.webp"
            },
            {
                "hash": "DSC",
                "name": "STATUS: INFERNO",
                "alt_name": "DSC",
                "author": "GerbSnail",
                "cost": 3000,
                "scoin_bonus": 45,
                "description": "",
                "image": "/images/cannons/season3/DSC.webp",
                "3d": "https://cdn.scorched.report/71654933.glb"
            },
            {
                "hash": "Vow",
                "name": "Lubrae's Resolution",
                "alt_name": "Vow",
                "author": "GerbSnail",
                "cost": 3500,
                "scoin_bonus": 56,
                "description": "",
                "image": "/images/cannons/season3/Vow.webp"
            },
            {
                "hash": "Tesselation",
                "name": "Refraction",
                "alt_name": "Tesselation",
                "author": "GerbSnail",
                "cost": 4000,
                "scoin_bonus": 70,
                "description": "",
                "image": "/images/cannons/season3/Tesselation.webp"
            },
            {
                "hash": "Nine",
                "name": "Fire of the Future",
                "alt_name": "Nine",
                "author": "GerbSnail",
                "cost": 5000,
                "scoin_bonus": 90,
                "description": "",
                "image": "/images/cannons/season3/Nine.webp"
            },/*
            {
                "hash": "SimpleProp",
                "name": "■■■.Name = String::new(\"placeholder\");",
                "alt_name": "SimpleProp",
                "author": "GerbSnail",
                "cost": 999999,
                "scoin_bonus": 100,
                "description": "This is my secret cannon. Outside of Scorched and 3D art, I also have a love for going out of bounds and glitching Destiny as a whole. The Simple Prop at the center of the cannon is actually an asset that exists in Destiny, and it can be seen rarely in places such as out of box in the Dreadnaught and the Menagerie, and down below the final boss arena in the original Black Garden. This cannon represents all three of my Destiny-related passions in one neat little package.",
                "image": "/images/cannons/season3/SimpleProp.webp"
            },*/
            {
                "hash": "hidden",
                "name": "[Classified]",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 999999,
                "scoin_bonus": 100,
                "description": "",
                "image": "/images/cannons/hidden/hidden.webp"
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
                "cost": Math.min(),
                "scoin_bonus": 0,
                "description": "This is Ecdragonz's Secret Cannon. More details about it can be found in the TWAS, but the gist is that this cannon appears in our DnD campaign and is wielded by an eldritch abomination (played by Zombie). It's made of mostly small parts of the Rasputin heavy frame model and other Rasputin assets, and its 'taken' looking corruption at the front reflects its corrupted power source. Its name ingame is the Scourge Cannon, if you were wondering.",
                "image": "/images/cannons/special/CoriolisCannon.webp"
            },
            {
                "hash": "ScornchedCannon",
                "name": "Scornched Cannon",
                "alt_name": "Cob Cannon",
                "author": "GerbSnail",
                "cost": Math.min(),
                "scoin_bonus": 0,
                "description": "This is Zombie's Secret Cannon. It is one of the very first ever created, and its use is fairly outdated since we very rarely see anyone earning a multiple of seven anymore. Either way, I see it as a landmark and it plays into Zombie's love for corn so I think it's nice. Definitely on the list of ones to redo in the future though.",
                "image": "/images/cannons/special/ScornchedCannon.webp"
            },
            {
                "hash": "CoriolisCannon2",
                "name": "18470",
                "alt_name": "[PLACEHOLDER NAME], Scourge_Cannon",
                "author": "GerbSnail",
                "cost": Math.min(),
                "scoin_bonus": 0,
                "description": "",
                "image": "/images/cannons/special/CoriolisCannon2.webp"
            },
        ]
    }
}

export default SCORCHED_CANNONS;