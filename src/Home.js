import React, { Fragment, Component } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'

class Home extends Component {
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

    if (!trips) {
      return (
        <Fragment>
          <p>You do not have any trips in your list.</p>
        </Fragment>
      )
    }

    return (
      <Fragment>
        <p>Home</p>
      </Fragment>
    )
  }
}

export default Home
