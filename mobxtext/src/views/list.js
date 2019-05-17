import React from 'react';
import './App.css';
import { inject, observer } from 'mobx-react';

@inject('count', 'index')
@observer

class List extends React.Component {
  render() {
    let { count, index } = this.props;
    return (
      <div>
        {
          index.data && index.data.map((item, ind) => (
            <div key={ind}>
              <p><img src={item.CoverPhoto} alt="" /></p>
              <span>{item.Name}</span>
            </div>
          ))
        }
      </div>
    )
  }
}

export default List;