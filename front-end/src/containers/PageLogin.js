import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment, Loader, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../history';

class PageLogin extends Component {
	// STATE
	state = {
		login: '',
		password: '',
		loading: false,
		error: false
	};

	// CHECK PASSWORD
	checkPasswords = () => {
		return this.state.password.length > 2;
	};

	// CHECK LOGIN
	checkLogin = () => {
		return this.state.login.length > 2;
	};

	// HANDLERS
	submitHandler = e => {
		e.preventDefault();
		const login = this.state.login;
		const password = this.state.password;
		if (this.checkPasswords() && this.checkLogin()) {
			this.setState({ loading: true });
			axios
				.post('http://localhost:8000/login', {
					login,
					password
				})
				.then(res => {
					console.log(res.data);
					res.data.res === 'ok'
						? history.push('/map')
						: this.setState({
								loading: false,
								error: true
						  });
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
