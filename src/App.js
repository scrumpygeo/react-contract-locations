import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Place from './components/Place';
import * as locationsData from './data/locations.json';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        height: '100vh',
        width: '100%',
        latitude: 55.7803,
        longitude: -4.0629,
        zoom: 10
      },
      targetLocation: {}
    };

    // this.mapRef = React.createRef();
  }

  componentDidUpdate() {
    this.newLocation.scrollIntoView({ behavior: 'smooth' });
  }

  onViewportChange = viewport => {
    const { width, height, ...etc } = viewport;
    this.setState({ viewport: etc });
  };

  selectPlace = place => {
    let selectPlace = {
      lat: parseFloat(place.latitude),
      lng: parseFloat(place.longitude)
    };
    let newViewport = {
      height: '100vh',
      width: '100%',
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
        <div className='cards'>
          {locationsData.default.map(place => (
            <Place
              place={place}
              selectPlace={this.selectPlace}
              key={place.id}
            />
          ))}
        </div>

        <div className='mapContainer' ref={ref => (this.newLocation = ref)}>
          <ReactMapGL
            {...this.state.viewport}
            mapStyle='mapbox://styles/mapbox/outdoors-v11'
            mapboxApiAccessToken='pk.eyJ1IjoicHZhbDEiLCJhIjoiY2s3bm05dnhnMDA0NDNmcGF2cHpqNXFydCJ9.yA2nGLMoYF3NmD7sSSUI-w'
            onViewportChange={viewport => this.setState({ viewport })}
          >
            {Object.keys(this.state.targetLocation).length !== 0 ? (
              <Marker
                latitude={this.state.targetLocation.lat}
                longitude={this.state.targetLocation.lng}
              >
                <img src='location-icon.svg' className='pin' alt='pin' />
              </Marker>
            ) : (
              <div></div>
            )}
          </ReactMapGL>
        </div>
      </div>
    );
  }
}

export default App;
