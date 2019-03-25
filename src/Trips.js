import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

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
    const { trips } = this.state
    const { user } = this.props

    if (!trips) {
      return (
        <center>
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </center>
      )
    }

    if (trips.length < 1) {
      return (
        <React.Fragment><center>
          <p className="no-trips">Oops!</p>
          <p>You have no trips yet.<br /></p>
          <Link to="/trip-create" user={user}><Button>Create one now!</Button></Link>
        </center>
        </React.Fragment>
      )
    }

    return (
      <div>
        {trips.map(trip => (
          <div className="trip-card container" key={trip.id}>
            <h1><Link to={`/trips/${trip.id}`} user={user} trip={trip}>{trip.name}</Link></h1>
            <p>{trip.origin} to {trip.destination}.</p>
          </div>
        ))}
      </div>
    )
  }
}

export default Trips
