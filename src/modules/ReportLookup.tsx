// Good Luck!
// 
// 
// It's actually not as bad, though I should probably have simply used awaits
// Ah well, it does the job and it does so in a precise order...
//
import React, { type ReactNode } from "react";
import ErrorDynamic from "./ErrorDynamic";
import ErrorNotFound from "./ErrorNotFound";
import API from "../lib/api";
import * as fzstd from 'fzstd';
import update from 'immutability-helper';
import LoadingAnimation from "../components/LoadingAnimation";
import { LoadingAnimationWithTitle } from "../components/LoadingAnimation";
import { type historicStatsPerCharacter, type pgcrCutDown, type Scorcher } from "../lib/entities";
import { Profile } from "../components/profile/Profile";
import { Activity } from "../components/profile/Experience";
import { Performance } from "../components/profile/Performance";
import MatchHistory from "../components/profile/MatchHistory";
import { CannonCollection } from "../components/profile/CannonCollection";
import { CharacterInfo } from "../components/profile/CharacterInfo";
import { url_data } from "../lib/api";

import { DatabaseMiddleware } from "../lib/IndexedDB";
import { Maps } from "../components/profile/Maps";
import { Award } from "../components/profile/Award";
import { Medals } from "../components/profile/Medals";
import { D2Box } from "../components/profile/D2Box";
import HistoricalStatsDefinitionSmaller from "../data/fallback/HistoricalStatsDefinitionSmaller.json"


const ReportLookup = () => {

  const urlParams = new URLSearchParams(window.location.search);
  const initialStats: Scorcher = {
    "id": "0", // Let's only convert this to BigInt when necessary
    "platform": 0,
    "profile": {
      "profileName": "",
      "clanName": "",
      "bannerUrl": "",
      "secondarySpecial": "",
      "secondaryOverlay": "/images/crucible_logo_centered.webp",
      "lightLevel": 0,
      "guardianrank": 0,
      "privacy": 0
    },
    "characters": [],
    "awards": {
      "contributor": false,
      "seMember": false,
      "seFriend": false,
      "seEnemy": false,
      "streak50": false,
      "streak2x20": false,
      "streak20": false,
      "kills50": false,
      "kills40": false,
      "kills30": false,
      "total100k": false,
      "total75k": false,
      "total50k": false,
      "total25k": false,
      "total10k": false,
      "total5k": false,
      "total1k": false,
      "medalSeventh": false,
      "armyOfOne": false,
      "carryPartner": false,
      "specialKills": false,
    },
    "performance": {
      "trueSkill": 1000,
      "matches": 0,
      "wins": 0,
      "losses": 0,
      "kills": 0,
      "deaths": 0,
      "assists": 0,
      "timeSpent": 0,
      "fastestWin": 0,

    },
    "soloPerformance": {
      "trueSkill": 1000,
      "matches": 0,
      "wins": 0,
      "losses": 0,
      "kills": 0,
      "deaths": 0,
      "assists": 0,
      "timeSpent": 0,
    },
    "specials": {
      "abilities": 0,
      "melee": 0,
      "grenade": 0,
      "super": 0,
    },
    "crucible": {
      "kills": 0,
      "matches": 0
    },
    "minigame": {
      "completedTutorial": false,
      "scoins": 0,
      "selectedSeason": "",
      "equippedCannons": {},
      "ownedCannons": {},
      "coinBonus": 0,
      "currentLevel": 0,
      "ownedSeasons": [],
      "completedSeasons": []
    },
    "bungieHistoricAccountStats": {
      "activitiesEntered": 0,
      "activitiesWon": 0,
      "assists": 0,
      "totalKillDistance": 0,
      "kills": 0,
      "secondsPlayed": 0,
      "deaths": 0,
      "averageLifespan": 0,
      "score": 0,
      "bestSingleGameKills": 0,
      "bestSingleGameScore": 0,
      "opponentsDefeated": 0,
      "precisionKills": 0,
      "objectivesCompleted": 0,
      "resurrectionsPerformed": 0,
      "resurrectionsReceived": 0,
      "suicides": 0,
      "winLossRatio": 0,
      "allParticipantsCount": 0,
      "allParticipantsScore": 0,
      "allParticipantsTimePlayed": 0,
      "longestKillSpree": 0,
      "longestKillSpreeMatch": 0,
      "longestSingleLife": 0,
      "orbsDropped": 0,
      "orbsGathered": 0,
      "remainingTimeAfterQuitSeconds": 0,
      "teamScore": 0,
      "totalActivityDurationSeconds": 0,
      "combatRating": 0,
      "fastestCompletionMs": 0,
      "longestKillDistance": 0,
      "fireTeamActivities": 0,
      "weaponKills": {
        "weaponKillsRelic": 0,
        "weaponKillsAutoRifle": 0,
        "weaponKillsBeamRifle": 0,
        "weaponKillsBow": 0,
        "weaponKillsGlaive": 0,
        "weaponKillsFusionRifle": 0,
        "weaponKillsHandCannon": 0,
        "weaponKillsTraceRifle": 0,
        "weaponKillsMachineGun": 0,
        "weaponKillsPulseRifle": 0,
        "weaponKillsRocketLauncher": 0,
        "weaponKillsScoutRifle": 0,
        "weaponKillsShotgun": 0,
        "weaponKillsSniper": 0,
        "weaponKillsSubmachinegun": 0,
        "weaponKillsSideArm": 0,
        "weaponKillsSword": 0,
        "weaponKillsAbility": 0,
        "weaponKillsGrenade": 0,
        "weaponKillsGrenadeLauncher": 0,
        "weaponKillsSuper": 0,
        "weaponKillsMelee": 0,
      },
      "medals": {
        "total": 0,
        "totalGold": 0,
        "iMadeThisForYou": 0,
        "weRan": 0,
        "crownTaker": 0,
        "seventhColumn": 0,
        "annihilation": 0,
        "ghost": 0,
        "undefeated": 0,
        "mostDamage": 0,
      },
    },
    "bungieHistoricMedals": {},
    "bungieHistoricStats": {},
    "matchHistory": {}
  }
  const [stats, setStats] = React.useState(initialStats);
  const [activeSection, setActiveSection] = React.useState("summary");
  const [destinyActivityDefinition, setDestinyActivityDefinition] = React.useState({});
  const [crash, triggerCrash] = React.useState({ title: "", text: "" }); // Display a crash message, recoverable but some stats might be missing
  const [hardCrash, triggerHardCrash] = React.useState(false); // Will prevent visual output
  const [render, triggerRender] = React.useState(false);
  const [devMode, setDevMode] = React.useState(false);
  const [loadingTitle, setLoadingTitle] = React.useState("Loading PGCR...");

  const historicalStatsDefinition: { [index: string]: { "category": number, "statName": string, "statDescription": string, "iconImage"?: string, "medalTierIdentifier": string, "contentIconOverrideId": string, "medalTierHash": number } } = HistoricalStatsDefinitionSmaller;

  React.useEffect(() => {
    // Verify parameters
    try {
      if (urlParams.get('dev') != null && urlParams.get('dev') == "1") { // you are daring, hm
        setDevMode(true);
      }
      if (urlParams.get('id') == null || urlParams.get('id') == "") {
        throw new Error("Membership id is missing");
      }
      if (urlParams.get('platform') == null) {
        throw new Error("Platform id is missing");
      }
      const userid = urlParams.get('id') || "";

      const platform = Number(urlParams.get('platform'));

      if (platform <= 0 || platform >= 256) {
        throw new Error("Platform id is impossible");
      }

      // set active section if it was e.g. linked
      profile_sections.map(section => {
        if (location.hash == `#${section.id}`) {
          setActiveSection(section.id)
        }
      })

      let flag = false;

      const definitionsDB = new DatabaseMiddleware({
        databaseName: "DestinyActivityDefinition",
        storeName: "Entries",
        version: 1,
      });

      const historyDB = new DatabaseMiddleware({
        databaseName: "PGCRHistory",
        storeName: "Entries",
        version: 2,
      });

      (async () => { // A lot of async stuff from here on that we need to enforce
        // Initialize databases
        setLoadingTitle("Initializing database...");
        let newStats = stats;
        await definitionsDB.initializeDefinitionsDatabase();
        await historyDB.initializeHistoryDatabase();
        setDestinyActivityDefinition(await definitionsDB.getValue("DestinyActivityDefinition"));

        newStats = update(newStats, { // Update with info from the local database
          id: {
            $set: userid
          },
          platform: {
            $set: platform
          }
        });

        /*
 
          Load Scorched Cannon data
 
        */
        setLoadingTitle("Loading Scorched Cannons...");

        try {
          fetch('https://scorched.nblock.dev/api/users/' + userid,
            {
              headers: {
                "X-API-Key": "e89f62dfcc413cd8f527872137081a00"
              },
              signal: AbortSignal.timeout(3000)
            }).catch(e => {
              console.error("Error getting Scorched Cannon data");
              return null
            }).then(
              res => {
                if (res == null) {
                  triggerCrash({
                    title: 'Failed to load your Scorched Cannons',
                    text: ''
                  });
                  return { data: null }
                }
                if (res.status != 200 && res.status != 404) {
                  console.error(res);
                  triggerCrash({
                    title: 'Failed to load your Scorched Cannons',
                    text: 'Status code: ' + res.status
                  });
                  console.error(res.statusText)
                  return { data: null };
                }
                if (res.status == 404) {
                  // User doesn't exists
                  console.error('Scorcher is not signed up');
                  return { data: null };
                }
                if (res.status == 200) {
                  return res?.json()
                }


              }
            ).then((response) => {
              if (response?.data != undefined) { // Skip parsing the response if the user does not have one
                const data = response.data


                newStats = update(newStats, { minigame: { selectedSeason: { $set: data.selected_season || newStats.minigame.selectedSeason } } })
                newStats = update(newStats, { minigame: { ownedSeasons: { $set: data.owned_seasons || newStats.minigame.ownedSeasons } } })
                newStats = update(newStats, { minigame: { ownedCannons: { $set: data.owned_cannons || newStats.minigame.ownedCannons } } })
                newStats = update(newStats, { minigame: { equippedCannons: { $set: data.current_cannon || newStats.minigame.equippedCannons } } })
                newStats = update(newStats, { minigame: { scoins: { $set: data.scoins || newStats.minigame.scoins } } })

                setStats(newStats)
              }



            }).catch(err => {

              console.error(err)
            });

        } catch (error) {
          triggerCrash({
            title: 'Error when loading Scorched Cannon data',
            text: error!.toString()
          });
          return;
        }

        /*
  
          Load info from indexedDB
  
        */
        const indexedMatchHistory = await historyDB.getValue(userid);
        if (indexedMatchHistory != null) {
          setLoadingTitle("Loading Scorched Cannons...");
          console.log("Fetching matches from local indexedDB");
          // Update performance stats and history
          newStats = update(newStats, {
            matchHistory: {
              $set: indexedMatchHistory
            },
          })
          setStats(newStats);
        }

        /*
  
          Load info from local compressed files
  
        */
        setLoadingTitle("Loading Profile Stats...");
        // yes this is indeed nothing you should copy
        const vault_id = userid.substring(userid.length - 4);
        await fetch(`${url_data}/vault/${vault_id[0]}/${vault_id[1]}/${vault_id[2]}/${vault_id[3]}.json.zst`).then(
          res => {
            if (res.status != 200 && res.status != 404) {
              console.error(res);
              triggerCrash({
                title: 'Access to DB failed',
                text: 'Status code: ' + res.status
              });
              console.error(res.statusText)
              return new ArrayBuffer(0);
            } else {
              if (res.status == 404) {
                return new ArrayBuffer(0);
              }
              return res.arrayBuffer()
            }
          }
        ).then((compressedBuf) => {
          try {
            if (compressedBuf.byteLength != 0) { // No local DB, skip forward
              const compressed = new Uint8Array(compressedBuf)
              const out = new TextDecoder().decode(fzstd.decompress(compressed));

              let json = JSON.parse(out);


              if (json.hasOwnProperty(userid)) { // User is the local database
                json = json[userid];

                if (!json.flags.includes("untrusted")) {
                  flag = true;
                }

                let soloMatches = json.matchHistory.filter(match => !match.team);


                newStats = update(newStats, { // Update with info from the local database
                  awards: {
                    contributor:
                      { $set: flag && json.flags.includes("contributor") },
                    seMember:
                      { $set: flag && json.flags.includes("se_member") },
                    seFriend:
                      { $set: flag && json.flags.includes("se_friend") },
                    seEnemy:
                      { $set: false },
                  },
                  soloPerformance: { // This depends on flagged solo matches which we can only find in the pre-computed match history
                    $set: {
                      kills: Number(soloMatches.reduce((sum, current) => sum + current.kills, 0)),
                      deaths: Number(soloMatches.reduce((sum, current) => sum + current.deaths, 0)),
                      assists: Number(soloMatches.reduce((sum, current) => sum + current.assists, 0)),
                      wins: Number(soloMatches.reduce((sum, current) => sum + current.won, 0)),
                      losses: Number(soloMatches.reduce((sum, current) => sum + !current.won, 0)),
                      matches: soloMatches.reduce((sum, current) => sum + 1, 0),
                      timeSpent: Number(soloMatches.reduce((sum, current) => sum + current.playtime, 0)),
                      trueSkill: json.matchHistory[json.matchHistory.length - 1].elo,
                    }
                  },
                  performance: { trueSkill: { $set: json.matchHistory[json.matchHistory.length - 1].elo } },
                  //soloPerformance: { $set: json.soloPerformance },
                  //specials: { $set: json.specials },
                  matchHistory: {
                    $merge: json.matchHistory.map((match) => {
                      return {
                        "id": Number(match?.id),
                        "elo": match.elo,
                        "date": match.date * 1000,
                        "kills": match?.kills,
                        "deaths": match?.deaths,
                        "assists": match?.assists,
                        "medals": {
                          "iMadeThisForYou": match.medals.includes("iMadeThisForYou"),
                          "weRan": match.medals.includes("weRan"),
                          "crownTaker": match.medals.includes("crownTaker"),
                          "seventhColumn": match.medals.includes("seventhColumn"),
                          "annihilation": match.medals.includes("annihilation"),
                          "ghost": match.medals.includes("ghost"),
                          "undefeated": match.medals.includes("undefeated"),
                          "mostDamage": match.medals.includes("mostDamage"),
                        },
                        "team": match?.team,
                        "map": match?.map,
                        "won": match.won,
                        "win_chance": match.win_chance,
                        "kd": 0,
                        "kpm": 0,
                        "time": match?.playtime,
                        "efficiency": 0
                      }
                    }).reduce((a: any, v: any) => ({ ...a, [v.id]: v }), {}) //.sort((a, b) => a.id - b.id) // Sort array by timestamp
                  }
                })

                setStats(newStats)
              }
            }

          } catch (error) {
            triggerCrash({
              title: 'Error during DB decompression',
              text: error!.toString()
            });
            return;
          }
        }).catch(err => err ? console.error(err) : "");



        /*
  
          Load info from Bungie
  
        */
        setLoadingTitle("Loading Characters...");
        await API.requests.User.GetBungieProfieData(userid, platform.toString()).catch((err => {
          try {
            const bungieResponse = JSON.parse(err.response);
            triggerCrash({
              title: bungieResponse?.ErrorStatus,
              text: bungieResponse?.Message
            });
          } catch (error) {
            triggerCrash({
              title: err?.title,
              text: err?.description
            });
          }
          return { "Response": "" } // We want to still render the known information and leave gaps instead of displaying an error page
        }
        )).then(async (response) => {
          if (response.Response != "") { // Simply skip if the previous catch threw an empty response
            try {
              response = JSON.parse(response)
              response = response.Response;

              newStats = update(newStats, { characters: { $set: response.characters.data } });
              newStats = update(newStats, { profile: { privacy: { $set: response.characters.privacy } } });
              newStats = update(newStats, { profile: { profileName: { $set: response.profile.data.userInfo.bungieGlobalDisplayName != "" ? response.profile.data.userInfo.bungieGlobalDisplayName : response.profile.data.userInfo.displayName } } });
              newStats = update(newStats, { profile: { guardianrank: { $set: response.profile.data.currentGuardianRank } } });

              // set info based on the most recently used character
              // in theory we should be able to find it by looking at
              // response.profile.data.dateLastPlayed
              // but this should be more defensive
              let mostRecentCharacter = {};
              let recentlyPlayed = 0;

              for (const [key, character] of Object.entries(response.characters.data)) {
                if (new Date(character.dateLastPlayed).getTime() > recentlyPlayed) {
                  recentlyPlayed = new Date(character.dateLastPlayed).getTime();
                  mostRecentCharacter = character;
                }
              }

              newStats = update(newStats, {
                profile: {
                  bannerUrl: { $set: mostRecentCharacter.emblemBackgroundPath },
                  lightLevel: { $set: mostRecentCharacter.light },
                }
              });

              setStats(newStats);

              // Update the default banner with the most recent character's wide banner from the given hash

              try {
                if (mostRecentCharacter.emblemHash != undefined) {
                  await API.requests.Destiny2.BannerFromEmblemHash(mostRecentCharacter.emblemHash).then((response => {
                    response = JSON.parse(response)
                    response = response.Response;

                    newStats = update(newStats, {
                      profile: {
                        secondarySpecial: { $set: "https://www.bungie.net" + response.secondarySpecial },
                        secondaryOverlay: { $set: "https://www.bungie.net" + response.secondaryOverlay }
                      }
                    });

                  }),
                    (error => {
                      console.log("Unable to load character banner");
                      console.log(error);


                    }))
                }
              } catch (error) {
                // don't care tbh, we just use the default one
              }


            } catch (error) {
              console.error("Something, something, bungie character api");
              console.log(error);

            }

            /*
  
            more bungie api calls, these depend on the previous response
  
            */

            // Add deleted characters
            setLoadingTitle("Loading Bungie Stats...");
            response = await API.requests.User.GetHistoricAccountStats(userid, platform.toString()).catch(e => console.log())
            if (response != undefined && response != "") {
              response = JSON.parse(response)

              response = response.Response;
              response.characters.map(character => {
                if (!newStats.characters.hasOwnProperty(character.characterId)) {
                  newStats = update(newStats, {
                    characters: {
                      [character.characterId]: {
                        $set: {
                          "deleted": true,
                          "characterId": character.characterId,
                        }
                      }
                    }
                  });

                }
              })
              // Store combined overall crucible stats

              if (Object.keys(response.mergedAllCharacters.results.allPvP).length > 0) {
                newStats = update(newStats, {
                  crucible: {
                    $set: {
                      "kills": response.mergedAllCharacters.results.allPvP.allTime.kills.basic.value,
                      "matches": response.mergedAllCharacters.results.allPvP.allTime.activitiesEntered.basic.value,
                    }
                  }
                });
              } else {
                newStats = update(newStats, {
                  crucible: {
                    $set: {
                      "kills": 0,
                      "matches": 0,
                    }
                  }
                });
              }
            }


            // Get Team Scorched specific historic stats
            // While there is Destiny2.GetHistoricalStatsForAccount as far as I can tell it does not allow you to specify a mode
            // ~3 more requests for each character it is then 
            setLoadingTitle("Loading Character Stats...");
            Promise.all(Object.keys(newStats.characters).map((character) => API.requests.User.GetHistoricCharacterStats(userid, platform.toString(), newStats.characters[character].characterId))).catch((error) => {
              triggerCrash({
                title: "Couldn't load historic stats",
                text: error?.description?.toString()
              });
              console.error(error);
              return []
            }).then(async (response) => {
              try { // gonna keep trying and continue with 0 stats if anything fails

                const characters = Object.keys(newStats.characters);

                response.forEach((responseSingle, i) => {
                  responseSingle = JSON.parse(responseSingle);
                  if (Object.keys(responseSingle.Response.scorchedTeam).length != 0) {
                    responseSingle = responseSingle.Response.scorchedTeam.allTime;
                    const currentCharacter = characters[i]!.toString();

                    newStats = update(newStats, { // Add character stats
                      bungieHistoricStats: {
                        $merge: {
                          [currentCharacter]: {
                            "activitiesEntered": responseSingle.activitiesEntered.basic.value,
                            "activitiesWon": responseSingle?.activitiesWon.basic.value,
                            "assists": responseSingle?.assists.basic.value,
                            "totalKillDistance": responseSingle?.totalKillDistance.basic.value,
                            "kills": responseSingle?.kills.basic.value,
                            "secondsPlayed": responseSingle?.secondsPlayed.basic.value,
                            "deaths": responseSingle?.deaths.basic.value,
                            "averageLifespan": responseSingle?.averageLifespan.basic.value,
                            "score": responseSingle?.score.basic.value,
                            "bestSingleGameKills": responseSingle?.bestSingleGameKills.basic.value,
                            "bestSingleGameScore": responseSingle?.bestSingleGameScore.basic.value,
                            "opponentsDefeated": responseSingle?.opponentsDefeated.basic.value,
                            "precisionKills": responseSingle?.precisionKills.basic.value,
                            "objectivesCompleted": responseSingle?.objectivesCompleted.basic.value,
                            "resurrectionsPerformed": responseSingle?.resurrectionsPerformed.basic.value,
                            "resurrectionsReceived": responseSingle?.resurrectionsReceived.basic.value,
                            "suicides": responseSingle?.suicides.basic.value,
                            "winLossRatio": responseSingle?.winLossRatio.basic.value,
                            "allParticipantsCount": responseSingle?.allParticipantsCount.basic.value,
                            "allParticipantsScore": responseSingle?.allParticipantsScore.basic.value,
                            "allParticipantsTimePlayed": responseSingle?.allParticipantsTimePlayed.basic.value,
                            "longestKillSpree": responseSingle?.longestKillSpree.basic.value,
                            "longestKillSpreeMatch": responseSingle?.longestKillSpree.activityId,
                            "longestSingleLife": responseSingle?.longestSingleLife.basic.value,
                            "orbsDropped": responseSingle?.orbsDropped.basic.value,
                            "orbsGathered": responseSingle?.orbsGathered.basic.value,
                            "remainingTimeAfterQuitSeconds": responseSingle?.remainingTimeAfterQuitSeconds.basic.value,
                            "teamScore": responseSingle?.teamScore.basic.value,
                            "totalActivityDurationSeconds": responseSingle?.totalActivityDurationSeconds.basic.value,
                            "combatRating": responseSingle?.combatRating.basic.value,
                            "fastestCompletionMs": responseSingle?.fastestCompletionMs.basic.value,
                            "longestKillDistance": responseSingle?.longestKillDistance.basic.value,
                            "fireTeamActivities": responseSingle?.fireTeamActivities.basic.value,
                            "weaponKills": {
                              "weaponKillsRelic": responseSingle?.weaponKillsRelic.basic.value,
                              "weaponKillsAutoRifle": responseSingle?.weaponKillsAutoRifle.basic.value,
                              "weaponKillsBeamRifle": responseSingle?.weaponKillsBeamRifle.basic.value,
                              "weaponKillsBow": responseSingle?.weaponKillsBow.basic.value,
                              "weaponKillsGlaive": responseSingle?.weaponKillsGlaive.basic.value,
                              "weaponKillsFusionRifle": responseSingle?.weaponKillsFusionRifle.basic.value,
                              "weaponKillsHandCannon": responseSingle?.weaponKillsHandCannon.basic.value,
                              "weaponKillsTraceRifle": responseSingle?.weaponKillsTraceRifle.basic.value,
                              "weaponKillsMachineGun": responseSingle?.weaponKillsMachineGun.basic.value,
                              "weaponKillsPulseRifle": responseSingle?.weaponKillsPulseRifle.basic.value,
                              "weaponKillsRocketLauncher": responseSingle?.weaponKillsRocketLauncher.basic.value,
                              "weaponKillsScoutRifle": responseSingle?.weaponKillsScoutRifle.basic.value,
                              "weaponKillsShotgun": responseSingle?.weaponKillsShotgun.basic.value,
                              "weaponKillsSniper": responseSingle?.weaponKillsSniper.basic.value,
                              "weaponKillsSubmachinegun": responseSingle?.weaponKillsSubmachinegun.basic.value,
                              "weaponKillsSideArm": responseSingle?.weaponKillsSideArm.basic.value,
                              "weaponKillsSword": responseSingle?.weaponKillsSword.basic.value,
                              "weaponKillsAbility": responseSingle?.weaponKillsAbility.basic.value,
                              "weaponKillsGrenade": responseSingle?.weaponKillsGrenade.basic.value,
                              "weaponKillsGrenadeLauncher": responseSingle?.weaponKillsGrenadeLauncher.basic.value,
                              "weaponKillsSuper": responseSingle?.weaponKillsSuper.basic.value,
                              "weaponKillsMelee": responseSingle?.weaponKillsMelee.basic.value,
                            },
                            "medals": {
                              "total": responseSingle?.allMedalsEarned.basic.value,
                              "totalGold": responseSingle?.Medals_pvp_medal_streak_extra_absurd_b.basic.value + responseSingle?.medalStreakAbsurd.basic.value + responseSingle?.medalStreak7x.basic.value + responseSingle?.medalMultiEntireTeam.basic.value + responseSingle?.Medals_pvp_medal_streak_no_damage.basic.value + responseSingle?.medalMatchUndefeated.basic.value,
                              "iMadeThisForYou": responseSingle?.Medals_pvp_medal_streak_extra_absurd_b.basic.value,
                              "weRan": responseSingle?.medalStreakAbsurd.basic.value,
                              "crownTaker": 0,
                              "seventhColumn": responseSingle?.medalStreak7x.basic.value,
                              "annihilation": responseSingle?.medalMultiEntireTeam.basic.value,
                              "ghost": responseSingle?.Medals_pvp_medal_streak_no_damage.basic.value,
                              "undefeated": responseSingle?.medalMatchUndefeated.basic.value,
                              "mostDamage": responseSingle?.medalMatchMostDamage.basic.value,
                            },
                          }
                        }
                      }
                    });

                    newStats = update(newStats, { // Merge to total stats
                      bungieHistoricAccountStats: {
                        $apply: (old: historicStatsPerCharacter) => {

                          return {
                            "activitiesEntered": old.activitiesEntered + responseSingle.activitiesEntered.basic.value,
                            "activitiesWon": old.activitiesWon + responseSingle?.activitiesWon.basic.value,
                            "assists": old.assists + responseSingle?.assists.basic.value,
                            "totalKillDistance": old.totalKillDistance + responseSingle?.totalKillDistance.basic.value,
                            "kills": old.kills + responseSingle?.kills.basic.value,
                            "secondsPlayed": old.secondsPlayed + responseSingle?.secondsPlayed.basic.value,
                            "deaths": old.deaths + responseSingle?.deaths.basic.value,
                            "averageLifespan": 0,
                            "score": old.score + responseSingle?.score.basic.value,
                            "bestSingleGameKills": old.bestSingleGameKills >= responseSingle?.bestSingleGameKills.basic.value ? old.bestSingleGameKills : responseSingle?.bestSingleGameKills.basic.value,
                            "bestSingleGameScore": old.bestSingleGameScore >= responseSingle?.bestSingleGameScore.basic.value ? old.bestSingleGameScore : responseSingle?.bestSingleGameScore.basic.value,
                            "opponentsDefeated": old.opponentsDefeated + responseSingle?.opponentsDefeated.basic.value,
                            "precisionKills": old.precisionKills + responseSingle?.precisionKills.basic.value,
                            "objectivesCompleted": old.objectivesCompleted + responseSingle?.objectivesCompleted.basic.value,
                            "resurrectionsPerformed": old.resurrectionsPerformed + responseSingle?.resurrectionsPerformed.basic.value,
                            "resurrectionsReceived": old.resurrectionsReceived + responseSingle?.resurrectionsReceived.basic.value,
                            "suicides": old.suicides + responseSingle?.suicides.basic.value,
                            "winLossRatio": old.winLossRatio + responseSingle?.winLossRatio.basic.value,
                            "allParticipantsCount": old.allParticipantsCount + responseSingle?.allParticipantsCount.basic.value,
                            "allParticipantsScore": old.allParticipantsScore + responseSingle?.allParticipantsScore.basic.value,
                            "allParticipantsTimePlayed": old.allParticipantsTimePlayed + responseSingle?.allParticipantsTimePlayed.basic.value,
                            "longestKillSpree": old.longestKillSpree >= responseSingle?.longestKillSpree.basic.value ? old.longestKillSpree : responseSingle?.longestKillSpree.basic.value,
                            "longestKillSpreeMatch": old.longestKillSpree >= responseSingle?.longestKillSpree.activityId ? old.longestKillSpree : responseSingle?.longestKillSpree.activityId,
                            "longestSingleLife": old.longestSingleLife >= responseSingle?.longestSingleLife.basic.value ? old.longestSingleLife : responseSingle?.longestSingleLife.basic.value,
                            "orbsDropped": old.orbsDropped + responseSingle?.orbsDropped.basic.value,
                            "orbsGathered": old.orbsGathered + responseSingle?.orbsGathered.basic.value,
                            "remainingTimeAfterQuitSeconds": old.remainingTimeAfterQuitSeconds + responseSingle?.remainingTimeAfterQuitSeconds.basic.value,
                            "teamScore": old.teamScore + responseSingle?.teamScore.basic.value,
                            "totalActivityDurationSeconds": old.totalActivityDurationSeconds + responseSingle?.totalActivityDurationSeconds.basic.value,
                            "combatRating": 0,
                            "fastestCompletionMs": old.fastestCompletionMs <= responseSingle?.fastestCompletionMs.basic.value && old.fastestCompletionMs != 0 ? old.fastestCompletionMs : responseSingle?.fastestCompletionMs.basic.value,
                            "longestKillDistance": old.longestKillDistance >= responseSingle?.longestKillDistance.basic.value ? old.longestKillDistance : responseSingle?.longestKillDistance.basic.value,
                            "fireTeamActivities": old.fireTeamActivities + responseSingle?.fireTeamActivities.basic.value,
                            "weaponKills": {
                              "weaponKillsRelic": old.weaponKills.weaponKillsRelic + responseSingle?.weaponKillsRelic.basic.value,
                              "weaponKillsAutoRifle": old.weaponKills.weaponKillsAutoRifle + responseSingle?.weaponKillsAutoRifle.basic.value,
                              "weaponKillsBeamRifle": old.weaponKills.weaponKillsBeamRifle + responseSingle?.weaponKillsBeamRifle.basic.value,
                              "weaponKillsBow": old.weaponKills.weaponKillsBow + responseSingle?.weaponKillsBow.basic.value,
                              "weaponKillsGlaive": old.weaponKills.weaponKillsGlaive + responseSingle?.weaponKillsGlaive.basic.value,
                              "weaponKillsFusionRifle": old.weaponKills.weaponKillsFusionRifle + responseSingle?.weaponKillsFusionRifle.basic.value,
                              "weaponKillsHandCannon": old.weaponKills.weaponKillsHandCannon + responseSingle?.weaponKillsHandCannon.basic.value,
                              "weaponKillsTraceRifle": old.weaponKills.weaponKillsTraceRifle + responseSingle?.weaponKillsTraceRifle.basic.value,
                              "weaponKillsMachineGun": old.weaponKills.weaponKillsMachineGun + responseSingle?.weaponKillsMachineGun.basic.value,
                              "weaponKillsPulseRifle": old.weaponKills.weaponKillsPulseRifle + responseSingle?.weaponKillsPulseRifle.basic.value,
                              "weaponKillsRocketLauncher": old.weaponKills.weaponKillsRocketLauncher + responseSingle?.weaponKillsRocketLauncher.basic.value,
                              "weaponKillsScoutRifle": old.weaponKills.weaponKillsScoutRifle + responseSingle?.weaponKillsScoutRifle.basic.value,
                              "weaponKillsShotgun": old.weaponKills.weaponKillsShotgun + responseSingle?.weaponKillsShotgun.basic.value,
                              "weaponKillsSniper": old.weaponKills.weaponKillsSniper + responseSingle?.weaponKillsSniper.basic.value,
                              "weaponKillsSubmachinegun": old.weaponKills.weaponKillsSubmachinegun + responseSingle?.weaponKillsSubmachinegun.basic.value,
                              "weaponKillsSideArm": old.weaponKills.weaponKillsSideArm + responseSingle?.weaponKillsSideArm.basic.value,
                              "weaponKillsSword": old.weaponKills.weaponKillsSword + responseSingle?.weaponKillsSword.basic.value,
                              "weaponKillsAbility": old.weaponKills.weaponKillsAbility + responseSingle?.weaponKillsAbility.basic.value,
                              "weaponKillsGrenade": old.weaponKills.weaponKillsGrenade + responseSingle?.weaponKillsGrenade.basic.value,
                              "weaponKillsGrenadeLauncher": old.weaponKills.weaponKillsGrenadeLauncher + responseSingle?.weaponKillsGrenadeLauncher.basic.value,
                              "weaponKillsSuper": old.weaponKills.weaponKillsSuper + responseSingle?.weaponKillsSuper.basic.value,
                              "weaponKillsMelee": old.weaponKills.weaponKillsMelee + responseSingle?.weaponKillsMelee.basic.value,
                            },
                            "medals": {
                              "total": old.medals.total + responseSingle?.allMedalsEarned.basic.value,
                              "totalGold": old.medals.totalGold + responseSingle?.Medals_pvp_medal_streak_extra_absurd_b.basic.value + responseSingle?.medalStreakAbsurd.basic.value + responseSingle?.medalStreak7x.basic.value + responseSingle?.medalMultiEntireTeam.basic.value + responseSingle?.Medals_pvp_medal_streak_no_damage.basic.value + responseSingle?.medalMatchUndefeated.basic.value,
                              "iMadeThisForYou": old.medals.iMadeThisForYou + responseSingle?.Medals_pvp_medal_streak_extra_absurd_b.basic.value,
                              "weRan": old.medals.weRan + responseSingle?.medalStreakAbsurd.basic.value,
                              "crownTaker": 0,
                              "seventhColumn": old.medals.seventhColumn + responseSingle?.medalStreak7x.basic.value,
                              "annihilation": old.medals.annihilation + responseSingle?.medalMultiEntireTeam.basic.value,
                              "ghost": old.medals.ghost + responseSingle?.Medals_pvp_medal_streak_no_damage.basic.value,
                              "undefeated": old.medals.undefeated + responseSingle?.medalMatchUndefeated.basic.value,
                              "mostDamage": old.medals.mostDamage + responseSingle?.medalMatchMostDamage.basic.value,
                            },
                          }
                        }
                      }
                    });

                    // Get all medals
                    Object.keys(responseSingle).map(key => {
                      if (historicalStatsDefinition.hasOwnProperty(key) && responseSingle[key].basic.value > 0) {
                        newStats = update(newStats, { // Add medal
                          bungieHistoricMedals: {
                            $merge: {
                              [key]: {
                                value: (newStats.bungieHistoricMedals[key]?.value || 0) + responseSingle[key].basic.value,
                                iconImage: historicalStatsDefinition[key]?.iconImage || "/img/misc/missing_icon_d2.png",
                                medalTierHash: historicalStatsDefinition[key]?.medalTierHash,
                                medalTierIdentifier: historicalStatsDefinition[key]?.medalTierIdentifier,
                                statDescription: historicalStatsDefinition[key]?.statDescription,
                                statName: historicalStatsDefinition[key]?.statName
                              }
                            }
                          }
                        });
                      }
                    })
                  }
                })



                // We now need to calculate the averages for the combined stats
                // for each character we multiply the value with their weighting based on the matches entered
                newStats = update(newStats, {
                  bungieHistoricAccountStats: {
                    averageLifespan: {
                      $set: Object.keys(newStats.bungieHistoricStats).map((x) => {
                        return (newStats.bungieHistoricStats[x]?.averageLifespan || 0) * (newStats.bungieHistoricStats[x]?.activitiesEntered || 0) / newStats.bungieHistoricAccountStats.activitiesEntered
                      }).reduce((x, y) => x + y, 1)
                    }
                  }
                });
                newStats = update(newStats, {
                  bungieHistoricAccountStats: {
                    combatRating: {
                      $set: Object.keys(newStats.bungieHistoricStats).map((x) => {
                        return (newStats.bungieHistoricStats[x]?.combatRating || 0) * (newStats.bungieHistoricStats[x]?.activitiesEntered || 0) / newStats.bungieHistoricAccountStats.activitiesEntered
                      }).reduce((x, y) => x + y, 0)
                    }
                  }
                });

                /*
                
                Setting awards based on Bungie's response
                
                */

                if (flag) {
                  let truelyStrangeKills = 0;
                  Object.keys(newStats.bungieHistoricAccountStats.weaponKills).map((category) => {
                    if (category != "weaponKillsRelic") truelyStrangeKills += (newStats.bungieHistoricAccountStats.weaponKills[category] || 0);
                  })

                  newStats = update(newStats, {
                    awards: {
                      total100k: {
                        $apply(v) {
                          return v || newStats.bungieHistoricAccountStats.kills >= 100000
                        },
                      },
                      total75k: {
                        $apply(v) {
                          return v || (newStats.bungieHistoricAccountStats.kills >= 75000 && newStats.bungieHistoricAccountStats.kills < 100000)
                        },
                      },
                      total50k: {
                        $apply(v) {
                          return v || (newStats.bungieHistoricAccountStats.kills >= 50000 && newStats.bungieHistoricAccountStats.kills < 75000)
                        },
                      },
                      total25k: {
                        $apply(v) {
                          return v || (newStats.bungieHistoricAccountStats.kills >= 25000 && newStats.bungieHistoricAccountStats.kills < 50000)
                        },
                      },
                      total10k: {
                        $apply(v) {
                          return v || (newStats.bungieHistoricAccountStats.kills >= 10000 && newStats.bungieHistoricAccountStats.kills < 25000)
                        },
                      },
                      total5k: {
                        $apply(v) {
                          return v || (newStats.bungieHistoricAccountStats.kills >= 5000 && newStats.bungieHistoricAccountStats.kills < 10000)
                        },
                      },
                      total1k: {
                        $apply(v) {
                          return v || (newStats.bungieHistoricAccountStats.kills >= 1000 && newStats.bungieHistoricAccountStats.kills < 5000)
                        },
                      },
                      streak50: {
                        $apply(v) {
                          return v || (newStats.bungieHistoricAccountStats.longestKillSpree >= 50)
                        },
                      },
                      streak20: {
                        $apply(v) {
                          return false // TODO:
                          return v || (newStats.bungieHistoricAccountStats.longestKillSpree >= 20 && newStats.bungieHistoricAccountStats.longestKillSpree < 50)
                        },
                      },
                      kills50: {
                        $apply(v) {
                          return v || (newStats.bungieHistoricAccountStats.bestSingleGameKills >= 50)
                        },
                      },
                      kills40: {
                        $apply(v) {
                          return v || (newStats.bungieHistoricAccountStats.bestSingleGameKills >= 40 && newStats.bungieHistoricAccountStats.bestSingleGameKills < 50)
                        },
                      },
                      kills30: {
                        $apply(v) {
                          return v || (newStats.bungieHistoricAccountStats.bestSingleGameKills >= 30 && newStats.bungieHistoricAccountStats.bestSingleGameKills < 40)
                        },
                      },
                      specialKills: {
                        $apply(v) {
                          return v || (truelyStrangeKills > 0)
                        },
                      }
                    }
                  });
                }




                /*
                
                Updating overall performance with the combined character information
                (performance stats always exist, bungieHistoricAccountStats depends on Bungie's api)

                */
                const disregardBungieResponse = Object.keys(newStats.characters).length == 0; // No suitable data from Bungie thus we rely on our local data or initial state

                newStats = update(newStats, {
                  performance: {
                    matches: {
                      $apply(v) {
                        return disregardBungieResponse ? v : newStats.bungieHistoricAccountStats.activitiesEntered
                      },
                    },
                    wins: {
                      $apply(v) {
                        return disregardBungieResponse ? v : newStats.bungieHistoricAccountStats.activitiesWon
                      },
                    },
                    losses: {
                      $apply(v) {
                        return disregardBungieResponse ? v : newStats.bungieHistoricAccountStats.activitiesEntered
                      },
                    },
                    kills: {
                      $apply(v) {
                        return disregardBungieResponse ? v : newStats.bungieHistoricAccountStats.kills
                      },
                    },
                    deaths: {
                      $apply(v) {
                        return disregardBungieResponse ? v : newStats.bungieHistoricAccountStats.deaths
                      },
                    },
                    assists: {
                      $apply(v) {
                        return disregardBungieResponse ? v : newStats.bungieHistoricAccountStats.assists
                      },
                    },
                    timeSpent: {
                      $apply(v) {
                        return disregardBungieResponse ? v : newStats.bungieHistoricAccountStats.secondsPlayed
                      },
                    },
                    fastestWin: {
                      $apply(v) {
                        return disregardBungieResponse ? v : newStats.bungieHistoricAccountStats.fastestCompletionMs / 1000
                      },
                    },
                  }
                });


                /*
                
                Getting Character Match history
                
                */

                try {
                  const matchesPerPage = 250; // The current maximum
                  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)); // Delay between calls
                  let failedAttempts = 0; // Count errors to crash if it gets to high

                  let characters = Object.keys(newStats.bungieHistoricStats)
                  let throttleAmount = 100;
                  // We need to map how many matches were stored per character
                  let matchesInIndexedDB = await historyDB.getMeta(userid + "_matches") || characters.reduce((a, character) => ({ ...a, [character]: 0 }), {});
                  let timestampLastCall = Date.now();
                  let setToPrivate = false;
                  let addedEntries = 0;

                  for (let i = 0; i < characters.length; i++) {
                    // We want to avoid parallelism here to avoid getting throttled

                    // await
                    const characterName = characters[i] || "";
                    const character: historicStatsPerCharacter = newStats.bungieHistoricStats[characterName];
                    const previousLatestMatchCount = (matchesInIndexedDB.hasOwnProperty(characterName) ? matchesInIndexedDB[characterName] : 0)

                    if (character.activitiesEntered > previousLatestMatchCount && !setToPrivate) {
                      // We know there are new matches missing, we need to calculate the page they are on (250 per page)
                      // Page 0 has the newest ones
                      const startPage = 0;
                      const endPage = Math.floor((character.activitiesEntered - previousLatestMatchCount) / matchesPerPage);
                      console.log("Missing matches: " + (character.activitiesEntered - previousLatestMatchCount));
                      console.log("Starting on page: " + startPage);
                      console.log("Ending on page: " + endPage);

                      for (let page = startPage; page <= endPage; page++) {

                        if (!setToPrivate) {

                          let response;
                          try {
                            setLoadingTitle("Loading Match History " + page + "/" + endPage + "...");
                            response = await API.requests.PGCR.GetCharacterPGCRHistory(userid, platform.toString(), characterName, page, matchesPerPage)

                          } catch (error) {
                            // We fail upwards, but ig it's too late to change that now
                            // We essentially try to recover from known Bungie errors if possible
                            response = JSON.parse(error.response);
                            switch (response.ErrorCode) {
                              // Which one is the correct one for throttling? How the hell do I know lol
                              // https://bungie-net.github.io/multi/schema_Exceptions-PlatformErrorCodes.html#schema_Exceptions-PlatformErrorCodes
                              case 31:
                              case 35:
                              case 36:
                              case 37:
                              case 51:
                              case 54:
                              case 55:
                              case 56:
                              case 57:
                                failedAttempts++;
                                page--; // Run the same page again
                                break;
                              case 1665: // Private match history
                                setToPrivate = true;
                                console.log("Private match history found");
                                triggerCrash({ text: "Some data will be missing or inaccurate", title: "Private match history" })
                                response = undefined;
                                break;
                              default:
                                triggerCrash({ title: "Could not load Match History", text: "What happened? idk" })
                                throw new Error("Could not load Match History");
                            }
                          }

                          if (response != undefined && response != "") {
                            response = JSON.parse(response);
                            response = response.Response;
                            addedEntries = 0;

                            if (Object.keys(response).length != 0) {
                              // We have at least one match

                              response = response.activities;
                              response.map((match: any) => { // For each match found

                                // if (!newStats.matchHistory.hasOwnProperty(match.activityDetails.instanceId)) { // would skip ones in the website db
                                addedEntries++; // Count new entries to keep track of entries per character
                                //}

                                newStats = update(newStats, {
                                  matchHistory: {
                                    $apply(oldHistory: { [key: string]: pgcrCutDown }) {
                                      //const previousEntryExists = oldHistory.hasOwnProperty(match.activityDetails.instanceId);
                                      oldHistory[match.activityDetails.instanceId] = {
                                        "id": Number(match.activityDetails.instanceId),
                                        "elo": oldHistory[match.activityDetails.instanceId]?.elo || 0,
                                        "date": new Date(match.period).getTime(),
                                        "kills": match.values.kills.basic.value,
                                        "deaths": match.values.deaths.basic.value,
                                        "assists": match.values.assists.basic.value,
                                        "medals": {
                                          "iMadeThisForYou": match.activityDetails.instanceId == "13923339040" ? true : (oldHistory[match.activityDetails.instanceId]?.medals.iMadeThisForYou || false), //Naze
                                          "weRan": oldHistory[match.activityDetails.instanceId]?.medals.weRan || false,
                                          "crownTaker": oldHistory[match.activityDetails.instanceId]?.medals.crownTaker || false,
                                          "seventhColumn": oldHistory[match.activityDetails.instanceId]?.medals.seventhColumn || false,
                                          "annihilation": oldHistory[match.activityDetails.instanceId]?.medals.annihilation || false,
                                          "ghost": oldHistory[match.activityDetails.instanceId]?.medals.ghost || false,
                                          "undefeated": oldHistory[match.activityDetails.instanceId]?.medals.undefeated || false,
                                          "mostDamage": oldHistory[match.activityDetails.instanceId]?.medals.mostDamage || false,
                                        },
                                        "team": oldHistory[match.activityDetails.instanceId]?.team || true, // TODO: should allow undefined
                                        "map": match.activityDetails.referenceId,
                                        "won": match.values.standing.basic.value === 0,
                                        "win_chance": oldHistory[match.activityDetails.instanceId]?.win_chance || -1,
                                        "time": match.values.timePlayedSeconds.basic.value,
                                      }
                                      return oldHistory
                                    },
                                  }
                                })
                              })

                              throttleAmount = Math.max(timestampLastCall - Date.now() - 100, 0) + (response?.ThrottleSeconds * 1.2); // wait a min of 100ms between calls
                              timestampLastCall = Date.now();

                              matchesInIndexedDB[characterName] += addedEntries;
                              if (matchesInIndexedDB[characterName] > character.activitiesEntered) {
                                matchesInIndexedDB[characterName] = character.activitiesEntered;
                              }

                              historyDB.setHistoryValue(userid, newStats.matchHistory);
                              historyDB.setMeta(userid + "_matches", matchesInIndexedDB)
                              setStats(newStats);

                            } else {
                              // No more matches
                              console.log("No more matches found");

                            }
                          }

                          await delay(throttleAmount) // Time between pages
                        }
                      }

                      setStats(newStats);
                      await delay(100) // Let's wait some time between Characters
                    }
                  }


                } catch (error) {
                  console.log(error);
                }

                setStats(newStats);

              }
              catch (error) {
                triggerCrash({
                  title: "Error when parsing character stats",
                  text: error?.description?.toString()
                });
                console.error(error);
              }
            })

          } else {
            // We assume Bungie is down and roll with fallback information
          }
        })


        /*
  
          Adding missing information based on which information we got earlier
          We prefer character historic stats information, otherwise we'll 
          infer stats from the matchhistory which can be from scorched report or
          the indexedDB
  
        */
        let missingCharacterInformation = Object.keys(newStats.characters).length == 0;

        if (missingCharacterInformation) {

          let totalKills = Object.values(newStats.matchHistory).reduce((sum, current) => sum + current.kills, 0);
          let highestsStreak = Object.values(newStats.matchHistory).reduce((sum, current) => sum + current.kills, 0);


          newStats = update(newStats, {
            awards: {
              $set: {
                "contributor": newStats.awards.contributor,
                "seMember": newStats.awards.seMember,
                "seFriend": newStats.awards.seFriend,
                "seEnemy": newStats.awards.seEnemy,
                "streak50": Object.values(newStats.matchHistory).reduce((sum, current) => sum || current.medals.iMadeThisForYou, false),
                "streak2x20": newStats.awards.streak2x20,
                "streak20": false, //TODO: Object.values(newStats.matchHistory).reduce((sum, current) => sum || current.medals.weRan, false),
                "kills50": newStats.awards.kills50,
                "kills40": newStats.awards.kills40,
                "kills30": newStats.awards.kills30,
                "total100k": totalKills >= 100000,
                "total75k": totalKills >= 75000 && totalKills < 100000,
                "total50k": totalKills >= 50000 && totalKills < 75000,
                "total25k": totalKills >= 25000 && totalKills < 50000,
                "total10k": totalKills >= 10000 && totalKills < 25000,
                "total5k": totalKills >= 5000 && totalKills < 10000,
                "total1k": totalKills >= 1000 && totalKills < 5000,
                "medalSeventh": false, //TODO: Object.values(newStats.matchHistory).reduce((sum, current) => sum || current.medals.seventhColumn, false),
                "armyOfOne": newStats.awards.armyOfOne,
                "carryPartner": newStats.awards.carryPartner,
                "specialKills": newStats.awards.specialKills
              }
            },
            bungieHistoricAccountStats: {
              medals: {
                $set: {
                  "total": newStats.bungieHistoricAccountStats.medals.total,
                  "totalGold": Object.values(newStats.matchHistory).reduce((sum, current) => sum + (current.medals.iMadeThisForYou ? 1 : 0) + (current.medals.weRan ? 1 : 0) + (current.medals.crownTaker ? 1 : 0) + (current.medals.seventhColumn ? 1 : 0) + (current.medals.annihilation ? 1 : 0) + (current.medals.ghost ? 1 : 0) + (current.medals.undefeated ? 1 : 0) + (current.medals.mostDamage ? 1 : 0), 0),
                  "iMadeThisForYou": Object.values(newStats.matchHistory).reduce((sum, current) => sum + (current.medals.iMadeThisForYou ? 1 : 0), 0),
                  "weRan": Object.values(newStats.matchHistory).reduce((sum, current) => sum + (current.medals.weRan ? 1 : 0), 0),
                  "crownTaker": Object.values(newStats.matchHistory).reduce((sum, current) => sum + (current.medals.crownTaker ? 1 : 0), 0),
                  "seventhColumn": Object.values(newStats.matchHistory).reduce((sum, current) => sum + (current.medals.seventhColumn ? 1 : 0), 0),
                  "annihilation": Object.values(newStats.matchHistory).reduce((sum, current) => sum + (current.medals.annihilation ? 1 : 0), 0),
                  "ghost": Object.values(newStats.matchHistory).reduce((sum, current) => sum + (current.medals.ghost ? 1 : 0), 0),
                  "undefeated": Object.values(newStats.matchHistory).reduce((sum, current) => sum + (current.medals.undefeated ? 1 : 0), 0),
                  "mostDamage": Object.values(newStats.matchHistory).reduce((sum, current) => sum + (current.medals.mostDamage ? 1 : 0), 0),
                }
              },
              activitiesEntered: {
                $set: Object.keys(newStats.matchHistory).length
              },
              fireTeamActivities: {
                $set: Number(Object.values(newStats.matchHistory).reduce((sum, current) => sum + (current.team ? 1 : 0), 0))
              }
            },
            performance: {
              $set: {
                kills: Number(Object.values(newStats.matchHistory).reduce((sum, current) => sum + current.kills, 0)),
                deaths: Number(Object.values(newStats.matchHistory).reduce((sum, current) => sum + current.deaths, 0)),
                assists: Number(Object.values(newStats.matchHistory).reduce((sum, current) => sum + current.assists, 0)),
                wins: Number(Object.values(newStats.matchHistory).reduce((sum, current) => sum + (current.won ? 1 : 0), 0)),
                losses: Number(Object.values(newStats.matchHistory).reduce((sum, current) => sum + (!current.won ? 1 : 0), 0)),
                matches: Object.values(newStats.matchHistory).length,
                timeSpent: Number(Object.values(newStats.matchHistory).reduce((sum, current) => sum + current.time, 0)),
                trueSkill: newStats.performance.trueSkill,
                fastestWin: Number(Object.values(newStats.matchHistory).reduce((fastest, current) => {
                  if (fastest < current.time && fastest != 0) {
                    return fastest
                  } else {
                    return current.time
                  }
                }, 0)),
              }
            },
          });
        }

        if (userid === "4611686018485301927") { // fix an injustice
          newStats = update(newStats, {
            bungieHistoricMedals: {

              $apply(v) {
                v.iMadeThisForYou = {
                  "value": v.iMadeThisForYou == undefined ? 1 : v.iMadeThisForYou.value + 1,
                  "iconImage": "/common/destiny2_content/icons/5cb550443f952bbc1be64fc6fc2792e5.png",
                  "medalTierHash": 380324143,
                  "medalTierIdentifier": "PVP_TIER_3",
                  "statDescription": "Shaxx made this for you. Awarded upon earning \"[Insert Medal Here].\"",
                  "statName": "I Made This for You"
                }
                return v
              },
            },
            bungieHistoricAccountStats: {
              medals: {
                iMadeThisForYou: {
                  $apply(v) {
                    return v + 1
                  },
                }
              }
            }
          })
        }

        // Finished
        setStats(newStats)
        triggerRender(true);

      })()
    } catch (error) {
      console.log("Incorrect URL Parameters");
      triggerCrash({
        title: 'Incorrect URL Parameters',
        text: error!.toString()
      });
      triggerHardCrash(true);
      return;
    }
  }, []);

  // http://localhost:2121/report?id=4611686018467284386&platform=22


  /*
  API.requests.User.GetStoredProfieData(id)
    .then(async data => {



    })
    .catch(e => console.error(e));*/

  let profile_sections = [
    {
      "title": "Summary",
      "id": "summary",
      "body": <Profile {...stats} />
    },
    {
      "title": "XP",
      "id": "experience",
      "body": <Activity {...stats} />
    },
    {
      "title": "Performance",
      "id": "performance",
      "body": <Performance {...stats} />
    },
    {
      "title": "Characters",
      "id": "characters",
      "body": <div className="mt-16 w-full flex justify-center">
        <div className="">
          <div className="flex flex-wrap justify-center lg:mx-7">
            {Object.keys(stats.characters).length == 0 ?
              <div className="text-3xl text-gray-100 text-center mt-16">No character stats could be loaded</div> :
              Object.keys(stats.characters).map((character) => {
                return !stats.characters.hasOwnProperty(character) || !stats.bungieHistoricStats.hasOwnProperty(character) ? <div key={"character_stats_" + character}></div> : <div key={"character_stats_" + character}><CharacterInfo props={{ ...stats }} characterId={character} /></div>
              })}
          </div>
        </div>
      </div>
    },
    {
      "title": "Scorched Cannons",
      "id": "cannons",
      "body": <CannonCollection {...stats} />
    },
    {
      "title": "Medals",
      "id": "medals",
      "body": <Medals {...stats} />
    },
    {
      "title": "Maps",
      "id": "map",
      "body": <Maps stats={stats} DestinyActivityDefinition={destinyActivityDefinition} />
    },
    {
      "title": "Match History",
      "id": "matches",
      "body": <MatchHistory stats={stats} DestinyActivityDefinition={destinyActivityDefinition} />
    }
  ]

  if (devMode) {
    profile_sections.push({
      "title": "Everything",
      "id": "everything",
      "body": <span className="whitespace-pre-line block p-8"><pre>{JSON.stringify(stats, null, 4)}</pre></span>
    })
  }


  if (hardCrash) return (<div className="mt-12"><ErrorNotFound /><ErrorDynamic title={crash.title} text={crash.text} /></div>)

  if (render) return (
    <div className={/*bg-gray-50 dark:bg-gray-920*/"pb-2"}>
      <div
        className={`h-[146px]`}
      >
        {stats.profile.secondarySpecial != "" ? <img className="absolute object-cover object-center w-full h-[136px]" src={stats.profile.secondarySpecial} /> : <div className="absolute w-full h-[136px] bg-primary-900"></div>}
        <div className="absolute h-[136px] w-full table px-2">
          <div className="table-row-group">
            <div className="table-row h-[20px]">
            </div>
            <div className="table-row h-[96px]">
              <div className="table-cell">
                <div className="pl-4 font-bungo flex overflow-x-auto">
                  <img className="h-[96px]" src={stats.profile.secondaryOverlay} />
                  <div className="ml-2">
                    {stats.profile.profileName == "" ?
                      <div className="text-white italic text-3xl pt-1">
                        empty name
                      </div> :
                      <div className={"text-white font-bold pt-1 flex grow-0 truncate " + (stats.profile.profileName.length < 10 ? "text-2xl xl:text-4xl" : "text-xl xl:text-4xl")}>
                        {stats.profile.profileName}
                      </div>}
                    <div className="flex">
                      {Object.keys(stats.awards).filter((award) => stats.awards[award]).map((award) =>
                        <Award award={award} size={40} key={crypto.randomUUID()} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Subsection Selection Header */}
            <div className="table-row">
            </div>
          </div>
        </div>
        <div className="absolute w-full mt-[92px] text-sm xl:text-lg 2xl:text-xl right-0 text-white flex overflow-x-auto">
          <div className="table w-full float-right px-8">
            <div className="table-row h-[44px]">
              <div className="table-cell w-full">
              </div>
              {Object.values(profile_sections).map(section => {
                if (section == undefined) {
                  return <></>
                }
                return <div className="h-7 table-cell text-nowrap align-middle lg:hover:bg-[rgba(255,255,255,0.1)]" key={"profile_section_title_" + section.id}>
                  <button className={"w-full py-2 px-2 xl:px-4 hover:opacity-100 transition-all duration-200 " + (activeSection == section.id ? "opacity-80" : "opacity-60")} onClick={() => {
                    location.hash = section.id; // don't push since we don't handle those
                    setActiveSection(section.id);
                  }}>
                    {section.title}
                  </button>
                </div>
              })}
            </div>
            <div className="table-row h-[4px]">
              <div className="table-cell w-full">
              </div>
              {Object.values(profile_sections).map(section => {
                return <div className={"table-cell " + (activeSection == section.id ? "bg-gray-800 dark:bg-white" : "")} key={"profile_section_bar_" + section.id}>
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
      {/* profile sections */}
      <div className="overflow-x-auto">
        {Object.values(profile_sections).filter(section => section.id == activeSection).map(section => <div key={"profile_section_body_" + section.id}>{section.body}</div>)}
      </div>
      {crash.title != "" ? <ErrorDynamic title={crash.title} text={crash.text} /> : ""}
    </div>)

  return (<div className="flex h-72 justify-center">
    <LoadingAnimationWithTitle title={loadingTitle} />
  </div>)
}
export default ReportLookup
