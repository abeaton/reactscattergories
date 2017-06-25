import React from 'react';
import ScattergoriesRandomGenerator from './ScattergoriesRandomGenerator.js';

export default class SetupRules extends React.Component {
	constructor(props) {
		super(props);

		this.setNumberOfRounds = this.setNumberOfRounds.bind(this);
		this.setTimePerRound = this.setTimePerRound.bind(this);
	}

	render() {
		var nextButtonClasses = `btn btn-success ${this.displayButtonProperly()}`;

		return (
			<div className="panel panel-info">
				<div className="panel-heading">Rules</div>
				<div className="panel-body">
					<div>
						Number of rounds: <input type="number" defaultValue={this.props.numberOfRounds} onKeyUp={this.setNumberOfRounds}></input>
					</div>
					<div>
						Time per round (in seconds): <input type="number" defaultValue={this.props.timePerRound} onKeyUp={this.setTimePerRound}></input>
					</div>
					<br/>
					<div>
						<button type="button" className="btn btn-default" onClick={this.props.backToPlayerNames}>Back</button>
						<button type="button" className={nextButtonClasses} onClick={this.props.startGame}>Next</button>
					</div>
				</div>
			</div>
		);
	}

	displayButtonProperly (){
		const numberOfRounds = this.props.numberOfRounds;
		const timePerRound = this.props.timePerRound;

		return Number.isFinite(numberOfRounds) 
			&& numberOfRounds > 0 
			&& Number.isFinite(timePerRound)
			&& timePerRound > 0 
				? "" 
				: "invisible";
	}

	setNumberOfRounds(e){
		e.preventDefault();

		const numberOfRounds = parseInt(e.target.value);
		this.props.setNumberOfRounds(numberOfRounds);
	}

	setTimePerRound(e){
		e.preventDefault();

		const timePerRound = parseInt(e.target.value);
		this.props.setTimePerRound(timePerRound);
	}
}