import React, { Component, Fragment } from 'react'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import apiUrl from './apiConfig'
import TodoForm from './TodoForm'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'

class TodoCreate extends Component {
  constructor () {
    super()

    this.state = {
      todo: {
        title: '',
        description: '',
        trip_id: ''
      },
      message: null,
      shouldRedirect: false,
      redirectMessage: null,
      editedTodo: false
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
    const updatedField = { ...this.state.todo, [event.target.name]: event.target.value }
    this.setState({ todo: updatedField })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { title, description } = this.state.todo

    axios({
      url: `${apiUrl}/todos`,
      method: 'post',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        todo: {
          title,
          description,
          trip_id: this.props.location.state.trip.id
        }
      }
    })
      .then(response => this.setState({ editedTodo: true }))
      .catch(console.error)
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { message, shouldRedirect, redirectMessage, trip, todo, editedTodo } = this.state

    // if (!trip) {
    //   return <p>loading...</p>
    // }

    if (shouldRedirect) {
      return <Redirect to={{
        pathname: '/',
        state: {
          message: redirectMessage
        }
      }} />
    }

    if (editedTodo) {
      return <Redirect to={`/trips/${trip.id}`} />
    }

    return (
      <Fragment>
        { message && <Alert variant="danger">{message}</Alert> }
        <TodoForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          trip={trip}
          todo={todo}
          user={this.props.user}/>
      </Fragment>
    )
  }
}

export default withRouter(TodoCreate)
