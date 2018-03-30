import React, { Component } from 'react';
import Menu from './Menu';
import PageAbout from './PageAbout';
import PageAuthentication from './PageAuthentication';
import PageLogin from '../containers/PageLogin';
import PageRegistration from '../containers/PageRegistration';
import PageMap from '../containers/PageMap';
import PageUsersList from '../containers/PageUsersList';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../history';

class App extends Component {
	state = {
		isAuthenticated: false
	};

	auth = () => {
		this.setState({ isAuthenticated: true });
	};

	render() {
		return (
			<div>
				<Router history={history}>
					<div>
						<Menu isAuthenticated={this.state.isAuthenticated} />
						<Switch>
							<Route exact path="/" component={PageUsersList} />
							{this.state.isAuthenticated ? (
								<Route path="/map" component={PageMap} />
							) : (
								<Route path="/authentication" component={PageAuthentication} />
							)}
							<Route path="/about" component={PageAbout} />
							<Route path="/login" render={() => <PageLogin auth={this.auth} />} />
							<Route
								path="/registration"
								render={() => <PageRegistration auth={this.auth} />}
							/>
							<Route
								render={() => (
									<h1 style={{ paddingTop: '45vh', textAlign: 'center' }}>
										Page not found :(
									</h1>
								)}
							/>
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
