//  lib
import React from 'react';
import { Redirect, Router, Route, Switch } from 'react-router';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

//  src
import history from '../src/utils/history';
import configureStore from './redux/store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import Header from './components/Header';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Header />
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={SearchBar} />
          <Route exact path="/search/:query" component={BookList} />
          <Route exact path="/book/:id" component={BookDetails} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
