import { combineReducers } from 'redux';
import { RouterState } from 'connected-react-router';
import { default as counterReducer, CounterState } from '@App/store/reducers/counter/counterReducer';

export type RootState = Readonly<{
  router: RouterState;
  counter: CounterState;
}>;

export const rootReducer = combineReducers<RootState>({
  counter: counterReducer
  }
);