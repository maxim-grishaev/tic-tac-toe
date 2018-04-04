import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import MainPage from './MainPage';
import SecondPlayerPage from './SecondPlayerPage';
import { urls } from '../lib/urls';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path={urls.main()} component={MainPage} />
          <Route path={urls.opponent()} component={SecondPlayerPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
