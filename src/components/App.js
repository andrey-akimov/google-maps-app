import React from 'react';
import Header from './Header';
import PageAbout from './PageAbout';
import PageAuthentication from './PageAuthentication';
import PageProfile from './PageProfile';
import PageUsersList from './PageUsersList';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Header/>
          <Switch>
            <Route exact path='/' component={PageUsersList} />
            <Route path='/profile' component={PageProfile} />
            <Route path='/authentication' component={PageAuthentication} />
            <Route path='/about' component={PageAbout} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
