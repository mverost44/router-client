/* global google */
import React from 'react'
const { compose, withProps, lifecycle } = require('recompose')
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} = require('react-google-maps')

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDcBawyHNF87ZUvsjU_l5xMhMPBd8m58z4&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount () {
      const DirectionsService = new google.maps.DirectionsService()

      DirectionsService.route({
        origin: this.props.origin,
        destination: this.props.destination,
        travelMode: google.maps.TravelMode.DRIVING
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          })
        } else {
          console.error(`error fetching directions ${result}`)
        }
      })
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={7}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
)

export default MapWithADirectionsRenderer
