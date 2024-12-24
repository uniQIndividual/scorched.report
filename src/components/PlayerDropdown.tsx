// Courtesy of https://member.report/

import React from "react";
import Player from "../classes/Player";
import DropdownElement from "./DropdownElement";

interface PlayerDropdownProps {
	list: Array<Player>;
}

export default class PlayerDropdown extends React.Component<PlayerDropdownProps> {
	override render() {
		if ( this.props.list.length === 0 ) {
			return null;
		}

		let elements = [];

		let i = 0;
		for ( const player of this.props.list ) {

			let player_name = player.data.bungieGlobalDisplayName + "#" + player.data.bungieGlobalDisplayNameCode;

			//let key = player.data.bungieNetMembershipId;
			let key = ++i;

			if ( player.data.clan === null ) {
			} else if ( player.data.clan === undefined ) {
			} else {
				if ( player.data.clan === "" ) {					
					elements.push(
						<DropdownElement key={key}
						                 active={false}
						                 username={player.data.bungieGlobalDisplayName + "#" + player.data.bungieGlobalDisplayNameCode}
						                 subtitle={""}
										 iconPath={player.data.destinyMemberships[0].iconPath}
										 to={`/report/${key}`} />,
					);
				} else {
					elements.push(
						<DropdownElement key={key}
						                 active={true}
						                 username={player.data.bungieGlobalDisplayName + "#" + player.data.bungieGlobalDisplayNameCode}
						                 subtitle={player.data.clan.name}
										 iconPath={player.data.destinyMemberships[0].iconPath}
						                 to={`/report/${key}`} />,
					);
				}
			}
		}

		return (
			<div className="PlayerList">
				<div className="Dropdown">
					{elements}
				</div>
			</div>
		);
	}
}