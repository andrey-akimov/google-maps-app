import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment, Loader, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../history';

class PageLogin extends Component {
	state = {
		login: '',
		password: '',
		loading: false,
		error: false
	};

	checkPasswords = () => {
		return this.state.password.length > 2;
	};

	checkLogin = () => {
		return this.state.login.length > 2;
	};

	// HANDLERS
	submitHandler = e => {
		e.preventDefault();
		const { login, password } = this.state;
		if (this.checkPasswords() && this.checkLogin()) {
			this.setState({ loading: true });
			axios
				.post('/login', {
					login,
					password
				})
				.then(res => {
					if (res.data.res === 'ok') {
						localStorage.setItem('jwt', res.data.authorization);
						this.props.getLogin(res.data.login);
						this.props.auth();
						history.push('/map');
					} else {
						this.setState({
							loading: false,
							error: true
						});
					}
				})
				.catch(err => console.log(err));
		}
	};
	loginHandler = val => {
		this.setState({ login: val.target.value });
	};
	passwordHandler = val => {
		this.setState({ password: val.target.value });
	};

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
							Log-in to your account
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
									defaultValue={this.state.password}
									onChange={e => this.passwordHandler(e)}
								/>
								<Button
									onClick={e => this.submitHandler(e)}
									primary
									fluid
									size="large"
								>
									Login
								</Button>
							</Segment>
						</Form>
						<Message>
							New to us? <Link to="/registration">Sign Up</Link>
						</Message>
						{/* ERROR MESSAGE */}
						{this.state.error ? (
							<Message color="red">
								<Icon name="attention" />
								<b>Incorrect login or password</b>
							</Message>
						) : null}
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export default PageLogin;
