import React from 'react';

export default class Category extends React.Component {
	render(){
		return (
			<div>
				<b>{this.props.index})</b> {this.props.category}
			</div>
		);
	}
}