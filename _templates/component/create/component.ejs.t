---
to: src/components/<%= name %>.tsx
---
import * as React from 'react';<% var componentName = name.split('/').slice(-1)[0] %><% if(type == 'stateless'){ %>

interface <%= componentName %>Props {
}

const <%= componentName %>: React.SFC<<%= componentName %>Props> = (props) => {
  return <div><%= componentName %></div>;
};

export default <%= componentName %>;<% } else{ %><% if(type == 'stateful-redux'){ %>
import { RootState } from '@App/store/reducers';
import { allActions } from '@App/store/actions';
import { connect, Dispatch } from 'react-redux';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';<% } %>
interface <%= componentName %>Props {<% if(type == 'stateful-redux'){ %>
  state: Readonly<RootState>;
  actions: ActionCreatorsMapObject;<% } %>
}

interface <%= componentName %>State {
}

<% if(type == 'stateful'){ %>export default <% } %>class <%= componentName %> extends React.Component<<%= componentName %>Props, <%= componentName %>State> {
  public constructor(props: <%= componentName %>Props, context: object) {
    super(props, context);
  }

  public render() {
    return (
      <div><%= componentName %></div>
    );
  }
}<% if(type == 'stateful-redux'){ %>
function mapStateToProps(state: RootState, ownProps: object) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch: Dispatch<RootState>) {
  return {
    actions: bindActionCreators<ActionCreatorsMapObject>(allActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(<%= componentName %>);<% } %><% } %>
