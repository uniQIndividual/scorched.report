// Courtesy of https://member.report/

import React from "react";
import API from "../lib/api";
import Player from "../classes/Player";
import ErrorDynamic from "../modules/ErrorDynamic";
import DropdownElement from "./DropdownElement";


interface UserSearchState {
	players: Array<Player>;
	bungiePlayers: Array<Player>;
	error: { title: string, text: string },
}

export default class UserSearch extends React.Component<{}, UserSearchState> {
	constructor(props: any) {
		super(props);
		this.searchFormEventHandler = this.searchFormEventHandler.bind(this);
		this.searchPlayers = this.searchPlayers.bind(this);
		this.addClanToPlayers = this.addClanToPlayers.bind(this);
		this.state = {
			players: [],
			bungiePlayers: [],
			error: {
				title: "",
				text: "",
			},
		};
	}


	addClanToPlayers(players_list: Array<Player>, is_bungie_player: boolean) {
		for (let player_position = 0; player_position < players_list.length; player_position++) {
			let player = players_list[player_position];


			if (!is_bungie_player && player.data.destinyMemberships.length === 0) {
				// TODO: What do we do with people who just... don't play Destiny?
				players_list[player_position].data.clan = null;
				this.setState({ players: players_list });
				continue;
			}

			let membershipId = is_bungie_player
				? player.data.membershipId
				: player.data.destinyMemberships[0].membershipId;
			let membershipType = is_bungie_player
				? player.data.membershipType
				: player.data.destinyMemberships[0].membershipType;

			API.requests.GroupV2.GetGroupsForMember(membershipId, membershipType)
				.then((data) => {
					data = JSON.parse(data);

					if (data.Response.totalResults === 0) {
						players_list[player_position].data.clan = "";
					} else {
						players_list[player_position].data.clan = {};
						players_list[player_position].data.clan.id = data.Response.results[0].group.groupId;
						players_list[player_position].data.clan.name = data.Response.results[0].group.name;
					}

					if (is_bungie_player) {
						this.setState((_prevState) => ({ bungiePlayers: players_list }));
					} else {
						this.setState((_prevState) => ({ players: players_list }));
					}
				})
				.catch();
		}
	}

	searchPlayers(event: any) {
		event.preventDefault();
		this.setState((_prevState) => ({ error: { title: "", text: "" } }));
		let query = event.target.scorcher_search.value;

		API.requests.User.SearchByGlobalNamePost(query)
			.then(data => {

				let players: Player[] = [];
				for (const result of JSON.parse(data).Response.searchResults) {
					players.push(new Player(result));
				}
				this.setState((prevState) => ({ players: prevState.players }),
					() => {
						this.addClanToPlayers(players, false);
					},
				);
			})
			.catch(
				e => {
					this.setState((_prevState) => ({ error: { title: "A Network Error occurred", text: "Unable to access Bungie's API" } }));
					console.error(e)
				});

		if (query.includes("#")) {
			let name = query.split("#")[0];
			let denominator = query.split("#")[1];

			API.requests.Destiny2.SearchDestinyPlayerByBungieName(name, denominator)
				.then((data) => {
					let players: Player[] = [];
					for (const result of JSON.parse(data).Response) {
						players.push(new Player(result));
					}
					this.setState((prevState) => ({ bungiePlayers: prevState.bungiePlayers }),
						() => {
							this.addClanToPlayers(players, true);
						},
					);
				})
				.catch(e => console.error(e)); // TODO: Add viewable error output
		}
	}

	searchFormEventHandler(event: any) {
		event.preventDefault();

		this.setState({
			players: [],
			bungiePlayers: [],
		});

		if (event.target.scorcher_search.value !== "") {
			this.searchPlayers(event);
		}
	}

	override render() {
		return (
			<div className="mt-4 flex justify-center" onClick={(e) => {
				e.stopPropagation();
			}}>
				<form className="flex flex-wrap justify-center" onSubmit={this.searchFormEventHandler}>
					<div className="relative mt-1 backdrop-blur-sm max-w-[242px]">
						<div className="w-[242px]">
							<div
								className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
							>
								<svg
									className="w-5 h-5 text-gray-500 dark:text-gray-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
									>
									</path>
								</svg>
							</div>
							<input
								type="text"
								id="scorcher_search" name="scorcher_search"
								className=" bg-[rgba(0,0,0,0.2)] border border-gray-300 text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-primary-950 focus:border-primary-950 block w-full pl-10 p-4 dark:border-gray-400 placeholder-gray-800 dark:placeholder-gray-300 dark:text-white dark:focus:ring-gray-200 dark:focus:border-gray-200"
								placeholder="Find scorchers..."
							/>
						</div>
					</div>
					{/*<input type="search" id="q" name="q" className="bg-gray-100 w-96 flex justify-center"
					       placeholder={"Find scorchers..."} />*/}
					<button type="submit" className="hidden w-0 h-0 text-gray-900 dark:text-gray-100"> </button>
					<div className="pt-2 flex flex-wrap justify-center">
						{this.state.players.map(player => {
							if (player.data.clan == null || player.data.destinyMemberships.length == 0) {
								return
							}
							return <DropdownElement key={player.data.membershipId}
								active={false}
								username={player.data.bungieGlobalDisplayName + "#" + player.data.bungieGlobalDisplayNameCode}
								subtitle={player.data?.clan.name || ""}
								iconPath={player.data.destinyMemberships[0].iconPath}
								to={`/report?id=${player.data.destinyMemberships[0].membershipId}&platform=${player.data.destinyMemberships[0].membershipType}`} />
						})}
						{this.state.bungiePlayers.map(player => {

							if (player.data.clan == null) {
								return
							}
							return <DropdownElement key={player.data.membershipId}
								active={false}
								username={player.data.bungieGlobalDisplayName + "#" + player.data.bungieGlobalDisplayNameCode}
								subtitle={player.data?.clan.name || ""}
								iconPath={player.data.iconPath}
								to={`/report?id=${player.data.membershipId}&platform=${player.data.membershipType}`} />
						})}
					</div>
				</form>
				{
					this.state.error.title != "" ?
						<ErrorDynamic title={this.state.error.title} text={this.state.error.text} /> : ""
				}
			</div>
		);
	}
}