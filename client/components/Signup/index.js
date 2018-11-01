import React, { Component } from 'react';
import axios from 'axios';
import { Button, Container, Divider, Form, Grid, Header, Icon, Message } from 'semantic-ui-react';
import './index.css';

export default class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			showPassword: false,
			showError: false,
			showSuccess: false,
			resMsg: ''
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
					if(res.data.error) {
						this.setState({ showError: true, resMsg: res.data.error, email: '', password: '' });
						setTimeout(() => {
							this.setState({ showError: false });
						}, 3000);
					}
					else if(res.data.success) {
						this.setState({ showSuccess: true, resMsg: res.data.success, firstName: '', lastName: '', email: '', password: '' });
						setTimeout(() => {
							this.setState({ showSuccess: false });
						}, 3000);
					}
				});
		}
	}

	render() {
		let msg;
		if(this.state.showSuccess) msg = <Message success header={this.state.resMsg} />;
		else if(this.state.showError) msg = <Message negative header={this.state.resMsg} />;
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
						<Form.Button size='large' color='blue'>Submit</Form.Button>
					</Form>
				</Container>
				{msg}
			</div>
		);
	}
}
