import { applyMiddleware, compose, createStore, GenericStoreEnhancer } from 'redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { rootReducer, RootState } from '@App/store/reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: () => undefined;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (arg: GenericStoreEnhancer) => undefined;
  }
}

export const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState?: RootState) {
  return createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
  );
}