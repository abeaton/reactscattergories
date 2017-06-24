import React from 'react';

export default class PlayerName extends React.Component {
	constructor (props) {
		super(props);

		this.setPlayerName = this.setPlayerName.bind(this);
		this.removePlayer = this.removePlayer.bind(this);
	}

	render () {
		return (
			<div>
				<input defaultValue={this.props.playerName} onKeyUp={this.setPlayerName}></input>
				<a><span className="glyphicon glyphicon-remove" aria-hidden="true" onClick={this.removePlayer}></span></a>
			</div>
		);
	}

	setPlayerName (e) {
		e.preventDefault();

		const playerName = e.target.value;
		this.props.setPlayerName(playerName, this.props.index);
	}

	removePlayer(e) {
		e.preventDefault();

		this.props.removePlayer(this.props.index);
	}
}