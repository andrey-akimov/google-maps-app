import React, { Component } from 'react';
import {
	Button,
	Form,
	Grid,
	Header,
	Message,
	Segment,
	Loader,
	Modal,
	Icon
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../history';

class PageRegistration extends Component {
	// STATE
	state = {
		login: '',
		password1: '',
		password2: '',
		loading: false,
		userExist: false,
		modalOpen: false
	};

	checkPasswords = () => {
		return this.state.password1.length > 2 && this.state.password2.length > 2;
	};

	comparePasswords = () => {
		if (this.checkPasswords()) {
			return this.state.password1 !== this.state.password2;
		}
	};

	checkLogin = () => {
		return this.state.login.length > 2;
	};

	// HANDLERS
	closeHandler = () => this.setState({ modalOpen: false });
	loginHandler = e => {
		this.setState({ login: e.target.value });
	};

	password1Handler = e => {
		this.setState({ password1: e.target.value });
	};

	password2Handler = e => {
		this.setState({ password2: e.target.value });
	};

	submitHandler(e) {
		e.preventDefault();
		const { login, password1: password } = this.state;
		if (!this.comparePasswords() && this.checkLogin()) {
			this.setState({ loading: true });
			axios
				.post('/registration', {
					login,
					password
				})
				.then(res => {
					if (res.data.res === 'saved') {
						localStorage.setItem('jwt', res.data.authorization);
						this.props.getLogin(res.data.login);
						this.props.auth();
						history.push('/map');
					} else {
						this.setState({
							loading: false,
							userExist: true,
							modalOpen: true
						});
					}
				})
				.catch(err => console.log(err));
		}
	}

	// RENDER
	render() {
		return this.state.loading ? (
			// LOADER
			<Loader style={{ marginTop: '50vh' }} size="huge" active inline="centered" />
		) : (
			// PAGE CONTENT
			<div className="login-form">
				<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
					<Grid.Column style={{ maxWidth: 450 }}>
						<Header as="h2" color="teal" textAlign="center">
							Register new account
						</Header>
						<Form size="large">
							<Segment stacked>
								<Form.Input
									fluid
									icon="user"
									iconPosition="left"
									placeholder="Login"
									defaultValue={this.state.login}
									onChange={e => this.loginHandler(e)}
								/>
								<Form.Input
									fluid
									icon="lock"
									iconPosition="left"
									placeholder="Password"
									type="password"
									defaultValue={this.state.password1}
									onChange={e => this.password1Handler(e)}
									error={this.comparePasswords()}
								/>
								<Form.Input
									fluid
									icon="lock"
									iconPosition="left"
									placeholder="Password"
									type="password"
									defaultValue={this.state.password2}
									onChange={e => this.password2Handler(e)}
									error={this.comparePasswords()}
								/>
								<Button
									onClick={e => this.submitHandler(e)}
									secondary
									fluid
									size="large"
								>
									Registration
								</Button>
							</Segment>
						</Form>

						{/* MESSSAGES */}
						<Message>
							Are you already registered? <Link to="/login">Login</Link>
						</Message>
						{this.checkLogin() ? (
							<Message color="green">Ok</Message>
						) : (
							<Message color="red">
								Login and password must be more than 2 characters
							</Message>
						)}
					</Grid.Column>
				</Grid>

				{/* MODAL */}
				{this.state.userExist ? (
					<Modal
						open={this.state.modalOpen}
						onClose={this.closeHandler}
						basic
						size="small"
						style={{ paddingTop: '40vh', margin: '0 auto 0 auto', marginTop: '0' }}
					>
						<Header icon="close" content="Try another login" style={{ color: 'red' }} />
						<Modal.Content>
							<h2>
								A user with the login{' '}
								<b style={{ color: 'red' }}>{this.state.login}</b> already exist
							</h2>
						</Modal.Content>
						<Modal.Actions>
							<Button color="green" onClick={this.closeHandler} inverted>
								<Icon name="checkmark" /> Got it
							</Button>
						</Modal.Actions>
					</Modal>
				) : null}
			</div>
		);
	}
}

export default PageRegistration;
