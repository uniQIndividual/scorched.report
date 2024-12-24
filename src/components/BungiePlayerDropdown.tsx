// Courtesy of https://member.report/

import React from "react";
import Player from "../classes/Player";
import DropdownElement from "./DropdownElement";

interface BungiePlayerDropdownProps {
	list: Array<Player>;
}

const MembershipTypeDict: { [key: number]: string } = {
	0: "Unknown",
	1: "Xbox",
	2: "PlayStation",
	3: "Steam",
	4: "Battle.net",
	5: "Stadia",
	10: "Demon",
	254: "Bungie Next",
};

export default class BungiePlayerDropdown extends React.Component<BungiePlayerDropdownProps> {
	override render() {
		if ( this.props.list.length === 0 ) {
			return null;
		}

		let elements = [];

		for ( const player of this.props.list ) {

			let player_name = player.data.bungieGlobalDisplayName + "#" + player.data.bungieGlobalDisplayNameCode
				+ " (" + MembershipTypeDict[player.data.membershipType] + ")";

			let key = player.data.membershipId;
			
			elements.push(
				<DropdownElement key={key}
								 active={true}
								 username={player.data.bungieGlobalDisplayName + "#" + player.data.bungieGlobalDisplayNameCode
									+ " (" + MembershipTypeDict[player.data.membershipType] + ")"}
								 subtitle={player.data.clan.name}
								 iconPath={player.data.destinyMemberships.iconPath}
								 to={`/report/${key}`}/>,
			);
		}

		return (
			<div className="">
				<div className="">
					{elements}
				</div>
			</div>
		);
	}
}