import React from 'react';
import './App.scss';
import { inject, observer } from 'mobx-react';
import List from '../components/List'

@inject('count', 'index')
@observer

class App extends React.Component {
  changeCount(type) {
    let { count } = this.props;
    count.autoAdd(type);
  }
  componentDidMount() {
    let { index } = this.props;
    index.getAllData();
  }
  scrollTo(item) {
    // 对应id的话, 滚动到相应位置
    if (!!item) {
      let itemElement = this.refs[item];
      if (itemElement) {
        window.scrollTo(0, itemElement.offsetTop+334 - window.innerHeight / 2);
      }
    }
  }

  render() {
    let { index } = this.props;
    return (
      <div className="wrapper">
        <section>
          <div className="cont">
            {
              index.allData && Object.keys(index.allData).map((item, ind) => (
                <div className="content" id={item} key={ind} ref={item}>
                  <p>{item}</p>
                  <List data={index.allData[item]} />
                </div>
              ))
            }
          </div>
          <div className="right">
            {
              index.dataRight && index.dataRight.map((item, ind) => (
                <span key={ind} onClick={()=>this.scrollTo(item)}>{item}</span>
              ))
            }
          </div>
          <aside className="slide">
            
          </aside>
        </section>
      </div>
    );
  }
}

export default App;
