---
title: 'FAQ'
description: "https://www.youtube.com/watch?v=S-eWvdLwMoU&t=6397s"
layout: '../app/MarkdownStandalone.astro'
---

## Who are these Scorched Enthusiasts?

Scorched Enthusiasts or SE is a loose group of people who love Team Scorched and probably spend too much time there. Since not many people regularly play Team Scorched outside of events, you tend to quickly get to know most Scorched Enthusiasts.

SE is NOT a cult.

## Why did you create this?

Did you ever have a nagging question you know has an answer, but it takes a momentous effort to get to? This was the case for me with Team Scorched and 50+&#160;kill matches and the "I made this for you" medal. Using the statistics we had at the time, which included only our clan members, we could tell that only 3 clan members had ever achieved 50&#160;kills in a single match. But how do you know if anyone else has? How many crazy people are out there and are just not playing Team Scorched anymore? The answer obviously existed; buried under 50&#160;TB of session data (PGCRs). More on how I went about solving that question is in the [next section](#how-does-this-website-even-work), but once I found the answer I thought the data was too useful to discard again. There's usually enough downtime between Team Scorched weeks to work on projects. Additionally some websites specifically exclude Team Scorched stats, so in a way you can also thank websites like Destiny Tracker for this lol

btw the answer was: 6 people achieved a 50+&#160;match and our goat Naze was the only one to get a medal (although it was after the match ended so it doesn't even show up in the api...).

## How does this website even work?

Since I had the entire history of all PGCR activities ever played in Destiny 2 from the [Destiny 2 Post Game Carnage Report Dataset](https://d2.asun.co/pgcr.html), I somehow needed to find the Team Scorched matches. Since I obviously couldn't just extract all 50TB at once, I looked towards writing a tool which filtered this data as it is reading it. Since something like python or javascript would probably take ages, I used it to try out Rust. This tool would eventually become [zstd-jsonl-filter](https://github.com/uniQIndividual/zstd-jsonl-filter).

I already knew I wanted to be able to walk away at any time and have the website still work. Thus I decided on building the "database" locally and relying on the indexedDB in your browser and Bungie's api to fill the remaining matches. While this will not work for calculating a rating or maintaining some sort of global state, it should suffice for updating the match history and some leaderboards.

Webdevelopment was indeed the time consuming part lol

Alternatively there are [ways of hosting the bulk data as a sql database even on a staticly hosted website](https://phiresky.github.io/blog/2021/hosting-sqlite-databases-on-github-pages/), but I don't think that route makes sense for the current access and update patterns.

fun fact: zstd-jsonl-filter turned out to be so fast that if you had the compressed ~2.5&#160;TB source files stored on an NVMe you might be able to search all 50 TB in under 2&#160;hours (processing at ~7&#160;GB/s or 2&#160;000&#160;000&#160;matches/s). Over Gigabit Ethernet it took me closer to 11 hours. Obviously I filtered the entire database only once to all Team Scorched matches which left me with 50 GB of data.

## Why is this data different?

Please keep in mind that Scorched Report is a static site, i.e. it does not have a "real" database or active components. It's just a bunch of files. This allows

- the website to hopefully work indefinitely
- me to walk away whenever without stuff breaking
- you to easily adapt it and make changes

However that also means that the leaderboard and elo won't update unless I manually do so. Given that Team Scorched currently only comes around every two months, it shouldn't matter much.

Sometimes the matches returned by Bungie are missing data or completely broken. Just a couple examples for now:

- Some PGCRs are simply missing data such as medals.
- Bungie does not report the "the crown is mine" medal i.e. I have no idea how many you received. Or maybe I can't find it, though seemingly neither can any other fan site.
- Bungie seems to have an issue with disconnected players and notes impossibly low playtimes. This seems to mainly affect matches around April 14, 2023.
- PGCR data is inconsistent in many unexpected ways, e.g. what do you do with matches where Team 1 with a single player won against Team 2 with 0 players? This answer likely differs between your favorite websites.
- Sometimes players had not been assigned to a team yet. Scorched Report will list those matches, but no assigned a rating.
- Some PGCRs are just broken in a way that messes with calculations, e.g. 4817214499, 4817311121, 4817752159, 4817909354, 4818017690, 4818075093, 4818102193, 4819219037, 4819294202, 4819416171, 4819512047, 4819797530, 4819995377

## Missing Data

I'm aware that some data is missing. This includes:

- Everything that happens after the "Victory" message will be missing in the API. You getting a seventh column, a we ran, a 50 kill-streak... I can't see it.
- If the PGCR entry is missing player names and medals then they will be missing in places such as the leaderboards.
- Certain cheated entries are excluded from leaderboards and ratings.
- Some PGCRs are simply gone, i.e. Bungie does not show them anywhere (see e.g. [TWAB 06/02/2017](https://www.bungie.net/7/en/News/article/45930/7_This-Week-At-Bungie---06022017)). These matches essentially don't exist anymore or maybe never did in the first place. Nothing I can do.

## How is Elo calculated?

It currently uses a pure OpenSkill implementation with a base rating of 1000 with an uncertainty of 1000/3 and a beta of 100. This might be too low and narrow, though we'd get even more escalating scores otherwise. There are some other important caveats to Team Scorched, in particular to estimating outcomes, but it shall suffice for now. I also can't implement weighting since [skillratings](https://github.com/atomflunder/skillratings/issues/12) does not currently support it. I might look more into implementing that when I have more time. Same is the case for score margins, etc.

Also OpenSkill can never perfectly reflect "skill", it is a approximation of your relative win chances and the uncertainty of your rating. High win-ratios, K/D alone won't guarantee a good score. In the end this is meant as a entertaining, somewhat arbitrary comparison stat for you and an interesting statistical exercise for me. But hey, that's why you can see the individual ratings for every single match and something feels wrong you can let me know.

For more information visit the [dedicated article](/science/elo_distribution).

## I'm missing an achievement/match/etc

Simply send me a message.

## These colors seem off

Idk I'm playing with colorblind setting because they look much better imo anyway and that's what I modeled after. If you see something that seems legitimately broken please message me.

## Who even cares about Team Scorched?

[https://www.youtube.com/watch?v=S-eWvdLwMoU&t=6397s](https://www.youtube.com/watch?v=S-eWvdLwMoU&t=6397s)