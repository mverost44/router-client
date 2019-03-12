import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
import { Redirect } from 'react-router'
import TripForm from './TripForm'

class TripCreate extends Component {
  constructor () {
    super()

    this.state = {
      name: '',
      origin: '',
      destination: '',
      expense: '',
      createdTripId: false,
      shouldRedirect: null,
      message: null
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    const { name, origin, destination, expense } = this.state

    if (name.length === 0 || origin.length === 0 || destination.length === 0 || expense.length === 0) {
      return this.setState({ message: 'Field cannot be empty.' })
    }

    axios({
      url: apiUrl + '/trips',
      method: 'post',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        trip: {
          name,
          origin,
          destination,
          expense
        }
      }
    })
      .then(response => this.setState({ createdTripId: response.data.trip.id }))
      .catch(() => this.setState({ shouldRedirect: true }))
  }

    handleChange = event => {
      const updatedField = { [event.target.name]: event.target.value }
      this.setState(updatedField)
    }

    render () {
      const { createdTripId, name, origin, destination, expense } = this.state

      if (createdTripId) {
        return <Redirect to={`/trips/${createdTripId}`} />
      }

      const { handleChange, handleSubmit } = this

      return (
        <Fragment>
          <TripForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            trip={{ name, origin, destination, expense }}
            user={this.props.user} />
        </Fragment>
      )
    }
}

export default TripCreate
