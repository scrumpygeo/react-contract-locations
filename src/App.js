import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import './App.css';

class App extends Component {
  state = {
    viewport: {
      width: '40vw',
      height: '100vh',
      latitude: 55.7803,
      longitude: -4.0629,
      zoom: 10
    }
  };
  render() {
    return (
      <div className='res-container'>
        <div className='main'>
          <div className='cards'></div>
        </div>
        <div className='mapContainer'></div>
      </div>
    );
  }
}

export default App;
