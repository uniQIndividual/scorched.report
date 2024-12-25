// Courtesy of https://member.report/

import type { manifest } from "astro:ssr-manifest";

const API_KEY = (() => {
	// get the correct public api key
	switch (location.origin) {
		case "http://localhost:2121":
			return "384cff14272c4367b83c334163831342"
		case "https://scorched.report":
			return "131362d4d4044f138120580ffabc8299"
		case "https://uniQIndividual.github.io":
			return "92420034656747a9ad26ea3d58e61281"
		default:
			return ""
	}
})();

const API = {
	make_call(url: string, method = "GET", data: any = null, binary: any = false): Promise<any> {
		return new Promise<any>(
			(resolve, reject) => {
				const request = new XMLHttpRequest();
				request.onload = function () {
					if (this.status === 200) {
						resolve(this.response);
					} else {
						console.error("Request to " + url + " failed");
						reject({"title": "Bungie rejected the request for the following reason", "description": this.status + ": " + this.response, "response": this.response});
					}
				};
				request.onerror = function (e) {
					console.error("Request to " + url + " failed");
					reject({"title": "API Request failed", "description": "Unable to contact Bungie's API", "response": this.response});
				};
				request.open(method, url);
				request.setRequestHeader("X-API-Key", API_KEY);
				if(binary){
					request.overrideMimeType("text/plain; charset=x-user-defined"); // in case the server does not already set the correct type
				}
				// request.setRequestHeader("Accept", "application/json");
				if (data === null) {
					request.send();
				} else {
					request.send(JSON.stringify(data));
				}
			});
	},

	requests: {
		Destiny2: {
			GroupSearch(data: object) {
				// this makes sure we're querying clans, not Bungie groups

				return API.make_call(
					`https://www.bungie.net/platform/GroupV2/Search/`,
					"POST",
					{ groupType: 1, ...data },
				);
			},

			SearchDestinyPlayerByBungieName(name: string, denominator: string) {
				const data = {
					displayName: name,
					displayNameCode: denominator,
				};

				return API.make_call(
					`https://www.bungie.net/platform/Destiny2/SearchDestinyPlayerByBungieName/-1/ `,
					"POST",
					data,
				);
			},

			Stats(membershipType: string, membershipId: string) {
				return API.make_call(
					`https://www.bungie.net/platform/Destiny2/${membershipType}/Account/${membershipId}/Stats/`,
				);
			},
			Manifest() {
				return API.make_call(
					`https://www.bungie.net/Platform/Destiny2/Manifest/`,
				);
			},
			Milestones() {
				return API.make_call(
					`https://www.bungie.net/Platform/Destiny2/Milestones/`,
				);
			},
		},

		GroupV2: {
			GetGroupsForMember(membershipId: string, membershipType: string) {
				return API.make_call(
					`https://www.bungie.net/platform/GroupV2/User/${membershipType}/${membershipId}/0/1/`,
				);
			},

			GetMembersOfGroup(groupId: string) {
				return API.make_call(
					`https://www.bungie.net/platform/GroupV2/${groupId}/Members/`,
				);
			},

			GetGroup(groupId: string): Promise<any> {
				return API.make_call(
					`https://www.bungie.net/platform/GroupV2/${groupId}/`,
				);
			},
		},

		PGCR: {
			GetPostGameCarnageReport(id: string) {
				return API.make_call(
					`https://stats.bungie.net/Platform/Destiny2/Stats/PostGameCarnageReport/${id}`,
				);
			},
			InitializeDestinyActivityDefinition(id: string) {
				return API.make_call(
					`https://stats.bungie.net/Platform/Destiny2/Stats/PostGameCarnageReport/${id}`,
				);
			},
			GetCharacterPGCRHistory(id: string, platform: string, character: string, page: number, matchesPerPage: number) {
				return API.make_call(
					`https://stats.bungie.net/Platform/Destiny2/${platform}/Account/${id}/Character/${character}/Stats/Activities/?mode=62&count=${matchesPerPage}&page=${page}`,
					"GET",
					null,
					false
				);
			},
		},

		User: {
			SearchByGlobalNamePost(name: string, page = 0) {
				const data = { displayNamePrefix: name };

				return API.make_call(
					`https://www.bungie.net/platform/User/Search/GlobalName/${page}/`,
					"POST",
					data,
				);
			},
			GetStoredProfieData(id: string) {
				return API.make_call(
					`${location.origin}/data/mock/${id}.json.zst`,
					"GET",
					null,
					true
				);
			},
			GetBungieProfieData(id: string, platform: string) {
				return API.make_call(
					`https://www.bungie.net/Platform/Destiny2/${platform}/Profile/${id}/?components=100,200`,
					"GET",
					null,
					false
				);
			},
			GetHistoricAccountStats(id: string, platform: string) {
				return API.make_call(
					`https://www.bungie.net/Platform/Destiny2/${platform}/Account/${id}/Stats/?groups=100,200`,
					"GET",
					null,
					false
				);
			},
			GetHistoricCharacterStats(id: string, platform: string, character: string) {
				return API.make_call(
					`https://www.bungie.net/Platform/Destiny2/${platform}/Account/${id}/Character/${character}/Stats/?modes=62&groups=1,3`, // note these are only for team scorched
					"GET",
					null,
					false
				);
			},
		},

		Minigame: {
			GetUserCannonData(id: string) {
				return API.make_call(
					`https://scorched.nblock.dev/api/users/${id}`,
				);
			},
		},
	},
};

export default API;