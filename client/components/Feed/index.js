import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

export default class Feed extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		console.log('feed');
		return (
			<Link to='profile'>
				<Button label='Edit Profile' color='green' />
			</Link>
		);
	}
}
