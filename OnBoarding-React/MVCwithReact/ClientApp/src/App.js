import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Customer } from './components/Customer';
import { Counter } from './components/Counter';
import './custom.css'


export default class App extends Component {
  static displayName = App.name;
    
  //here we specify what components these exact path "strings" open up

  render () {
    return (
      <Layout>
        <Route exact path='/Home' component={Home} />
         <Route path='/counter' component={Counter} />  
            <Route path='/Customer' component={Customer} />
      </Layout>
    );
  }
}
