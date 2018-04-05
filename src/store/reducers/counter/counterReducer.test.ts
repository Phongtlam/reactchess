import counterReducer from '@App/store/reducers/counter/counterReducer';
import { counterActions } from '@App/store/actions/counter/counterActions';

describe('Counter Reducer', () => {
  it('should add 1 when passed ADD action with 1 value', () => {

    // Given
    const initialCounterState = 0;
    const action = counterActions.add(1);

    // When
    const newState = counterReducer(initialCounterState, action);

    // Then
    expect(newState).toEqual(1);

  });

  it('should add 3 when passed ADD action with 3 value', () => {

    // Given
    const initialCounterState = 0;
    const action = counterActions.add(3);

    // When
    const newState = counterReducer(initialCounterState, action);

    // Then
    expect(newState).toEqual(3);

  });
});