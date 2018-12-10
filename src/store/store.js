import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import promise from 'redux-promise-middleware';
import reducer from '../reducer/index';

const middleware = applyMiddleware(thunk, createLogger(), promise());

export default createStore(reducer, middleware);
