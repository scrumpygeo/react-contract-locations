import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
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
      targetLocation: {},
      selectedSite: {},
      showPopup: true,
      currentKey: ''
    };
  }

  escFunction = event => {
    if (event.keyCode === 27) {
      this.setState({ showPopup: false });
    }
  };

  componentDidUpdate() {
    this.newLocation.scrollIntoView({ behavior: 'smooth' });
  }

  componentDidMount() {
    document.addEventListener('keyup', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.escFunction, false);
  }

  onViewportChange = viewport => {
    const { width, height, ...etc } = viewport;
    this.setState({ viewport: etc });
  };

  selectPlace = place => {
    let selectPlace = {
      lat: parseFloat(place.latitude),
      lng: parseFloat(place.longitude),
      company: place.company,
      skillset: place.skillset
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

  setSelectedPlace = target => {
    // if (target) {
    let setSelectedPlace = {
      lat: target.lat,
      lng: target.lng,
      company: target.company,
      skillset: target.skillset
    };

    this.setState({
      selectedSite: setSelectedPlace,
      showPopup: true
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
                <button
                  className='marker-btn'
                  onClick={e => {
                    this.setSelectedPlace(this.state.targetLocation);
                  }}
                >
                  <img src='location-icon.svg' className='pin' alt='pin' />
                </button>
              </Marker>
            ) : (
              <div></div>
            )}

            {Object.keys(this.state.selectedSite).length !== 0 &&
            this.state.showPopup ? (
              <Popup
                longitude={this.state.selectedSite.lng}
                latitude={this.state.selectedSite.lat}
                closeButton={true}
                closeOnClick={true}
                onClose={() => this.setState({ showPopup: false })}
              >
                <div className='popup'>
                  <h3>{`${this.state.selectedSite.company} `}</h3>
                  <p>{`${this.state.selectedSite.skillset} `}</p>
                </div>
              </Popup>
            ) : null}
          </ReactMapGL>
        </div>
      </div>
    );
  }
}

export default App;
