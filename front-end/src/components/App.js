import React from 'react';
import Menu from './Menu';
import PageAbout from './PageAbout';
import PageAuthentication from './PageAuthentication';
import PageLogin from '../containers/PageLogin';
import PageRegistration from '../containers/PageRegistration';
import PageMap from '../containers/PageMap';
import PageUsersList from '../containers/PageUsersList';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../history';

const App = () => {
	return (
		<div>
			<Router history={history}>
				<div>
					<Menu />
					<Switch>
						<Route exact path="/" component={PageUsersList} />
						<Route path="/map" component={PageMap} />
						<Route path="/authentication" component={PageAuthentication} />
						<Route path="/about" component={PageAbout} />
						<Route path="/login" component={PageLogin} />
						<Route path="/registration" component={PageRegistration} />
						<Route render={() => <h1>Page not found</h1>} />
					</Switch>
				</div>
			</Router>
		</div>
	);
};

export default App;
