import React from 'react';

export default class Confirm extends React.Component {
	constructor(props){
		super(props);

		this.state = { isStartButtonClicked: false, time: 3 };
		this.goToPlayState = this.goToPlayState.bind(this);
		this.tick = this.tick.bind(this);
	}

	render(){
		let body;
		if(this.state.isStartButtonClicked){
			body = <p>{this.state.time}</p>;
		} else {
			body = <div>
					<p>Click the button below when ready to begin!</p>
					<button type="button" className="btn btn-success" onClick={this.goToPlayState}>Start!</button>
				</div>;
		}

		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">Confirm</h3>
				</div>
				<div className="panel-body">
					{body}
				</div>
			</div>
		);
	}

	goToPlayState(){
		this.setState({ isStartButtonClicked: true });

		const timer = setInterval(function(){ 
			this.tick();
			if(this.state.time === 0){
				clearInterval(timer);
				this.props.goToPlayState();
			}
		}.bind(this), 1000)
	}

	tick() {
		this.setState((prevState) => ({
			time: prevState.time - 1
		}));
	}
}