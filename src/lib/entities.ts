/* eslint-disable max-lines */
export type Cannons = {
	"base_cannon_hash": string;
	"kills": number;
}


export type matchTableEntry = { // The full match representation used for displaying
	"id": number,
	"elo": number,
	"date": number,
	"kills": number,
	"deaths": number,
	"assists": number,
	"medals": {
		"iMadeThisForYou": boolean,
		"weRan": boolean,
		"crownTaker": boolean,
		"seventhColumn": boolean,
		"annihilation": boolean,
		"ghost": boolean,
		"undefeated": boolean,
		"mostDamage": boolean,
	},
	"team": boolean,
	"map": string,
	"won": boolean,
	"win_chance": number,
	"kd": number,
	"time": number,
	"kpm": number,
	"efficiency": number
}

export type pgcrCutDown = { // The smaller match representation for storing
	"id": number,
	"elo": number,
	"date": number,
	"kills": number,
	"deaths": number,
	"assists": number,
	"medals": {
		"iMadeThisForYou": boolean,
		"weRan": boolean,
		"crownTaker": boolean,
		"seventhColumn": boolean,
		"annihilation": boolean,
		"ghost": boolean,
		"undefeated": boolean,
		"mostDamage": boolean,
	},
	"team": boolean,
	"map": string,
	"won": boolean,
	"win_chance": number,
	"time": number,
}

export type historicStatsPerCharacter = {
	"activitiesEntered": number,
	"activitiesWon": number,
	"assists": number,
	"totalKillDistance": number,
	"kills": number,
	"secondsPlayed": number,
	"deaths": number,
	"averageLifespan": number,
	"score": number,
	"bestSingleGameKills": number,
	"bestSingleGameScore": number,
	"opponentsDefeated": number,
	"precisionKills": number,
	"objectivesCompleted": number,
	"resurrectionsPerformed": number,
	"resurrectionsReceived": number,
	"suicides": number,
	"winLossRatio": number,
	"allParticipantsCount": number,
	"allParticipantsScore": number,
	"allParticipantsTimePlayed": number,
	"longestKillSpree": number,
	"longestKillSpreeMatch": number,
	"longestSingleLife": number,
	"orbsDropped": number,
	"orbsGathered": number,
	"remainingTimeAfterQuitSeconds": number,
	"teamScore": number,
	"totalActivityDurationSeconds": number,
	"combatRating": number,
	"fastestCompletionMs": number,
	"longestKillDistance": number,
	"fireTeamActivities": number,
	"weaponKills": {
		"weaponKillsRelic": number,
		"weaponKillsAutoRifle": number,
		"weaponKillsBeamRifle": number,
		"weaponKillsBow": number,
		"weaponKillsGlaive": number,
		"weaponKillsFusionRifle": number,
		"weaponKillsHandCannon": number,
		"weaponKillsTraceRifle": number,
		"weaponKillsMachineGun": number,
		"weaponKillsPulseRifle": number,
		"weaponKillsRocketLauncher": number,
		"weaponKillsScoutRifle": number,
		"weaponKillsShotgun": number,
		"weaponKillsSniper": number,
		"weaponKillsSubmachinegun": number,
		"weaponKillsSideArm": number,
		"weaponKillsSword": number,
		"weaponKillsAbility": number,
		"weaponKillsGrenade": number,
		"weaponKillsGrenadeLauncher": number,
		"weaponKillsSuper": number,
		"weaponKillsMelee": number,
	},
	"medals": { // TODO: remove
		"total": number,
		"totalGold": number,
		"iMadeThisForYou": number,
		"weRan": number,
		"crownTaker": number,
		"seventhColumn": number,
		"annihilation": number,
		"undefeated": number,
		"ghost": number,
		"mostDamage": number,
	},
}

export type historicMedal = {
	"value": number,
	"statName": string,
	"statDescription": string,
	"iconImage": string,
	"medalTierIdentifier": string,
	"medalTierHash": number
}

export const medalsBungie: { [index: string]: { "description": string, "text": string, "src": string } } = {
	"iMadeThisForYou": {
		"text": "I Made This for You",
		"description": "In a single life, defeat 50 opposing Guardians.",
		"src": "/images/icons/medals/iMadeThisForYou.png"
	},
	"weRan": {
		"text": "We Ran Out of Medals",
		"description": "In a single life, defeat 20 opposing Guardians.",
		"src": "/images/icons/medals/weRan.png"
	},
	"crownTaker": {
		"text": "The Crown Is Mine",
		"description": "Defeat an opponent who is on a streak of 20 or more.\n(This medal is bugged because Bungie's API does not mention if you received one)",
		"src": "/images/icons/medals/crownTaker.png"
	},
	"seventhColumn": {
		"text": "Seventh Column",
		"description": "Rapidly defeat 7 opposing Guardians. ",
		"src": "/images/icons/medals/seventhColumn.png"
	},
	"annihilation": {
		"text": "Annihilation",
		"description": "Land final blows on the entire enemy team before any of them respawn.",
		"src": "/images/icons/medals/annihilation.png"
	},
	"ghost": {
		"text": "Ghost in the Night",
		"description": "Land final blows on seven opponents without taking any damage from any source.",
		"src": "/images/icons/medals/ghost.png"
	},
	"undefeated": {
		"text": "Undefeated",
		"description": "Complete a match in which you are never defeated by an opponent.",
		"src": "/images/icons/medals/undefeated.png"
	},
	"mostDamage": {
		"text": "Fight Me!",
		"description": "Deal the most total damage to opponents in a single match.",
		"src": "/images/icons/medals/mostDamage.png"
	},
}

export const awards: { [index: string]: { "description": string, "text": string, "src": string, "glow": string } } = {
	"contributor": {
		"description": "Awarded for great contributions to Scorched Report",
		"text": "Scorched Report contributor",
		"src": "/images/icons/awards/Crossed_Cannons_smaller.webp",
		"glow": "shadow-award-glow"
	},
	"seMember": {
		"description": "Awarded for being a Scorched Enthusiasts",
		"text": "Putting the fun in Team Scorched",
		"src": "/images/icons/awards/Crossed_Cannons_gold.webp",
		"glow": ""
	},
	"seFriend": {
		"description": "Awarded to friends of SE",
		"text": "Friend of SE",
		"src": "/images/icons/awards/Crossed_Cannons_gold.webp",
		"glow": ""
	},
	"seEnemy": {
		"description": "Awarded to special enemies of SE (This a satirical award not to be taken seriously)",
		"text": "Enemy of SE",
		"src": "/images/icons/awards/Crossed_Cannons_gold.webp",
		"glow": "shadow-award-glowRed"
	},
	"streak50": {
		"description": "Awarded for getting an \"I made this for you\" medal by reaching a 50 streak",
		"text": "I also made this for you",
		"src": "/images/icons/awards/Crossed_Cannons_gold.webp",
		"glow": "shadow-award-glow"
	},
	"streak2x20": {
		"description": "Awarded for getting two \"We ran out of medals\" within a single match",
		"text": "Streaks on streaks",
		"src": "/images/icons/awards/test1_1.png",
		"glow": "shadow-award-glow"
	},
	"streak20": {
		"description": "Awarded for getting a \"We ran out of medals\" medal by reaching a 20 streak",
		"text": "You ran and succeeded",
		"src": "/images/icons/awards/test1_1.png",
		"glow": ""
	},
	"kills50": {
		"description": "Awarded for reaching 50 kills in a single match",
		"text": "The reason the queue is currently empty",
		"src": "/images/icons/awards/50.webp",
		"glow": "shadow-award-glow"
	},
	"kills40": {
		"description": "Awarded for reaching 40 kills in a single match",
		"text": "A force to be reckoned with",
		"src": "/images/icons/awards/40.webp",
		"glow": ""
	},
	"kills30": {
		"description": "Awarded for reaching 30 kills in a single match",
		"text": "Getting the hang of it",
		"src": "/images/icons/awards/30.webp",
		"glow": ""
	},
	"total100k": {
		"description": "Awarded for reaching 100000 kills in Team Scorched",
		"text": "Scorched Earth",
		"src": "/images/icons/awards/100k.webp",
		"glow": "shadow-award-glow"
	},
	"total75k": {
		"description": "Awarded for reaching 75000 kills in Team Scorched",
		"text": "Shaxx is Concerned",
		"src": "/images/icons/awards/75k.webp",
		"glow": ""
	},
	"total50k": {
		"description": "Awarded for reaching 50000 kills in Team Scorched",
		"text": "Scorcher of Mass Destruction",
		"src": "/images/icons/awards/50k.webp",
		"glow": ""
	},
	"total25k": {
		"description": "Awarded for reaching 25000 kills in Team Scorched",
		"text": "Shaxx's new favorite Scorcher",
		"src": "/images/icons/awards/25k.webp",
		"glow": ""
	},
	"total10k": {
		"description": "Awarded for reaching 10000 kills in Team Scorched",
		"text": "On a flaming path",
		"src": "/images/icons/awards/10k.webp",
		"glow": ""
	},
	"total5k": {
		"description": "Awarded for reaching 5000 kills in Team Scorched",
		"text": "Just Getting Started",
		"src": "/images/icons/awards/5k.webp",
		"glow": ""
	},
	"total1k": {
		"description": "Awarded for reaching 1000 kills in Team Scorched",
		"text": "First rocket-boosted steps",
		"src": "/images/icons/awards/1k.webp",
		"glow": ""
	},
	"medalSeventh": {
		"description": "Awarded for getting at least one seventh column",
		"text": "",
		"src": "/images/icons/awards/test1_1.png",
		"glow": ""
	},
	"armyOfOne": {
		"description": "Awarded for getting more kills than all teammates and enemies combined",
		"text": "",
		"src": "/images/icons/awards/test1_1.png",
		"glow": "shadow-award-glow"
	},
	"carryPartner": {
		"description": "",
		"text": "",
		"src": "/images/icons/awards/test1_1.png",
		"glow": ""
	},
	"specialKills": {
		"description": "Awarded for getting a kill with something that isn't a Scorch Cannon",
		"text": "Wait, that's illegal!",
		"src": "/images/icons/awards/Telesto.webp",
		"glow": ""
	},
}

export type Scorcher = {
	"id": string, // Let's only convert this to BigInt when necessary
	"platform": number,
	"profile": {
		"profileName": string,
		"platform_all": number[],
		"crosssaveEnabled": boolean,
		"bungieNameCode": string,
		"clanName": string,
		"bannerUrl": string,
		"secondarySpecial": string,
		"secondaryOverlay": string,
		"lightLevel": number,
		"guardianrank": number, // lol
		"privacy": number
	},
	"characters": { [key: string]: any }, // Idk let's just paste whatever Bungie returns in here
	"awards": {
		"contributor": boolean,
		"seMember": boolean,
		"seFriend": boolean,
		"seEnemy": boolean,
		"streak50": boolean,
		"streak2x20": boolean,
		"streak20": boolean,
		"kills50": boolean,
		"kills40": boolean,
		"kills30": boolean,
		"total100k": boolean,
		"total75k": boolean,
		"total50k": boolean,
		"total25k": boolean,
		"total10k": boolean,
		"total5k": boolean,
		"total1k": boolean,
		"medalSeventh": boolean,
		"armyOfOne": boolean,
		"carryPartner": boolean,
		"specialKills": boolean
	},
	"performance": { // These are redundant when Bungie's api is up, otherwise is calculated from backups
		"trueSkill": number,
		"matches": number,
		"wins": number,
		"losses": number,
		"kills": number,
		"deaths": number,
		"assists": number,
		"timeSpent": number,
		"fastestWin": number,
	},
	"soloPerformance": {
		"trueSkill": number,
		"matches": number,
		"wins": number,
		"losses": number,
		"kills": number,
		"deaths": number,
		"assists": number,
		"timeSpent": number,
	},
	"specials": {
		"abilities": number,
		"melee": number,
		"grenade": number,
		"super": number,
	},
	"minigame": {
		"completedTutorial": boolean,
		"scoins": { [key: string]: number },
		"selectedSeason": string,
		"equippedCannons": { [key: string]: Cannons },
		"ownedCannons": { [key: string]: Cannons[] },
		"currentLevel": number,
		"ownedSeasons": Cannons[],
		"completedSeasons": []
	},
	"crucible": {
		"matches": number,
		"kills": number
	},
	"bungieHistoricAccountStats": historicStatsPerCharacter, // Holds the data we can only get from Bungie's api
	"bungieHistoricStats": { [key: string]: historicStatsPerCharacter },
	"bungieHistoricMedals": { [key: string]: historicMedal }, // matched with the HistoricalStatsDefinition endpoint
	"matchHistory": {
		[key: string]: pgcrCutDown
	}
}

export type DestinyActivityDefinitionType = {
	[key: string]: {
		"description": string,
		"name": string,
		"pgcrImage": string
	}
}

