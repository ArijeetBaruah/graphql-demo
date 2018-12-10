import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './container/Home';
import store from './store';
import Book from './container/book';
import Authors from './container/Authors';
import Author from './container/Author';

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={Home}
          />
        <Route
          path="/authors"
          component={Authors}
          />
        <Route
          path="/book/:id"
          component={(props) => {
            const { match, history } = props;
            return (
              <Book
                id={match.params.id}
                goBack={history.goBack}
                />
            );
          }}
          />
        <Route
          path="/author/:id"
          component={(props) => {
            const { match, history } = props;
            return (
              <Author
                id={match.params.id}
                goBack={history.goBack}
                />
            );
          }}
          />
      </Switch>
    </Router>
  </Provider>
);

export default App;
