import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

class Trip extends Component {
  constructor () {
    super()

    this.state = {
      trip: null,
      shouldRedirect: false,
      redirectMessage: 'Something went wrong.'
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/trips/${this.props.match.params.id}`,
      method: 'get',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(response => this.setState({ trip: response.data.trip }))
      .catch(console.error)
  }

  deleteTrip (id) {
    axios({
      url: `${apiUrl}/trips/${id}`,
      method: 'delete',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.setState({ shouldRedirect: true, redirectMessage: 'Successfully deleted.' }))
      .catch(() => this.setState({ shouldRedirect: true }))
  }

  render () {
    const { trip, shouldRedirect, redirectMessage } = this.state

    if (shouldRedirect) {
      return <Redirect to={{
        pathname: '/home',
        state: {
          message: redirectMessage
        }
      }} />
    }

    if (!trip) {
      return (
        <p>Loading...</p>
      )
    }

    const { id, name, origin, destination, distance } = trip
    return (
      <article>
        <div key={id} className="jumbotron mx-4">
          <h1>{name}</h1>
          <p className="lead">{origin} to {destination}.</p>
          <hr className="my-4" />
          <p className="lead">{distance} miles total distance.</p>
          <button onClick={() => this.deleteTrip(id)}>Delete</button>
          <Link to={`/trip/${id}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
      </article>
    )
  }
}

export default Trip
