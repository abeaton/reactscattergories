import React from 'react';
import ReactDom from 'react-dom';
import Immutable from 'immutable';
import _ from 'lodash';

class Scattergories extends React.Component {
  render () {
    return <Welcome />;
  }
}

class Welcome extends React.Component {
	constructor(props) {
		super(props);
		const playerNames = Immutable.List();
		this.state = { playerNames: playerNames };
		this.addPlayer = this.addPlayer.bind(this);
		this.setPlayerName = this.setPlayerName.bind(this);
	}

	render () {
		var startGameButtonClasses = `btn btn-success ${this.displayButtonProperly()}`;
		return (
			<div className="panel panel-info">
				<div className="panel-heading">Welcome</div>
				<div className="panel-body">
					<p>Please add the names of the Scattergories players below:</p>
					<PlayerList playerNames={this.state.playerNames} setPlayerName={this.setPlayerName} />
					<br/>
					<div>
						<button type="button" className='btn btn-default' onClick={this.addPlayer}>Add player</button>
						<button type="button button-" className={startGameButtonClasses}>Start Game</button>
					</div>
				</div>
			</div>
		);
	}

	displayButtonProperly (){
		const numPlayers = this.state.playerNames.size;
		const allPlayersHaveNames = _.every(this.state.playerNames.toArray(), name => name.length > 0);

		return numPlayers == 0 || !allPlayersHaveNames ? "disabled" : "";
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
		this.props.setPlayerName(e.target.value, this.props.index);
	}
}

ReactDom.render(<Scattergories/>, document.getElementById('mount'));