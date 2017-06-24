import React from 'react';
import PlayerName from './PlayerName.js';

export default class PlayerList extends React.Component {
	render () {
		const inputs = this.props.playerNames.map((name, index) => <PlayerName playerName={name} setPlayerName={this.props.setPlayerName} index={index} removePlayer={this.props.removePlayer}/>);

		return (
			<div>
				{inputs}
			</div>
		)
	}
}