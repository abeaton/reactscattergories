import React from 'react';
import ScattergoriesRandomGenerator from './ScattergoriesRandomGenerator.js';
import Confirm from './Confirm.js';
import Play from './Play.js';
import Score from './Score.js';
import GameSummary from './GameSummary.js';
import _ from 'lodash';

const gameState = {
	confirmReady: "confirmReady",
	playState: "playState",
	scoreState: "scoreState"
};

export default class Game extends React.Component {
	constructor(props){
		super(props);

		const randomGenerator = new ScattergoriesRandomGenerator(this.props.numberOfRounds);
		this.categoryIterator = randomGenerator.getCategoryIterator();

		const playerScores = {};
		const playerNames = this.props.playerNames.asMutable().toArray();

		playerNames.forEach((name) => {
			playerScores[name] = 0
		});

		this.state = { 
			categories: this.categoryIterator.next().value, 
			gameState: gameState.confirmReady,
			playerScores: playerScores,
			playerNames: playerNames,
			numberOfRounds: this.props.numberOfRounds,
			roundsCompleted: 0
		};

		this.goToPlayState = this.goToPlayState.bind(this);
		this.goToScoreState = this.goToScoreState.bind(this);

		this.goToConfirmState = this.goToConfirmState.bind(this);
		this.updatePlayerScore = this.updatePlayerScore.bind(this);
		this.startNewGame = this.startNewGame.bind(this);
	}

	render(){
		if(this.state.roundsCompleted === this.state.numberOfRounds){
			return <GameSummary playerScores={this.state.playerScores} startNewGame={this.startNewGame}/>;
		}

		switch(this.state.gameState){
			case gameState.confirmReady:
				return (<Confirm goToPlayState={this.goToPlayState}/>);

			case gameState.playState:
				return (
					<Play 
						categories={this.state.categories}
						timePerRound={this.props.timePerRound}
						goToScoreState={this.goToScoreState}/>
					);

			case gameState.scoreState:
				return (
						<Score
							categories={this.state.categories}
							playerNames={this.state.playerNames}
							goToConfirmState={this.goToConfirmState}
							updatePlayerScore={this.updatePlayerScore}/>
					);
			default:
				throw "INVALID GAME STATE"
		}
	}

	goToPlayState(){
		this.setState({ gameState: gameState.playState });
	}

	goToScoreState(){
		this.setState({ gameState: gameState.scoreState });
	}

	updatePlayerScore(playerName, points){
		const playerScores = this.state.playerScores;
		playerScores[playerName] += points;
		this.setState({ playerScores: playerScores });
	}

	goToConfirmState(){
		this.setState({ 
			gameState: gameState.confirmReady, 
			categories: this.categoryIterator.next().value,
			roundsCompleted: this.state.roundsCompleted + 1
		});
	}

	startNewGame() {
		this.props.backToPlayerNames();
	}
}