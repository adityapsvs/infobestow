import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Divider, Form, Grid, Header, Icon } from 'semantic-ui-react';
import './index.css';

export default class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			showPassword: false
		};

		this.handleChange = (event) => {
			switch(event.target.name) {
				case 'firstName':
					this.setState({ firstName: event.target.value });
					break;
					case 'lastName':
						this.setState({ lastName: event.target.value });
						break;
					case 'email':
						this.setState({ email: event.target.value });
						break;
					case 'password':
						this.setState({ password: event.target.value });
						break;
					default:
						break;
			}
		}

		this.handleSubmit = (event) => {
			event.preventDefault();
			let {showPassword, ...state} = this.state;
			axios
				.post('/signup', state)
				.then(res => {
					console.log(res);
				})
		}
	}

	render() {
		return (
			<div className='signup-form'>
				<Container>
					<Header as='h1' align='center'>Sign Up</Header>
					<Divider hidden />
					<Form onSubmit={this.handleSubmit} size='large'>
						<Form.Group widths='equal'>
							<Form.Input fluid value={this.state.firstName} onChange={this.handleChange} name='firstName' label='FIRST NAME' />
							<Form.Input fluid value={this.state.lastName} onChange={this.handleChange} name='lastName' label='LAST NAME' />
						</Form.Group>
						<Form.Input fluid value={this.state.email} onChange={this.handleChange} name='email' label='EMAIL' />
						<Form.Input fluid value={this.state.password} onChange={this.handleChange} name='password' type='password' label='PASSWORD' />
						<Grid columns={3}>
							<Grid.Column>
								<Form.Button size='large' color='blue'>Submit</Form.Button>
							</Grid.Column>
							<Grid.Column>
								<Button size='large' color='facebook'>
									<Icon name='facebook' /> Facebook
								</Button>
							</Grid.Column>
							<Grid.Column>
								<Button size='large' color='google plus'>
									<Icon name='google plus' /> Google+
								</Button>
							</Grid.Column>
						</Grid>
					</Form>
				</Container>
			</div>
		);
	}
}
