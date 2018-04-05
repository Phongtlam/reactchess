import { getType } from 'typesafe-actions';
import { counterAction, counterActions } from '@App/store/actions/counter/counterActions';
import initialState from '@App/store/reducers/initialState';

export type CounterState = Readonly<number>;

export default function counterReducer(state: CounterState = initialState.counter, action: counterAction) {
  switch (action.type) {
    case getType(counterActions.add):
      return state + action.value;
    default:
      return state;
  }
}
