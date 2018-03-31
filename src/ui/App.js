import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import MainPage from './MainPage';
import SecondPlayerPage from './SecondPlayerPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={MainPage} />
          <Route path="/:player" component={SecondPlayerPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
