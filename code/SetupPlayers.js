import React from 'react';
import PlayerList from './PlayerList.js';
import _ from 'lodash';

export default class SetupPlayers extends React.Component {
	constructor(props) {
		super(props);
	}

	render () {
		var nextButtonClasses = `btn btn-success ${this.displayButtonProperly()}`;
		return (
			<div className="panel panel-info">
				<div className="panel-heading">Players</div>
				<div className="panel-body">
					<p>Please add unique names for the Scattergories players below:</p>
					<PlayerList playerNames={this.props.playerNames} setPlayerName={this.props.setPlayerName} removePlayer={this.props.removePlayer} />
					<br/>
					<div>
						<button type="button" className='btn btn-default' onClick={this.props.addPlayer}>Add player</button>
						<button type="button" className={nextButtonClasses} onClick={this.props.goToSetupRules}>Next</button>
					</div>
				</div>
			</div>
		);
	}

	displayButtonProperly(){
		const numPlayers = this.props.playerNames.size;
		const allPlayersHaveNames = _.every(this.props.playerNames.toArray(), name => name.length > 0);
		const anyDuplicatePlayerNames = this.anyDuplicatePlayerNames();

		return (numPlayers < 2 || !allPlayersHaveNames || anyDuplicatePlayerNames) ? "invisible" : "";
	}

	anyDuplicatePlayerNames(){
		const playerNames = this.props.playerNames.toArray();
		const uniqueNames = _.uniq(playerNames);

		return uniqueNames.length !== playerNames.length;
	}
}