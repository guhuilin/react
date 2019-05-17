import React from 'react';
import './App.scss';
import { inject, observer } from 'mobx-react';

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
  render() {
    let { index } = this.props;
    return (
      <div className="wrapper">
        <section>
          <div className="cont">
            {
              index.allData && Object.keys(index.allData).map((item, ind) => (
                <div className="content" key={ind}>
                  <p>{item}</p>
                  <ul>
                    {
                      index.allData[item].map((val,key)=>(
                        <li key={key}>
                          <p><img src={val.CoverPhoto} alt="" /></p>
                          <span>{val.Name}</span>
                        </li>
                      ))
                    }
                  </ul>
                </div>
                
              ))
            }
          </div>
          <div className="right">
            {
              index.dataRight && index.dataRight.map((item, ind) => (
                <span key={ind}>{item}</span>
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
