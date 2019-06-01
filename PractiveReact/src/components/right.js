import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Right extends Component {
  static defaultProps = {
    data: this.props ? this.props : 'aaa'
  }
  render() {
    let { data } = this.props;
    console.log(data)
    return (
      <div className="rightcont">
        {
          data.spuList && data.spuList.map((item, index) => (
            <dl key={index}>
              <dt>
                <img src={item.bigImageUrl} alt=""/>
              </dt>
              <dd>
                <h3>{item.spuName}</h3>
              </dd>
            </dl>
          ))
        }
      </div>
    )
  }
}
Right.propTypes = {
  data: PropTypes.object
}

export default Right;
