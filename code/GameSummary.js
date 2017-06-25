import React from 'react';
import _ from 'lodash';

export default class GameSummary extends React.Component {
	render(){
		const playerScores = this.props.playerScores;
		const sortedKeys = _(playerScores).keys().sort((a,b) => playerScores[b] - playerScores[a]).value();

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">Summary</h3>
				</div>
				<div className="panel-body">
					<h4>Scores:</h4>
					<div>
						{
							sortedKeys.map((name) => <Result playerName={name} score={playerScores[name]} />)
						}
					</div>
					<button type="button" className="btn btn-success" onClick={this.props.startNewGame}>Start new game!</button>
				</div>
			</div>
		);
	}
}

class Result extends React.Component {
	render() {
		return (
			<h5>{this.props.playerName}: {this.props.score}</h5>
		);
	}
}