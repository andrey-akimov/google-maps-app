import React from 'react';
import { Segment, Button, Divider, Grid } from 'semantic-ui-react'
import Login from './Login';
import Registration from './Registration';

const PageAuthentication = () => {
    return (
        <Grid verticalAlign='middle' columns={4} centered>
            <Grid.Row>
                <Grid.Column>
                        <Segment padded>
                            <Button primary fluid>Login</Button>
                            <Divider horizontal>Or</Divider>
                            <Button secondary fluid>Sign Up Now</Button>
                        </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default PageAuthentication;