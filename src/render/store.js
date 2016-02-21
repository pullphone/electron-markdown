import { combineReducers, compose, createStore } from 'redux';
import persistState from 'redux-localstorage'

import markdownList from './reducers/markdownList';

const rootReducer = combineReducers({
  markdownList,
});

export const finalCreateStore = compose(
  persistState(['markdownList'])
)(createStore);
const store = finalCreateStore(rootReducer);

export default store;
