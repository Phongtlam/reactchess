import * as React from 'react';
import * as css from './App.css';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '@App/store';
import { RootState } from '@App/store/reducers';
import { connect, Dispatch } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { counterActions } from '@App/store/actions/counter/counterActions';
import { MouseEvent } from 'react';
const logo = require('./logo.svg');
interface AppProps {

}

interface AppProps {
  counter: Readonly<number>;
  actions: {
    add: (n: number) => void
  };
}

interface AppState {

}

class App extends React.Component<AppProps, AppState> {
  public constructor(props: AppProps, context: object) {
    super(props, context);

    this.onButtonClick = this.onButtonClick.bind(this);
  }

  protected onButtonClick(e: MouseEvent<HTMLButtonElement>) {
    this.props.actions.add(1);
  }

  public render() {
    return (
      <ConnectedRouter history={history}>
        <div className={css.App}>
          <header className={css.appHeader}>
            <img src={logo} className={css.appLogo} alt="logo"/>
            <h1 className={css.appTitle}>Welcome to React</h1>
          </header>
          <p className={css.appIntro}>
            To get started, edit <code>src/app/App.tsx</code> and save to reload.
          </p>
          <button className={css.button} onClick={this.onButtonClick}>Click to test ACTION</button>
          <span className={css.counter}>{this.props.counter}</span>
        </div>
      </ConnectedRouter>
    );
  }
}

function mapStateToProps(state: RootState, ownProps: object) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch: Dispatch<RootState>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject>(counterActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);