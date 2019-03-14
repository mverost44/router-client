import React, { Fragment, Component } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AddCircle from '@material-ui/icons/AddCircle'

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
    return (
      <Fragment>
        <p>Router.jn</p>
        <Link to="/trip-create" user={this.props.user}><Button><AddCircle />Create a trip</Button></Link>
        <p>or</p>
        <Link to="/trip-create" user={this.props.user}><Button>View your trips</Button></Link>
      </Fragment>
    )
  }
}

export default Home
