import React from 'react';
import './App.css';
// import {inject, observer} from 'mobx-react'
import { inject, observer } from 'mobx-react';

@inject('count')
@observer

class App extends React.Component {
  changeCount(type) {
    let { count } = this.props;
    count.autoAdd(type);
  }
  render() {
    console.log(this.props)
    let { count } = this.props;
    return (
      <div className="wrapper">
        <header className="header"></header>
        <section>
          这就是一个页面
          试试mobx <br />
          <button onClick={()=>this.changeCount('+')}>+</button>
          <p>{count.count}</p>
          <button onClick={()=>this.changeCount('-')}>-</button>
        </section>
        <footer></footer>
      </div>
    );
  }
}

export default App;
