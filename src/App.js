import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import Place from './components/Place';
import * as locationsData from './data/locations.json';
import './App.css';

class App extends Component {
  state = {
    viewport: {
      width: '40vw',
      height: '100vh',
      latitude: 55.7803,
      longitude: -4.0629,
      zoom: 10
    },
    targetLocation: {}
  };

  selectPlace = place => {
    let selectPlace = {
      lat: parseFloat(place.latitude),
      lng: parseFloat(place.longitude)
    };
    let newViewport = {
      height: '100vh',
      width: '40vw',
      latitude: parseFloat(place.latitude),
      longitude: parseFloat(place.longitude),
      zoom: 10
    };
    this.setState({
      viewport: newViewport,
      targetLocation: selectPlace
    });
  };

  render() {
    return (
      <div className='res-container'>
        <div className='main'>
          <div className='cards'>
            {locationsData.default.map(place => (
              <Place
                place={place}
                selectPlace={this.selectPlace}
                key={place.id}
              />
            ))}
          </div>
        </div>
        <div className='mapContainer'>
          <ReactMapGL
            {...this.state.viewport}
            mapStyle='mapbox://styles/mapbox/outdoors-v11'
            mapboxApiAccessToken='pk.eyJ1IjoicHZhbDEiLCJhIjoiY2s3bm05dnhnMDA0NDNmcGF2cHpqNXFydCJ9.yA2nGLMoYF3NmD7sSSUI-w'
            onViewportChange={viewport => this.setState({ viewport })}
          ></ReactMapGL>
        </div>
      </div>
    );
  }
}

export default App;
