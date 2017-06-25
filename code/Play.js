import React from 'react';
import Category from './Category.js';

export default class Play extends React.Component {
	constructor(props){
		super(props);

		this.state = { time: this.props.timePerRound, totalTime: this.props.timePerRound };
		this.goToScoreState = this.goToScoreState.bind(this);
		this.tick = this.tick.bind(this);
		this.goToScoreState();
	}

	render(){
		const timeRemainingRatio = this.state.time / this.state.totalTime;
		const timeRemainingAmount = timeRemainingRatio * 100;
		const progressBarStyle = { 
			width: timeRemainingAmount + "%"
		};

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">Categories</h3>
				</div>
				<div className="panel-body">
					<div className="progress">
						<div className="progress-bar" style={progressBarStyle} role="progressbar" aria-valuenow={timeRemainingAmount + ""} aria-valuemin="0" aria-valuemax="100">
						</div>
					</div>
					<div>
						{this.props.categories.map((category, index) => <Category category={category} index={index+1}/>)}
					</div>
				</div>
			</div>
		);
	}

	goToScoreState(){
		const timer = setInterval(function(){ 
			this.tick();
			if(this.state.time === -1){
				clearInterval(timer);
				this.props.goToScoreState();
			}
		}.bind(this), 1000)
	}

	tick() {
		this.setState((prevState) => ({
			time: prevState.time - 1
		}));
	}
}