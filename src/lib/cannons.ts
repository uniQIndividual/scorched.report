/* eslint-disable max-lines */
// all scorched cannons for their seasons
export type SCORCHED_DICTIONARY_TYPE = {
    [key: string]: SCORCHED_SEASON_TYPE
}

export type SCORCHED_SEASON_TYPE = {
    "name": string,
    "legacy_hash": string,
    "release_date": number,
    "twas": string,
    "pass_price": number,
    "cannons": { [key: number]: SCORCHED_CANNON_TYPE }
}

export type SCORCHED_CANNON_TYPE = {
    "hash": string,
    "name": string,
    "alt_name": string,
    "author": string,
    "cost": number,
    "requirements"?: string[],
    "scoin_bonus": number,
    "description": string,
    "image": string,
    "3d"?: string,
    "tier"?: number
}

const SCORCHED_CANNONS: SCORCHED_DICTIONARY_TYPE = {
    "1047977621": {
        "name": "Season 1",
        "legacy_hash": "S1",
        "release_date": 0,
        "twas": "",
        "pass_price": 0,
        "cannons": {
            "1590899343": {
                "hash": "PistolCannon",
                "name": "Pistol",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 100,
                "scoin_bonus": 1,
                "description": "",
                "image": "/images/cannons/season1/PistolCannon.webp"
            },
            "3398177269": {
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
            "3860411451": {
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
            "851616958": {
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
            "2448259848": {
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
            "2097267240": {
                "hash": "VoidCannon",
                "name": "Null Cannon",
                "alt_name": "Void Cannon",
                "author": "GerbSnail",
                "cost": 1500,
                "scoin_bonus": 4,
                "description": "",
                "image": "/images/cannons/season1/VoidCannon.webp",
                "3d": "https://cdn.scorched.report/2097267240.glb"
            },
            "1893944919": {
                "hash": "StasisCannon",
                "name": "Shatter Cannon",
                "alt_name": "Stasis Cannon",
                "author": "GerbSnail",
                "cost": 2000,
                "scoin_bonus": 5,
                "description": "",
                "image": "/images/cannons/season1/StasisCannon.webp"
            },
            "2508666414": {
                "hash": "Scorchality",
                "name": "Scorchality",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 2500,
                "scoin_bonus": 6,
                "description": "",
                "image": "/images/cannons/season1/Scorchality.webp",
                "3d": "https://cdn.scorched.report/2508666414.glb"
            },
            "3768930984": {
                "hash": "MIRVCannon",
                "name": "MIRV Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 3000,
                "scoin_bonus": 7,
                "description": "",
                "image": "/images/cannons/season1/MIRVCannon.webp"
            },
            "3042792869": {
                "hash": "WaveCannon",
                "name": "Wave Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 3500,
                "scoin_bonus": 8,
                "description": "",
                "image": "/images/cannons/season1/WaveCannon.webp"
            },
            "800573551": {
                "hash": "ScorchBreaker",
                "name": "Scorch Breaker",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 4000,
                "scoin_bonus": 9,
                "description": "",
                "image": "/images/cannons/season1/ScorchBreaker.webp"
            },
            "879863726": {
                "hash": "ScorchBringer",
                "name": "Scorch Bringer",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 4000,
                "scoin_bonus": 10,
                "description": "",
                "image": "/images/cannons/season1/ScorchBringer.webp"
            },
            "2562135391": {
                "hash": "ScorchedSimulant",
                "name": "Scorched Simulant",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 6000,
                "scoin_bonus": 12,
                "description": "",
                "image": "/images/cannons/season1/ScorchedSimulant.webp",
                "3d": "https://cdn.scorched.report/2562135391.glb"
            },
            "2027341681": {
                "hash": "SaladinsCriticism",
                "name": "Saladin's Criticism",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 7000,
                "scoin_bonus": 15,
                "description": "",
                "image": "/images/cannons/season1/SaladinsCriticism.webp",
                "3d": "https://cdn.scorched.report/2027341681.glb"
            },
            "2126509505": {
                "hash": "TrialsCannon",
                "name": "Trials Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 8000,
                "scoin_bonus": 19,
                "description": "",
                "image": "/images/cannons/season1/TrialsCannon.webp",
                "3d": "https://cdn.scorched.report/2126509505.glb"
            },
            "2733954114": {
                "hash": "SaintsReverence",
                "name": "Saint's Reverence",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 9000,
                "scoin_bonus": 23,
                "description": "",
                "image": "/images/cannons/season1/SaintsReverence.webp",
            },
            "2807280609": {
                "hash": "ScorchingLion",
                "name": "Scorching Lion",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 10000,
                "scoin_bonus": 29,
                "description": "",
                "image": "/images/cannons/season1/ScorchingLion.webp",
                "3d": "https://cdn.scorched.report/2807280609.glb"
            },
            "2792948606": {
                "hash": "ScorchedLens",
                "name": "Scorched Lens",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 12500,
                "scoin_bonus": 36,
                "description": "",
                "image": "/images/cannons/season1/ScorchedLens.webp"
            },
            "3192621245": {
                "hash": "MaliceCannon",
                "name": "Malice Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 15000,
                "scoin_bonus": 45,
                "description": "",
                "image": "/images/cannons/season1/MaliceCannon.webp"
            },
            "153031792": {
                "hash": "Gjallon",
                "name": "Gjallon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 17500,
                "scoin_bonus": 56,
                "description": "",
                "image": "/images/cannons/season1/Gjallon.webp",
                "3d": "https://cdn.scorched.report/153031792.glb"
            },
            "1753608035": {
                "hash": "PolarisHalberd",
                "name": "Polaris Halberd",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 20000,
                "scoin_bonus": 70,
                "description": "",
                "image": "/images/cannons/season1/PolarisHalberd.webp"
            },
            "2310189889": {
                "hash": "FusorCannon",
                "name": "Fusor Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 25000,
                "scoin_bonus": 90,
                "description": "",
                "image": "/images/cannons/season1/FusorCannon.webp",
                "3d": "https://cdn.scorched.report/2310189889.glb"
            },
            "4082509468": {
                "hash": "TelestoCannon",
                "name": "Coming Soon...",
                "alt_name": "Telesto Cannon",
                "author": "GerbSnail",
                "cost": 999999,
                "scoin_bonus": 100,
                "description": "",
                "image": "/images/cannons/season1/TelestoCannon.webp",
                "3d": "https://cdn.scorched.report/4082509468.glb"
            },
        }
    },
    "1047977622": {
        "name": "Season 2",
        "legacy_hash": "S2",
        "release_date": 1682913600,
        "twas": "1682913600",
        "pass_price": 0,
        "cannons": {
            "1387175964": {
                "hash": "ThreadboundCannon",
                "name": "Threadbound Cannon",
                "alt_name": "Strand",
                "author": "GerbSnail",
                "cost": 1500,
                "scoin_bonus": 4,
                "description": "",
                "image": "/images/cannons/season2/ThreadboundCannon.webp"
            },
            "4032709312": {
                "hash": "WhisperingCannon",
                "name": "The Whispering Cannon",
                "alt_name": "Taken",
                "author": "GerbSnail",
                "cost": 2000,
                "scoin_bonus": 5,
                "description": "",
                "image": "/images/cannons/season2/WhisperingCannon.webp"
            },
            "329391937": {
                "hash": "HeirloomCannon",
                "name": "Heirloom Cannon",
                "alt_name": "Heir",
                "author": "GerbSnail",
                "cost": 2500,
                "scoin_bonus": 6,
                "description": "",
                "image": "/images/cannons/season2/HeirloomCannon.webp"
            },
            "367352927": {
                "hash": "NaniteCannon",
                "name": "Nanite Cannon",
                "alt_name": "Outbreak",
                "author": "GerbSnail",
                "cost": 3000,
                "scoin_bonus": 7,
                "description": "",
                "image": "/images/cannons/season2/NaniteCannon.webp",
                "3d": "https://cdn.scorched.report/367352927.glb"
            },
            "1474996373": {
                "hash": "CoolerNaniteCannon",
                "name": "The Cooler Nanite Cannon",
                "alt_name": "Quicksilver",
                "author": "GerbSnail",
                "cost": 3500,
                "scoin_bonus": 8,
                "description": "",
                "image": "/images/cannons/season2/CoolerNaniteCannon.webp"
            },
            "3701718573": {
                "hash": "TapedTravesty",
                "name": "The Taped Travesty",
                "alt_name": "By definition a trident",
                "author": "GerbSnail",
                "cost": 4000,
                "scoin_bonus": 9,
                "description": "",
                "image": "/images/cannons/season2/TapedTravesty.webp",
                "3d": "https://cdn.scorched.report/3701718573.glb"
            },
            "112436207": {
                "hash": "VexHeadCannon",
                "name": "Scorched Cannon?",
                "alt_name": "Vex Head Cannon; ah yup that things a scorch cannon",
                "author": "GerbSnail",
                "cost": 5000,
                "scoin_bonus": 10,
                "description": "",
                "image": "/images/cannons/season2/VexHeadCannon.webp"
            },
            "1357385330": {
                "hash": "CerbCannon",
                "name": "Headcanon",
                "alt_name": "Cerb Cannon",
                "author": "GerbSnail",
                "cost": 6000,
                "scoin_bonus": 12,
                "description": "",
                "image": "/images/cannons/season2/CerbCannon.webp",
                "3d": "https://cdn.scorched.report/1357385330.glb"
            },
            "1889361825": {
                "hash": "DivCannon",
                "name": "Divinity Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 7000,
                "scoin_bonus": 15,
                "description": "",
                "image": "/images/cannons/season2/DivCannon.webp",
                "3d": "https://cdn.scorched.report/1889361825.glb"
            },
            "567386786": {
                "hash": "RuthlessCannon",
                "name": "Ruthless Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 8000,
                "scoin_bonus": 19,
                "description": "",
                "image": "/images/cannons/season2/RuthlessCannon.webp",
                "3d": "https://cdn.scorched.report/567386786.glb"
            },
            "785293223": {
                "hash": "VulcanCannon",
                "name": "Vulcan Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 9000,
                "scoin_bonus": 23,
                "description": "",
                "image": "/images/cannons/season2/VulcanCannon.webp"
            },
            "2292555887": {
                "hash": "WitherScorched",
                "name": "Witherscorched",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 10000,
                "scoin_bonus": 29,
                "description": "",
                "image": "/images/cannons/season2/WitherScorched.webp",
                "3d": "https://cdn.scorched.report/2292555887.glb"
            },
            "1070552926": {
                "hash": "ClosingAct",
                "name": "The Closing Act",
                "alt_name": "ngl I forgot what this one was called",
                "author": "GerbSnail",
                "cost": 12500,
                "scoin_bonus": 36,
                "description": "",
                "image": "/images/cannons/season2/ClosingAct.webp",
                "3d": "https://cdn.scorched.report/1070552926.glb"
            },
            "3492284667": {
                "hash": "NecroCannon",
                "name": "Necro Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 15000,
                "scoin_bonus": 45,
                "description": "",
                "image": "/images/cannons/season2/NecroCannon.webp",
                "3d": "https://cdn.scorched.report/3492284667.glb"
            },
            "3911958065": {
                "hash": "CryoCannon",
                "name": "Cryo Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 17500,
                "scoin_bonus": 56,
                "description": "",
                "image": "/images/cannons/season2/CryoCannon.webp"
            },
            "1166501168": {
                "hash": "IcyHotCannon",
                "name": "IcyHot Cannon",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 20000,
                "scoin_bonus": 56,
                "description": "",
                "image": "/images/cannons/season2/IcyHotCannon.webp",
                "3d": "https://cdn.scorched.report/1166501168.glb"
            },
            "33218595": {
                "hash": "Scorchcalibur",
                "name": "Scorchcalibur",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 25000,
                "scoin_bonus": 90,
                "description": "",
                "image": "/images/cannons/season2/Scorchcalibur.webp"
            },
        }
    },
    "1047977623": {
        "name": "Season 3",
        "legacy_hash": "S3",
        "release_date": 1707850800,
        "twas": "1707850800",
        "pass_price": 2500,
        "cannons": {
            "2862327243": {
                "hash": "WickedImplement",
                "name": "Tool of Evil",
                "alt_name": "Wicked Implement, this thing is still really ugly",
                "author": "GerbSnail",
                "cost": 0,
                "requirements": ["Unlock Season 3"],
                "scoin_bonus": 4,
                "description": "",
                "image": "/images/cannons/season3/WickedImplement.webp",
                "3d": "https://cdn.scorched.report/2862327243.glb"
            },
            "1840757261": {
                "hash": "Duality",
                "name": "Calus' Nightmare",
                "alt_name": "Duality",
                "author": "GerbSnail",
                "cost": 400,
                "scoin_bonus": 5,
                "description": "",
                "image": "/images/cannons/season3/Duality.webp"
            },
            "3663052891": {
                "hash": "Dawn",
                "name": "Paradoxical Flame",
                "alt_name": "Dawn",
                "author": "GerbSnail",
                "cost": 550,
                "scoin_bonus": 6,
                "description": "",
                "image": "/images/cannons/season3/Dawn.webp"
            },
            "2926159305": {
                "hash": "CurseofOsiris",
                "name": "Scorched Calamity 12",
                "alt_name": "Curse of Osiris",
                "author": "GerbSnail",
                "cost": 750,
                "scoin_bonus": 8,
                "description": "",
                "image": "/images/cannons/season3/Curse_of_Osiris.webp"
            },
            "1195125528": {
                "hash": "Navigator",
                "name": "The GPS",
                "alt_name": "Navigator",
                "author": "GerbSnail",
                "cost": 1000,
                "scoin_bonus": 10,
                "description": "",
                "image": "/images/cannons/season3/Navigator.webp",
                "3d": "https://cdn.scorched.report/1195125528.glb"
            },
            "1758975919": {
                "hash": "Lorentz",
                "name": "EM Cannon",
                "alt_name": "Lorentz",
                "author": "uniQ",
                "cost": 1200,
                "scoin_bonus": 12,
                "description": "My first attempt at creating a kitbash. Even this seemingly straight forward variant required a lot more bending than I expected. I can now certainly see why Gerb always preaches that donor models need to have enough geometry.",
                "image": "/images/cannons/season3/Lorentz.webp",
                "3d": "https://cdn.scorched.report/1758975919.glb"
            },
            "1956288669": {
                "hash": "Cannon?",
                "name": "Cannon?",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 1400,
                "scoin_bonus": 15,
                "description": "",
                "image": "/images/cannons/season3/cannon.webp",
                "3d": "https://cdn.scorched.report/1956288669.glb"
            },
            "2270463909": {
                "hash": "Leviathan",
                "name": "Burning Opulence",
                "alt_name": "Leviathan",
                "author": "GerbSnail",
                "cost": 1600,
                "scoin_bonus": 19,
                "description": "",
                "image": "/images/cannons/season3/Leviathan.webp"
            },
            "423691032": {
                "hash": "LastWish",
                "name": "Wishful Cannon",
                "alt_name": "LastWish",
                "author": "GerbSnail",
                "cost": 1900,
                "scoin_bonus": 23,
                "description": "",
                "image": "/images/cannons/season3/LastWish.webp"
            },
            "3369821932": {
                "hash": "BlackArmory",
                "name": "Ada's Retirement Plan",
                "alt_name": "Black Armory",
                "author": "GerbSnail",
                "cost": 2200,
                "scoin_bonus": 29,
                "description": "",
                "image": "/images/cannons/season3/BlackArmory.webp"
            },
            "4103190": {
                "hash": "GOS",
                "name": "Sanctified Cannon",
                "alt_name": "GOS",
                "author": "GerbSnail",
                "cost": 2500,
                "scoin_bonus": 36,
                "description": "",
                "image": "/images/cannons/season3/GOS.webp"
            },
            "71654933": {
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
            "538471099": {
                "hash": "Vow",
                "name": "Lubrae's Resolution",
                "alt_name": "Vow",
                "author": "GerbSnail",
                "cost": 3500,
                "scoin_bonus": 56,
                "description": "",
                "image": "/images/cannons/season3/Vow.webp"
            },
            "753693032": {
                "hash": "Tesselation",
                "name": "Refraction",
                "alt_name": "Tesselation",
                "author": "GerbSnail",
                "cost": 4000,
                "scoin_bonus": 70,
                "description": "",
                "image": "/images/cannons/season3/Tesselation.webp"
            },
            "2980311541": {
                "hash": "Nine",
                "name": "Fire of the Future",
                "alt_name": "Nine",
                "author": "GerbSnail",
                "cost": 5000,
                "scoin_bonus": 90,
                "description": "",
                "image": "/images/cannons/season3/Nine.webp"
            },
            "3998474120": {
                "hash": "hidden",
                "name": "[Classified]",
                "alt_name": "",
                "author": "GerbSnail",
                "cost": 999999,
                "scoin_bonus": 100,
                "description": "",
                "image": "/images/cannons/hidden/hidden.webp"
            },
        }
    },
    "3064974266": {
        "name": "Special Cannons",
        "legacy_hash": "special",
        "release_date": 0,
        "twas": "",
        "pass_price": 0,
        "cannons": {
            "2405325755": {
                "hash": "CoriolisCannon",
                "name": "10201",
                "alt_name": "Coriolis Cannon",
                "author": "GerbSnail",
                "cost": Math.min(),
                "requirements": ["Find the pod marked 10201"],
                "scoin_bonus": 0,
                "description": "This is Ecdragonz's Secret Cannon. More details about it can be found in the TWAS, but the gist is that this cannon appears in our DnD campaign and is wielded by an eldritch abomination (played by Zombie). It's made of mostly small parts of the Rasputin heavy frame model and other Rasputin assets, and its 'taken' looking corruption at the front reflects its corrupted power source. Its name ingame is the Scourge Cannon, if you were wondering.",
                "image": "/images/cannons/special/CoriolisCannon.webp",
                "3d": "https://cdn.scorched.report/2405325755.glb"
            },
            "1465060862": {
                "hash": "ScornchedCannon",
                "name": "Scornched Cannon",
                "alt_name": "Cob Cannon",
                "author": "GerbSnail",
                "cost": Math.min(),
                "requirements": ["Be TheZombieReborn"],
                "scoin_bonus": 0,
                "description": "This is Zombie's Secret Cannon. It is one of the very first ever created, and its use is fairly outdated since we very rarely see anyone earning a multiple of seven anymore. Either way, I see it as a landmark and it plays into Zombie's love for corn so I think it's nice. Definitely on the list of ones to redo in the future though.",
                "image": "/images/cannons/special/ScornchedCannon.webp",
                "3d": "https://cdn.scorched.report/1465060862.glb"
            },
            "1975453416": {
                "hash": "CoriolisCannon2",
                "name": "18470",
                "alt_name": "[PLACEHOLDER NAME], Scourge_Cannon",
                "author": "GerbSnail",
                "cost": Math.min(),
                "requirements": ["Discover a secret in the DND campaign"],
                "scoin_bonus": 0,
                "description": "",
                "image": "/images/cannons/special/CoriolisCannon2.webp",
                "3d": "https://cdn.scorched.report/1975453416.glb"
            },
        }
    }
}

export default SCORCHED_CANNONS;