//  lib
import React from 'react';
import { Redirect, Router, Route, Switch } from 'react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

//  src
import history from '../src/utils/history';
import configureStore from './redux/store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import AutoSuggest from './components/AutoSuggest';
import Search from './components/Search';
import BookView from './components/BookView';
import Header from './components/Header';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Header />
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={AutoSuggest} />
          <Route exact path="/search/:query" component={Search} />
          <Route exact path="/book/:id" component={BookView} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
