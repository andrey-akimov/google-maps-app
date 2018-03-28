import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const PageLogin = () => {
	function loginHandler() {
		console.log('loginHandler');
	}

	function loginInpHandler(val) {
		console.log(val);
	}

	function passwordInpHandler(val) {
		console.log(val);
	}

	return (
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
						Log-in to your account
					</Header>
					<Form size="large">
						<Segment stacked>
							<Form.Input
								fluid
								icon="user"
								iconPosition="left"
								placeholder="Login"
								onChange={e => loginInpHandler(e.target.value)}
							/>
							<Form.Input
								fluid
								icon="lock"
								iconPosition="left"
								placeholder="Password"
								type="password"
								onChange={e => passwordInpHandler(e.target.value)}
							/>
							<Button onClick={loginHandler} primary fluid size="large">
								Login
							</Button>
						</Segment>
					</Form>
					<Message>
						New to us? <Link to="/registration">Sign Up</Link>
					</Message>
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default PageLogin;
