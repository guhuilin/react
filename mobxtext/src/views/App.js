import React from 'react';
import './App.css';
import {inject, observer} from 'mobx-react'


@inject('count')
@observer
class App extends React.Component {
  render() {
    console.log(this.props,'...')
    return (
      <div className="wrapper">
        <header className="header"></header>
        <section>
          这就是一个页面
          试试mobx <br />
          <button>+</button>
          <p>1000</p>
          <button>-</button>
        </section>
        <footer></footer>
      </div>
    );
  }
}

export default App;
