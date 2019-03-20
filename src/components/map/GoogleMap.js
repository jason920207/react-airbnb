import React from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { Cacher } from '../../services/cacher'

function MapComponent(props) {

  const coordinates = props.coordinates
  return(
    <GoogleMap
      defaultZoom={16}
      defaultCenter={coordinates}
      center={coordinates}
    >
      <Marker
        position={coordinates}
      />
    </GoogleMap>
  )
}

function withGeocode(WrappedComponent) {
    return class extends React.Component {
      constructor() {
        super()
        this.cacher = new Cacher()
        this.state={
          coordinates:{
            lat:0,
            lng:0
          }
        }
      }

      componentWillMount() {
        this.geocodeLocation()
      }

      geocodeLocation() {
        const location = this.props.location
        const geocoder = new window.google.maps.Geocoder()

        if (this.cacher.isValueCached(location)) {
          this.setState({coordinates: this.cacher.getCachedValue(location)})
        } else {
          geocoder.geocode({address: location},(result, status)=>{
            if(status==='OK') {
              const geometry= result[0].geometry.location
              const coordinates = { lat:geometry.lat(),lng: geometry.lng()}
              this.cacher.cacheValue(location,coordinates)
              this.setState({coordinates})
            }
          })
        }
      }
      render() {
        return(
          <WrappedComponent {...this.state}/>
        )
      }
    }

}

export const MapWithGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent)));
