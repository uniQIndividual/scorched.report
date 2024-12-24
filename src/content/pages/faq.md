---
title: 'FAQ'
layout: '../../app/MarkdownWrapper.astro'
---

## Who are these Scorched Enthusiasts?

Scorched Enthusiasts or SE is a loose group of people who love Team Scorched and probably spend too much time there. Since not many people regularly play Team Scorched outside of events, you tend to quickly get to know most Scorched Enthusiasts.

SE is NOT a cult.

## Why did you create this?

Did you ever have a nagging question you know has an answer, but it takes a momentous effort to get to? This was the case for me with Team Scorched and 50+&#160;kill matches and the "I made this for you" medal. Using the statistics we had at the time, which included only our clan members, we could tell that only 3 clan members had ever achieved 50&#160;kills in a single match. But how do you know if anyone else has? How many crazy people are out there and are just not playing Team Scorched anymore? The answer obviously existed; buried under 50&#160;TB of session data (PGCRs). More on how I went about solving that question is in the [next section](#how-does-this-website-even-work), but once I found the answer I thought the data was too useful to discard again. There's usually enough downtime between Team Scorched weeks to work on projects. Also most websites exclude Team Scorched stats specifically so you can also thank Destiny Tracker for this... And btw the answer was: 6 people achieved a 50+&#160;match and our goat Naze was the only one to get a medal (although it was after the match ended so it does not show up in the api lol).

## How does this website even work?

I sometimes wonder that myself.

pgcrs, zstd-jsonl-filter, etc

fun fact: zstd-jsonl-filter turned out to be so fast that if you had the compressed ~2.5&#160;TB source files stored on an NVMe you might be able to search all 50 TB in under 2&#160;hours (processing at ~7&#160;GB/s or 2&#160;000&#160;000&#160;matches/s). Over Gigabit Ethernet it took me closer to 11 hours. Obviously I filtered the entire database only once to all Team Scorched matches which left me with X GB of dataaaaaaaaaaaaaa

I suppose given all Team Scorched data is currently around 30 GB and even the most active players reach around 5000 matches, that is a number that could have been pulled directly from the API. If you wanted to adopt this, you could go that route I guess.

I want to be able to walk away at any time and have the website still work. Some system design decisions e.g. the choice to host icons files directly stem from that.

Webdevelopment was the awful part lol

## X looks similar to website.report

That is likely true. While I didn't intentionally took anyone's design, we all started with the similar goals and looked at the same reference material.

## Why is this data different?

- stuff after the time ended
- data is missing
- cheated stuff is removed

- some pgcrs are simply gone, i.e. Bungie does not show them anywhere. does matches essentially don't exist anymore
- some scrapped pgcrs have missing fields such as missing medal information. this will only affect profiles where the character information is unavailable e.g. because bungie.net is down

- bungie does not report the crown is mine medal

- some pgcrs like https://bray.tech/report/4817214499 are just broken

broken pgcr broken by bungie

4817214499, 4817311121, 4817752159, 4817909354, 4818017690, 4818075093, 4818102193, 4819219037, 4819294202, 4819416171, 4819512047, 4819797530, 4819995377


Alternatively there are [ways of hosting the bulk data as a sql database even on a staticly hosted website](https://phiresky.github.io/blog/2021/hosting-sqlite-databases-on-github-pages/), but I don't think that route makes sense for the current access and update patterns.

## How is Elo calculated?

True Skill, OpenSkill. https://github.com/atomflunder/skillratings/issues/12 I might look more into implementing that when I have more time.

## These colors seem off

Idk I'm playing with colorblind setting because they look much better imo anyway and that's what I modeled after. If you see something that seems legitimately broken please message me.

## Who even cares about Team Scorched?
