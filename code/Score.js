import React from 'react';
import Category from './Category.js';
import _ from 'lodash';

export default class Score extends React.Component {
	constructor(props){
		super(props);

		const playerPoints = {};

		this.props.playerNames.forEach((name) => {
			playerPoints[name] = 0
		});

		this.state = { playerPoints: playerPoints };
		this.submit = this.submit.bind(this);
		this.updatePlayerPoints = this.updatePlayerPoints.bind(this);
	}

	render(){
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">Score</h3>
				</div>
				<div className="panel-body">
					<div>
						{this.props.categories.map((category, index) => <Category category={category} index={index+1}/>)}
					</div>
					<div>
						<h4>Scores:</h4>
						<div>
							{
								this.props.playerNames.map((name) => 
									<PlayerScore 
										playerName={name} 
										goToConfirmState={this.goToConfirmState} 
										playerPoints={this.state.playerPoints[name]}
										updatePlayerPoints={this.updatePlayerPoints}/>)
							}
						</div>
						<button type="button" className="btn btn-success" onClick={this.submit}>Submit</button>
					</div>
				</div>
			</div>
		);
	}

	submit(){
		for(let name in this.state.playerPoints){
			this.props.updatePlayerScore(name, this.state.playerPoints[name]);
		}
		this.props.goToConfirmState();
	}

	updatePlayerPoints(name, points){
		const playerPoints = this.state.playerPoints;
		playerPoints[name] = points;
		this.setState({ playerPoints: playerPoints });
	}
}

class PlayerScore extends React.Component {
	constructor(props) {
		super(props);

		this.updatePlayerPoints = this.updatePlayerPoints.bind(this);
	}

	render() {
		return (
			<div>
				{this.props.playerName}: <input type="number" min="0" defaultValue={this.props.playerPoints} onKeyUp={this.updatePlayerPoints}></input>
			</div>
		);
	}

	updatePlayerPoints(e) {
		e.preventDefault();

		this.props.updatePlayerPoints(this.props.playerName, parseInt(e.target.value));
	}
}