import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../reducer'
import thunk from 'redux-thunk';

const enhancer = compose(applyMiddleware(thunk));

const store = createStore(reducer, {}, enhancer);

window.store = store;
export default store