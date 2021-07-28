import {createStore,combineReducers , applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../Reducers/authReducer';
import { NoteReducer } from '../Reducers/NoteReducer';
import { uiReducer } from '../Reducers/ui.Reducer';

const reducer = combineReducers({
    auth: authReducer,
    ui:uiReducer,
    notes:NoteReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export const store = createStore(
    reducer,
    composeEnhancers( applyMiddleware(thunk) )
    );