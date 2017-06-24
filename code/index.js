import React from 'react';
import ReactDom from 'react-dom';
import SetupPlayers from './SetupPlayers.js';
import SetupRules from './SetupRules.js';
import Game from './Game.js';
import Immutable from 'immutable';

const stage = {
	setupPlayers: "setupPlayers",
	setupRules: "setupRules",
	gamePlay: "gamePlay"
};

class Scattergories extends React.Component {
	constructor(props) {
		super(props);

		const playerNames = Immutable.List();

		this.state = { playerNames: playerNames, numberOfRounds: 12, timePerRound: 150, stage: stage.setupPlayers };
		this.addPlayer = this.addPlayer.bind(this);
		this.removePlayer = this.removePlayer.bind(this);
		this.setPlayerName = this.setPlayerName.bind(this);
		this.goToSetupRules = this.goToSetupRules.bind(this);

		this.setNumberOfRounds = this.setNumberOfRounds.bind(this);
		this.setTimePerRound = this.setTimePerRound.bind(this);
		this.backToPlayerNames = this.backToPlayerNames.bind(this);
		this.startGame = this.startGame.bind(this);
	}

	render () {
		switch(this.state.stage){
			case stage.setupPlayers:
				return <SetupPlayers
					playerNames={this.state.playerNames} 
					addPlayer={this.addPlayer} 
					removePlayer={this.removePlayer}
					setPlayerName={this.setPlayerName}
					goToSetupRules= {this.goToSetupRules} />;

			case stage.setupRules:
				return <SetupRules
					numberOfRounds={this.state.numberOfRounds}
					timePerRound={this.state.timePerRound}
					setNumberOfRounds={this.setNumberOfRounds}
					setTimePerRound={this.setTimePerRound}
					backToPlayerNames={this.backToPlayerNames}
					startGame={this.startGame}/>;

			case stage.gamePlay:
				return <Game />;

			default:
				throw "GAME IS BROKEN";
		}
	}

	addPlayer(e) {
		e.preventDefault();
		const playerNames = this.state.playerNames.push("");
		this.setState({ playerNames: playerNames });
	}

	removePlayer(index){
		const playerNames = this.state.playerNames.delete(index);
		this.setState({ playerNames: playerNames });
	}

	setPlayerName(name, index){
		const playerNames = this.state.playerNames.set(index, name);
		this.setState({ playerNames: playerNames });
	}

	setNumberOfRounds(numberOfRounds){
		this.setState({ numberOfRounds: numberOfRounds });
	}

	setTimePerRound(timePerRound){
		this.setState({ timePerRound: timePerRound });
	}

	goToSetupRules(){
		this.setState({stage: stage.setupRules });
	}

	backToPlayerNames(){
		this.setState({stage: stage.setupPlayers });
	}

	startGame(){
		this.setState({stage: stage.gamePlay });
	}
}

ReactDom.render(<Scattergories/>, document.getElementById('mount'));