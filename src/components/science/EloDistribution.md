---
---

This page outlines the process and challenges behind creating an Elo system for Scorched Report.

[Jump to the chart](#science-graph-1)

## TL;DR

- Scorched Report uses [OpenSkill](https://jmlr.org/papers/v12/weng11a.html)
- Hidden teammates are added to account for the negligent advantage of larger teams

## Motivation

While you could entirely legitimately argue it's only a silly number for a silly game mode, I believe it's both fascinating and important to look more closely at how to implement such a rating system. Some games and fan sites fan sites assign largely opaque ratings without providing more details on what they are based on. Perhaps the reasoning is to obscure the influencing factors to prevent abuse or perhaps they ran into other challenges that Scorched Report doesn't want to or need to mitigate. Since Scorched Report exists purely for the fun of it, we try to communicate how our rating system works as best as possible.

### How other sites do it

As a notable example in the Destiny sphere, Destiny Tracker implements an Elo system which [primarily rewards wins, but also takes individual performance into account](https://destinytracker.com/destiny-2/articles/48ae2-destiny-tracker-elo). Unfortunately that's all I can tell about it.
Beyond All Reason has a great [article](https://www.beyondallreason.info/guide/rating-and-lobby-balance) outlining how OpenSkill performs in their game. They decided to not take in-game scores into account because, as they argue, [it might not accurately reflect a player's contribution](https://www.beyondallreason.info/guide/rating-and-lobby-balance#why-cant-we-rate-based-on-in-game-scores). Scorched Report also does not take in-game scores into account.

### Team Scorched specific things

Unlike many other games and game modes, Team Scorched gives very little if any advantage to larger teams. While we never fully investigated that claim, that is a feeling many people in SE shared and Scorched Report tries to account for. As there are no objectives and the one-shot nature of Team Scorched makes "team-shooting" almost non-existent, it stands to reason that a single high-skill players would usually win over any number of low-skilled players. This seems to track at least with our observations were full 6v6 matches tend to be closer than 3v3 or 4v4 matches with a single outlier player.

To account for this, Scorched Report brings both teams to the same size by adding fake teammates of that team's average skill and uncertainty. This works because this OpenSkill implementation only considers the win chances and the actual match outcome. From our tests this helps in particular with small lobbies with extreme outliers. Without accounting for a team's average skill, in particular the highest skill players would jump up by an additional ~300-600 rating points.

### On resetting Elo

Many online multiplayer games feature rank resets, which was also considered for Scorched Report but ultimately scrapped as the irregular playlist rotation and the few recent matches make regular resets difficult. Maybe a few manual resets will be added for major changes in the Team Scorched formula (e.g. the switch from 50 to 60 points, or the removal of architect misadventures). Would also be nice if Bungie made Team Scorched more frequent and, more importantly, return in predictable intervals.

### On Elo vs. skill

A never-ending discussion point on this topic is where a rating accurately reflects someone's skill. This feels like a pointless exercise for Scorched Report and thus all we are concerned with here is predicting match outcomes. Scorched Report gives you a variety of other indicators to gauge how skilled a player is. In the end you make the decision on whether the rating (accurately) reflects skill and if Team Scorched allows for skilled players in the first place.

### On uncertainty

OpenSkill doesn't only track your skill, rather it only assigns you an uncertainty rating. This ensures that your skill rating quickly reaches its true values and prevent larger swings because of an unfortunate streak later on.

### Open Skill Configuration

Scorched Report currently uses the following configuration for OpenSkill (from the [skillratings crate](https://docs.rs/skillratings/latest/skillratings/) for Rust):

| Variable   |      Value      |
|----------|:-------------:|
| Beta |  100 |
| Uncertainty Tolerance |    0.000001 (default)   |
| Default Rating | 1000 |
| Default Uncertainty | 333.3 |

As these ratings would not be comparable to other sites in any case, I simply choose arbitrary values that *felt* right.

## Sources

- The [skillratings](https://docs.rs/skillratings/latest/skillratings/) Rust crate
- The filtered and aggregated data is available on [GitHub](https://github.com/uniQIndividual/scorched.report/tree/main/public/data/science)
