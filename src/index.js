//  lib
import React from 'react';
import { Redirect, Router, Route, Switch } from 'react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

//  src
import history from './utils/history';
import configureStore from './redux/store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import Home from './components/Home';
import Search from './components/Search';
import BookView from './components/BookView';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search/:query" component={Search} />
          <Route path="/book/:id" component={BookView} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
