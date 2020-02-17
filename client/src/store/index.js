import { createStore, combineReducers } from 'redux';
import user from './user.reducer';
import item from './item.reducer';

let Reducer = combineReducers({user, item})
let store = createStore(Reducer);

export default store