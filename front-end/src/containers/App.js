import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Menu from '../components/Menu';
import PageAbout from '../components/PageAbout';
import PageAuthentication from '../components/PageAuthentication';
import PageLogin from './PageLogin';
import PageRegistration from './PageRegistration';
import PageMarkers from './PageMarkers';
import PageUsersList from './PageUsersList';
import history from '../history';

class App extends Component {
	state = {
		isAuthenticated: false,
		login: ''
	};

	auth = (option = true) => {
		this.setState({ isAuthenticated: option });
	};

	getLogin = login => {
		this.setState({ login });
	};

	render() {
		return (
			<div>
				<Router history={history}>
					<div>
						<Menu {...this.state} auth={this.auth} />
						<Switch>
							<Route exact path="/" component={PageUsersList} />
							{/* CHECK AUTHENTICATION */}
							{this.state.isAuthenticated ? (
								<Route path="/map" component={PageMarkers} />
							) : (
								<Route path="/authentication" component={PageAuthentication} />
							)}
							<Route path="/about" component={PageAbout} />
							<Route
								path="/login"
								render={() => (
									<PageLogin auth={this.auth} getLogin={this.getLogin} />
								)}
							/>
							<Route
								path="/registration"
								render={() => (
									<PageRegistration auth={this.auth} getLogin={this.getLogin} />
								)}
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
