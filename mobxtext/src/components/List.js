import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('index')
@observer

class List extends React.Component {
  componentDidMount() {
  }
  showSlide(id) {
    let { index } = this.props;
    console.log(this.props,'this.props')
    index.getSlideData(id);
    index.slideShow = true;
    console.log(index.slideData,index.slideShow,'a')
  }
  render() {
    let { data } = this.props;
    return (
      <ul>
        {
          data.map((val, key) => (
            <li key={key} onClick={()=>this.showSlide(val.MasterID)}>
              <p><img src={val.CoverPhoto} alt="" /></p>
              <span>{val.Name}</span>
            </li>
          ))
        }
      </ul>
    )
  }
}

export default List;