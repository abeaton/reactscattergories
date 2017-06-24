import React from 'react';
import ReactDom from 'react-dom';
import Immutable from 'immutable';
import _ from 'lodash';

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

class Game extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (<div>GAME</div>);
	}
}

class SetupRules extends React.Component {
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

class SetupPlayers extends React.Component {
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
					<PlayerList playerNames={this.props.playerNames} setPlayerName={this.props.setPlayerName} />
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

class PlayerList extends React.Component {
	render () {
		const inputs = this.props.playerNames.map((name, index) => <PlayerName playerName={name} setPlayerName={this.props.setPlayerName} index={index}/>);

		return (
			<div>
				{inputs}
			</div>
		)
	}
}

class PlayerName extends React.Component {
	constructor (props) {
		super(props);

		this.setPlayerName = this.setPlayerName.bind(this);
	}

	render () {
		return (
			<div>
				<input defaultValue={this.props.playerName} onKeyUp={this.setPlayerName}></input>
			</div>
		);
	}

	setPlayerName (e) {
		e.preventDefault();

		const playerName = e.target.value;
		this.props.setPlayerName(playerName, this.props.index);
	}
}

ReactDom.render(<Scattergories/>, document.getElementById('mount'));