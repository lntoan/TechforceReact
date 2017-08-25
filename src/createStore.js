

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import appReducer from './reducers/TechforceNavReducer';
import loginReducer from '../src/login/reducer/loginReducer';
import { AppNavigator} from '../src/containers/TechforceNavContainer'

const middleWare = global.__DEV__ ? [logger, promiseMiddleware] : [promiseMiddleware];
const logger = createLogger();

export default (initialState = {}) => (
  createStore(
    combineReducers({
      appReducer,
      loginReducer,
      nav: (state, action) => AppNavigator.router.getStateForAction(action, state)
    }),
    initialState,
    applyMiddleware(logger,thunkMiddleware)
  )
);
