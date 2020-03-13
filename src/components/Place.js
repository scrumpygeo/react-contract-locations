import React, { Component } from 'react';
import './place.css';

export class Place extends Component {
  render() {
    const style = {
      backgroundImage: `url('${this.props.place.loc_image}')`
    };

    return (
      <div className='place' onClick={this.handleClick}>
        <div className='place-picture' style={style}>
          {this.props.place.city}
        </div>
      </div>
    );
  }
}

export default Place;
