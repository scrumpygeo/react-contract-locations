# Introduction

also viewable on:

https://react-contract-locations.herokuapp.com/

Basic exercise in using React with Mapbox: react-map-gl.

Uses json with data relating to some of my past ERP consulting locations.

Idea is user clicks on image in panel and map on right centres on site location.

**Points of interest:**

1.<u>**Handling Key Events:**</u>

- close popup with escape key (27):

- In state: currentKey: ''
- add event listener in componentDidMount
- remove event listener in componentWillUnmount to prevent potential errors and memory leaks:

```
  componentDidMount() {
    document.addEventListener('keyup', this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.escFunction, false);
  }

```

- write routine for escape function which sets showPopUp to false:

```
    escFunction = event => {
        if (event.keyCode === 27) {
        this.setState({ showPopup: false });
        }
    };
```
