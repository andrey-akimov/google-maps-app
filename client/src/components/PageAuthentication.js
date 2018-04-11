import React from 'react';
import { Segment, Button, Divider, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const PageAuthentication = () => {
	return (
		<Grid verticalAlign="middle" columns={4} centered>
			<Grid.Row>
				<Grid.Column>
					<Segment padded>
						<Link to="/login">
							<Button primary fluid>
								Login
							</Button>
						</Link>
						<Divider horizontal>Or</Divider>
						<Link to="/registration">
							<Button secondary fluid>
								Sign Up Now
							</Button>
						</Link>
					</Segment>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default PageAuthentication;
