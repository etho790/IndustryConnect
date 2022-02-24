import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Customer } from './components/Customer';
import { Counter } from './components/Counter';
import './custom.css'
import { Product } from './components/Product';
import { Store } from './components/Store';


export default class App extends Component {
  static displayName = App.name;
    
  //here we specify what components these exact path "strings" open up

  render () {
    return (
      <Layout>
        <Route exact path='/Home' component={Home} />
        
            <Route path='/Customer' component={Customer} />
            <Route path='/Product' component={Product} />
            <Route path='/Store' component={Store} />
      </Layout>
    );
  }
}
