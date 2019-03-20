import React, { Component } from 'react'
import { MapWithGeocode } from '../map/GoogleMap';

class RentalMap extends Component {

  render () {
    const location = this.props.location

    return(
      <MapWithGeocode
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAvdlALqHeitBXQa71P48T2p9-0K6v-Uio&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        location={location}
      />
    )
  }
}

export default RentalMap
