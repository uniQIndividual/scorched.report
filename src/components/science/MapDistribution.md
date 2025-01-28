---
---

This project aims to provide some empirical data into map weighting in Team Scorched. All data is available on [GitHub](https://github.com/uniQIndividual/scorched.report/tree/main/public/data/science).

[Jump to the chart](#science-graph-1)

## TL;DR

- Since Season of the Seraph maps seem to fall into three main tiers:
  - Newly released maps (chance boosted by ~50%)
  - Regular chance
  - Diminished chance (chance decreased by ~75%)
- [Bungie should weight Widow's Court a lot more favorably](/science/map_ranking)
- New maps are boosted in their first season to increase their visibility e.g. cidadel
- As of Episode 2: Revenant there's no evidence to suggest map weighing with regards to the 6v6 nature of Team Scorched

## Background

Destiny 2 does not give all Crucible maps the same draw chances. Although newly released maps have long been weighted higher, starting with Season of the Seraph [Bungie announced a more direct curation of the map pool](https://destiny.bungie.org/bwu/430). This has lead to some frustrating in the wider Crucible community ([1](https://www.reddit.com/r/DestinyTheGame/comments/x3f4bj/can_bungie_get_rid_of_map_weighting_in_pvp/), [2](https://www.reddit.com/r/DestinyTheGame/comments/vo6rer/3_out_of_23_crucible_maps_are_heavily_weighted_in/), [3](https://www.bungie.net/en/Forums/Post/263607264)).

## Findings

With the release of the Season of the Seraph, a number of Crucible maps appeared a lot less often than in the previous season and compared to other maps. These maps were:

- Cathedral of Dusk
- Cauldron
- Convergence
- The Anomaly
- The Dead Cliffs

Some maps such as Twilight Gap no longer appear in Team Scorched.

Bungie has announced several [map weighting updates](https://www.bungie.net/7/en/News/article/twid-07-25-2024) over the years which are not reflected in the map distribution. This could be the result of an ambiguous use of the term "6v6 playlists".

If there is a weighting towards maps that work in 6v6 game modes I can not see it, unless that was the original intention behind downtiering The Anomaly, The Dead Cliffs and Cauldron. (Though I personally prefer to believe they are in their spot because they feel terrible to play and fundamentally do not work in Team Scorched).

Tracking the weighting of newly released maps is more tricky since they are not necessarily released with a new season. Additionally Bungie might choose to dial the weighting back down within the same season. Nevertheless, newly released maps are generally weighted higher and [Bungie has publicly stated to do so](https://destiny.bungie.org/bwu/430). One particular strong example from the dataset is The Citadel.

## Sources

- The [Destiny 2 Post Game Carnage Report Dataset](https://d2.asun.co/pgcr.html) by Andrew Sun, released under the Open Database License (ODbL)
- The filtered and aggregated data is available on [GitHub](https://github.com/uniQIndividual/scorched.report/tree/main/public/data/science)

## Limitations

- Whether Team Scorched is a 6v6 game mode and updates referencing that term apply to it remains unclear.
- We're looking at per-season averages, but these weighting can and do chance within a season. This is in particular the case for new maps.
- While this topic is fascinating I sadly have very little time to look further into it.
- This was written on January 27, 2025. This chart will automatically update with future database updates which might not be reflected in the text.
