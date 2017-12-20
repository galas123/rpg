import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../reducer'
import thunk from 'redux-thunk';

import move from '../middlewares/move'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, move));
const store = createStore(reducer, {}, enhancer);

window.store = store;
export default store