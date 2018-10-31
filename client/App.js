import React, { Component } from 'react';
import Signup from './components/Signup';

class App extends Component {
	constructor() {
		super();
	}

  render() {
    return (
      <div>
				<Signup />
      </div>
    );
  }
}

export default App;
