import React, { Component } from 'react';
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';

export class App extends Component {
  render() {
    return (
        <Layout>
          {this.state.show ? <BurgerBuilder/> : null}
        </Layout>
       
    )
  }
}

export default App;
