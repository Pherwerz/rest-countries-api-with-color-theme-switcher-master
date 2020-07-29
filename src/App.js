import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';

class App extends Component {
  state = {
    theme: 'dark',
    icon: 'fill'
  };

  clicked = () => {
    this.setState({
      theme: this.state.theme === 'dark' ? 'light' : 'dark',
      icon: this.state.icon === 'fill' ? 'stroke' : 'fill'
    });
  };

  render() {
    return (
      <div className="App" data-theme={this.state.theme}>
        <Layout
          icon={this.state.icon}
          clicked={this.clicked}
        />
      </div>
    );
  }
}

export default App;
