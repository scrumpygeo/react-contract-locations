import React, { Component } from 'react';
import './place.css';

export class Place extends Component {
  handleClick = () => {
    this.props.selectPlace(this.props.place);
  };
  render() {
    const style = {
      backgroundImage: `url('${this.props.place.loc_image}')`
    };

    return (
      <div className='place' style={style} onClick={this.handleClick}>
        {/* <div className='place-picture' style={style}> */}
        {this.props.place.city}
        {/* </div> */}
      </div>
    );
  }
}

export default Place;
