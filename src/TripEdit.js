import React, { Component, Fragment } from 'react'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import apiUrl from './apiConfig'
import TripForm from './TripForm'
import { Redirect } from 'react-router'

class TripEdit extends Component {
  constructor () {
    super()

    this.state = {
      trip: null,
      message: null,
      shouldRedirect: false,
      redirectMessage: null,
      editedTrip: false
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
      .catch(() => this.setState(
        { shouldRedirect: true, redirectMessage: 'Trip not found.' }
      ))
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    this.setState({ trip: { ...this.state.trip, ...updatedField } })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/trips/${this.state.trip.id}`,
      method: 'patch',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: { trip: this.state.trip }
    })
      .then(response => this.setState({ editedTrip: true }))
      .catch(console.error)
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { message, shouldRedirect, redirectMessage, trip, editedTrip } = this.state

    if (!trip) {
      return <p>loading...</p>
    }

    if (shouldRedirect) {
      return <Redirect to={{
        pathname: '/',
        state: {
          message: redirectMessage
        }
      }} />
    }

    if (editedTrip) {
      return <Redirect to={`/trip/${trip.id}`} />
    }

    return (
      <Fragment>
        { message && <Alert variant="danger">{message}</Alert> }
        <TripForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          trip={trip}
          user={this.props.user}/>
      </Fragment>
    )
  }
}

export default TripEdit
