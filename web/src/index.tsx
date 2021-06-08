import React from 'react';
import ReactDOM from 'react-dom';
import {Routes} from './Routes';
import ApolloClient from "apollo-boost"
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri:"https://4000-aqua-condor-pyslmaev.ws-us08.gitpod.io/graphql",
  credentials:'include'
})

ReactDOM.render(
  // @ts-ignore
  <ApolloProvider client={client}>
      <Routes />
  </ApolloProvider>,
  document.getElementById('root')
);


