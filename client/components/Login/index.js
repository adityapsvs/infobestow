import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Button, Container, Divider, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import './index.css';
import Signup from '../Signup';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			showError: false,
			showSignup: false,
			showSuccess: false,
			resMsg: '',
			redirect: false
		}
	}

	showSignup = () => {
		this.setState({ showSignup: true });
	}

	showLogin = () => {
		this.setState({ showSignup: false });
	}

	handleChange = (event) => {
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

	handleSubmit = (event) => {
		event.preventDefault();
		let {showError, showSignup, ...state} = this.state;
		axios
		.post('/login', state)
		.then(res => {
			if(res.data.error) {
				this.setState({ showError: true, resMsg: res.data.error, password: '' });
				setTimeout(() => {
					this.setState({ showError: false });
				}, 3000);
			}
			else if(res.data.success) {
				// this.setState({ showSuccess: true, resMsg: res.data.success });
				// setTimeout(() => {
				// 	this.setState({ showSuccess: false });
				// }, 3000);
				this.setState({ redirect: true });
			}
		});
	}

	getLoginForm = () => (
		<Form onSubmit={this.handleSubmit} size='large' hidden={this.state.showSignup}>
			<Form.Input fluid value={this.state.email} onChange={this.handleChange} name='email' label='EMAIL' />
			<Form.Input fluid value={this.state.password} onChange={this.handleChange} name='password' type='password' label='PASSWORD' />
			<Grid columns={2}>
				<Grid.Column>
					<Form.Button size='large' color='blue'>Login</Form.Button>
				</Grid.Column>
				<Grid.Column>
					<Button size='large' color='teal' onClick={this.showSignup}>
						Signup
					</Button>
				</Grid.Column>
			</Grid>
		</Form>
	);

	render() {
		let form, msg;
		if(this.state.showSignup) {
			form = <Signup showLogin={this.showLogin} />;
		} else {
			form = <this.getLoginForm />;
		}
		if(this.state.showSuccess) msg = <Message success header={this.state.resMsg} />;
		else if(this.state.showError) msg = <Message negative header={this.state.resMsg} />;
		if(this.state.redirect) return <Redirect to='/feed' />
		return (
			<Container>
				<Divider hidden />
				<Header size='huge' align='center'>InfoBestow</Header>
				<Header as='h3' align='center'>A place to share knowledge and better understand the world.</Header>
				<Divider hidden />
				<Divider hidden />
				<Divider hidden />
				<div className='form'>
					<Container>
						<Grid columns={3} width='equal'>
							<Grid.Column>
								{form}
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
									<Button size='large' color='google plus' onClick={this.googleLogin}>
										<Icon name='google plus' /> Google +
									</Button>
								</Grid.Row>
							</Grid.Column>
						</Grid>
					</Container>
					{msg}
				</div>
			</Container>
		);
	}
}
