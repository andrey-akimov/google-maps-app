import React, { Component } from 'react';
import { Button, Form, Grid, Header, Message, Segment, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class PageRegistration extends Component {
	// STATE
	state = {
		login: '',
		password1: '',
		password2: '',
		loading: false
	};

	// CHECK PASSWORDS
	checkPasswords = () => {
		return this.state.password1.length > 2 && this.state.password2.length > 2;
	};

	// COMPARE PASSWORDS
	comparePasswords = () => {
		if (this.checkPasswords()) {
			return this.state.password1 !== this.state.password2;
		}
	};

	// CHECK LOGIN
	checkLogin = () => {
		return this.state.login.length > 2;
	};

	// HANDLERS
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
		const login = this.state.login;
		const password = this.state.password1;
		if (!this.comparePasswords() && this.checkLogin()) {
			this.setState({ loading: true });
			axios
				.post('http://localhost:8000/registration', {
					login,
					password
				})
				.then(res => {
					// return res.data !== '' ? false : true;
					this.setState({ loading: false });
					console.log(res.data);
				})
				.catch(err => console.log(err));
		}
	}

	// RENDER
	render() {
		return this.state.loading ? (
			<Loader style={{ marginTop: '50vh' }} size="huge" active inline="centered" />
		) : (
			<div className="login-form">
				<style>{`
					body > div,
					body > div > div,
					body > div > div > div.login-form {
						height: 100%;
					}
				`}</style>
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
			</div>
		);
	}
}

export default PageRegistration;
