import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Button, Container, Divider, Form, Grid, Icon, Image, Segment } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ImageUploader from 'react-images-upload';
import dp from './dp2.jpg'

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			changedUsername: '',
			changedPassword: '',
			changePicture: false,
			changedPicture: [],
			picture: dp
		}
	}

	handleChange = (event, { value }) => {

	}

	onDrop = (picture) => {
		this.setState({ changedPicture: this.state.changedPicture.concat(picture), changePicture: false });
	}

	changePicture = () => { this.setState({ changePicture: true }) }

	render() {
		let Image;
		// if(!this.state.changePicture) {
			Image = <Image src={this.state.picture} circular size='small'/>;
		// } else {
		// 	Image =
		// 		<ImageUploader
		// 			withIcon={true}
		// 			buttonText='Upload Image'
		// 			onChange={this.onDrop}
		// 			imgExtension={['.jpg', '.png']}
		// 			maxFileSize={5242880}
		// 			singleImage={true}
		// 			fileSizeError='Image is either too big or not a supported format'
		// 		/>;
		// }
		return (
			<Container fluid>
				<Segment>
					<Grid columns={2}>
						<Grid.Row>
							<Grid.Column mobile={8} tablet={8} computer={8}>
								{ Image }
							</Grid.Column>
							<Grid.Column mobile={8} tablet={8} computer={8}>
								<Form>
									<Form.Input fluid value={this.state.username} onChange={this.handleChange} name='username' label='Username' />
									<Form.Input fluid value={this.state.password} onChange={this.handleChange} type='password' name='password' label='Password' />
									<div className='field'>
										<label>Date of Birth</label>
										<DatePicker onChange={this.handleDate} selected={this.state.eventDate} />
									</div>
								</Form>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
			</Container>
		);
	}
}
