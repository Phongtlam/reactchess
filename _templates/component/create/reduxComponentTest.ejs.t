---
to: src/__tests__/components/<%= name %>.test.tsx
---
import * as React from 'react';<% var componentName = name.split('/').slice(-1)[0] %>
import * as ReactDOM from 'react-dom';
import <%= componentName %> from '@App/components/<%= name %>';<% if(type == 'stateful-redux'){ %>
import { Provider } from 'react-redux';
import configureStore from '@App/store';

export const store = configureStore();<% } %>

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <% if(type == 'stateful-redux'){ %><Provider store={store}><% } %><<%= componentName %> /><% if(type == 'stateful-redux'){ %></Provider><% } %>
    ,
    div);
});