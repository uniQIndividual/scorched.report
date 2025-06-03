// Courtesy of https://member.report/

import React from "react";
import API from "../lib/api";
import ErrorDynamic from "../modules/ErrorDynamic";
import DropdownElement from "./DropdownElement";
import LoadingAnimation from "./LoadingAnimation";

interface UserSearchState {
	players: Array<Player>;
	bungiePlayers: Array<Player>;
	error: { title: string, text: string },
}
interface Player {
	membershipId: string;
	membershipType: string,
	displayName: string,
	nameCode: string,
	subtitle: any;
	active: boolean;
	lastOnline: number;
	iconPath: string,
	to: string,
}

export const Search = () => {
	const defaultPlayerList: Player[] = [];
	const [playerList, setPlayerList] = React.useState(defaultPlayerList);
	const [note, setNote] = React.useState(<></>);
	const [error, setError] = React.useState({
		title: "",
		text: "",
	},);
	/*
		constructor(props: any) {
			super(props);
			this.searchFormEventHandler = this.searchFormEventHandler.bind(this);
			this.searchPlayers = this.searchPlayers.bind(this);
			this.interpretBungieResponse = this.interpretBungieResponse.bind(this);
			this.addClanToPlayers = this.addClanToPlayers.bind(this);
			this.state = {
				players: [],
				bungiePlayers: [],
				error: {
					title: "",
					text: "",
				},
			};
		}*/

	const interpretBungieResponse = (result, isBungieAccount: boolean) => { // a person can have 0,1,or n memberships, we need to do some cleanup
		let newPlayerList: Player[] = [];
		if (isBungieAccount) {
			if (result.crossSaveOverride == 0 || result.crossSaveOverride == result.membershipType) {
				newPlayerList.push({
					displayName: result.bungieGlobalDisplayName,
					nameCode: result.bungieGlobalDisplayNameCode,
					active: true,
					iconPath: result.iconPath,
					lastOnline: 0,
					subtitle: "",
					to: "",
					membershipId: result.membershipId,
					membershipType: result.membershipType
				})
			}
		} else {
			for (let i = 0; i < result.destinyMemberships.length; i++) { // any addition memberships when crossplay is disabled
				let newPlayer: Player = {
					displayName: result.bungieGlobalDisplayName,
					nameCode: result.bungieGlobalDisplayNameCode,
					active: true,
					iconPath: result.destinyMemberships[i].iconPath,
					lastOnline: 0,
					subtitle: "",
					to: "",
					membershipId: result.destinyMemberships[i].membershipId,
					membershipType: result.destinyMemberships[i].membershipType
				}
				if (result.destinyMemberships[i].crossSaveOverride == 0 || result.destinyMemberships[i].crossSaveOverride == result.destinyMemberships[i].membershipType) {
					newPlayerList.push(newPlayer) // Push only if not overwritten by crosssave
				}
			}
		}
		return newPlayerList;
	}

	const addClanToPlayers = async (players: Player[]) => {
		let newPlayerList = players;
		await Promise.all(players.map((player) => API.requests.GroupV2.GetGroupsForMember(player.membershipId, player.membershipType))).then(responses => {
			responses.forEach((data, player_position) => {
				data = JSON.parse(data);
				if (data.Response.totalResults > 0) {
					newPlayerList[player_position].subtitle = data.Response.results[0].group.name;
					newPlayerList[player_position].lastOnline = Number(data.Response.results[0].member.lastOnlineStatusChange) * 1000;

					newPlayerList = newPlayerList.sort((a, b) => { // sort by most recent
						return (b.lastOnline || 0) - (a.lastOnline || 0)
					})
				}
			})
		})
			.catch();
		return newPlayerList

	}

	const searchFormEventHandler = async (query: string) => {
		if (query !== "") {
			setError({ title: "", text: "" }); // reset error message
			setNote(<div className="mt-4 w-[260px] flex-wrap justify-center rounded-lg bg-[rgba(0,0,0,0.5)] flex backdrop-blur-[8px] p-8"><LoadingAnimation /></div>);

			let players: Player[] = [];

			await API.requests.User.SearchByGlobalNamePost(query)
				.then(data => {
					for (const result of JSON.parse(data).Response.searchResults) {
						players = players.concat(interpretBungieResponse(result, false));
					}
				})
				.catch(
					e => {
						setError({ title: "A Network Error occurred", text: "Unable to access Bungie's API" });
						console.error(e)
					});

			if (/\#\d{1,4}$/.test(query)) { //searching for name#0123
				let name = query.split("#")[0];
				let denominator = query.split("#")[1];

				await API.requests.Destiny2.SearchDestinyPlayerByBungieName(name || "", denominator || "0")
					.then((data) => {
						for (const result of JSON.parse(data).Response) {
							players = players.concat(interpretBungieResponse(result, true))
						}
					})
					.catch(e => console.error(e)); // TODO: Add viewable error output
			}

			if (/^46\d{17}$/.test(query)) { //searching for a membershipid
				let id = query;

				await API.requests.User.GetMembershipsById(id)
					.then((data) => {
						const response = JSON.parse(data);
						if (response && response.Response && response.Response.destinyMemberships) {
							for (const result of response.Response.destinyMemberships) {
								players = players.concat(interpretBungieResponse(result, true))
							}
						}
					})
					.catch(e => console.error(e)); // TODO: Add viewable error output
			}

			players = await addClanToPlayers(players);
			if (players.length == 0) {
				setNote(<div className="mt-4 w-[260px] flex-wrap justify-center rounded-lg bg-[rgba(0,0,0,0.5)] flex backdrop-blur-[8px] text-white p-4 text-base">No players found</div>);
			} else {
				setNote(<></>);
			}
			setPlayerList([]);
			setPlayerList(players)
		}
	}

	return (
		<div className="mt-4" onClick={(e) => {
			e.stopPropagation();
		}}>
			<div className="flex justify-center">
				<form className="" onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.target);
					const formProps = Object.fromEntries(formData);
					searchFormEventHandler(String(formProps.scorcher_search))
				}}>
					<div className="relative mt-1 backdrop-blur-sm max-w-[242px]">
						<div className="w-[242px]">
							<input
								type="text"
								name="scorcher_search"
								className=" bg-[rgba(0,0,0,0.3)] dark:bg-[rgba(0,0,0,0.2)] focus:bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.5)] focus:dark:bg-[rgba(0,0,0,0.5)] hover:dark:bg-[rgba(0,0,0,0.5)] text-white dark:text-white sm:text-sm rounded-lg block w-full pl-10 p-4 drop-shadow-[0_2.2px_1.2px_rgba(0,0,0,0.9)] border border-gray-300 dark:border-gray-300 placeholder-gray-100 dark:placeholder-gray-300 lg:dark:placeholder-gray-200 "
								placeholder="Find scorchers..."
							/>
							<div
								className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
							>
								<svg
									className="w-5 h-5 text-gray-200 dark:text-gray-300"
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
						</div>
					</div>
					<button type="submit" className="hidden w-0 h-0 text-gray-900 dark:text-gray-100"> </button>
				</form>
			</div>
			{React.Children.count(note.props.children) > 0 ?
				<div className="flex justify-center">
					{note}
				</div> : <></>}
			<div className="pt-2 flex flex-wrap justify-center">
				{playerList.map(player => {
					return <DropdownElement key={player.membershipId}
						active={false}
						username={player.displayName + "#" + player.nameCode}
						subtitle={player.subtitle}
						iconPath={player.iconPath}
						lastOnline={player.lastOnline}
						to={`/report?id=${player.membershipId}&platform=${player.membershipType}`} />
				})}
			</div>
			{
				error.title != "" ?
					<ErrorDynamic title={error.title} text={error.text} /> : ""
			}
		</div>
	);
}
export default Search