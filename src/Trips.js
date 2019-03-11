import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
import { Link } from 'react-router-dom'

class Trips extends Component {
  constructor () {
    super()

    this.state = {
      trips: null
    }
  }

  componentDidMount () {
    axios({
      url: apiUrl + '/trips',
      method: 'get',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(response => this.setState({ trips: response.data.trips }))
      .catch(console.error)
  }

  render () {
    console.log('hi')
    if (!this.state.trips) {
      return (
        <center>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </center>
      )
    }

    return (
      <Fragment>
        {this.state.trips.map(trip => (
          <div key={trip.id}>
            <h1><Link to={`/trips/${trip.id}`} user={this.props.user} trip={trip}>{trip.name}</Link></h1>
            <p>{trip.origin} to {trip.destination}.</p>
            <p>{trip.distance} total distance.</p>
          </div>
        ))}
      </Fragment>
    )
  }
}

export default Trips
