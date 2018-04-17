import { combineReducers } from 'redux';
import { RouterState } from 'connected-react-router';
import { tictactoeReducer } from '@App/store/reducers/tictactoe/tictactoeReducer';

export type RootState = Readonly<{
  router: RouterState;
  tictactoe;
}>;

export const rootReducer = combineReducers<RootState>({
  tictactoe: tictactoeReducer
  }
);

// export const rootReducer = (state, action) => {
//   if ( action.type === 'RESET_GAME') {
//     console.log('in root reset');
//     state = undefined;
//   }
//   console.log('what is state', state);
//   return appReducer(state, action);
// };