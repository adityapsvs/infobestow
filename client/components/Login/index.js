import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Divider, Form, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import './index.css';
import Signup from '../Signup';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			showError: false,
			showSignup: false
		}

		this.toggleSignup = () => {
			this.setState({ showSignup: true });
		}

		this.handleChange = (event) => {
			switch(event.target.name) {
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

		this.handleSubmit = () => {
			console.log('yo')
		}

		this.getLoginForm = () => {
			return (
				<Form onSubmit={this.handleSubmit} size='large' hidden={this.state.showSignup}>
					<Form.Input fluid value={this.state.email} onChange={this.handleChange} name='email' label='EMAIL' />
					<Form.Input fluid value={this.state.password} onChange={this.handleChange} name='password' type='password' label='PASSWORD' />
					<Grid columns={2}>
						<Grid.Column>
							<Form.Button size='large' color='blue'>Submit</Form.Button>
						</Grid.Column>
						<Grid.Column>
							<Button size='large' color='teal' onClick={this.toggleSignup}>
								Signup
							</Button>
						</Grid.Column>
					</Grid>
				</Form>
			);
		}

		this.getSignupForm = () => {
			return <Signup />;
		}
	}

	render() {
		let form = this.getLoginForm();
		if(this.state.showSignup) form = this.getSignupForm();
		else form = this.getLoginForm();
		return (
			<div>
				<Divider hidden />
				<Divider hidden />
				<Header size='huge' align='center'>InfoBestow</Header>
				<Header as='h3' align='center'>A place to share knowledge and better understand the world.</Header>
				<div className='login-form'>
					<Container>
						<Grid columns={3} width='equal'>
							<Grid.Column>
								<form />
								<Divider vertical hidden />
							</Grid.Column>
							<Grid.Column>
								<Divider vertical>Or</Divider>
							</Grid.Column>
							<Grid.Column>
								<Header as='h3' align='center'>Use your social media handles</Header>
								<Grid.Row align='center'>
									<Button size='large' color='facebook'>
										<Icon name='facebook' /> Facebook
									</Button>
								</Grid.Row>
								<Divider hidden />
								<Grid.Row align='center'>
									<Button size='large' color='google plus'>
										<Icon name='google plus' /> Google +
									</Button>
								</Grid.Row>
							</Grid.Column>
						</Grid>
					</Container>
				</div>
			</div>
		);
	}
}
