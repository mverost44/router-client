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

  deleteTodo (tripId, id) {
    axios({
      url: `${apiUrl}/todos/${id}`,
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

    const { id, name, origin, destination, expense } = trip
    return (
      <article>
        <div key={id} className="jumbotron mx-4">
          <h1>{name}</h1>
          <center>
            {console.log(trip)}
            <Link to={{ pathname: `/trip/${id}/todo-create`, state: { trip } }}>
              <button>Add Todo</button>
            </Link>
            <Link to={`/trip/${id}/edit`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => this.deleteTrip(id)}>Delete</button>
          </center>
          <p className="lead">{origin} to {destination}.</p>
          <hr className="my-4" />
          <p className="lead">${expense} in expenses.</p>
          <p className="lead">Todo List:</p>
          <ul>
            {this.state.trip.todos.map(todo => (
              <li key={todo.id}>
                <p>{todo.title} --- {todo.description}</p>
                <button onClick={() => this.deleteTodo(todo.trip_id, todo.id)}>Delete Todo</button>
              </li>
            ))}
          </ul>
        </div>
      </article>
    )
  }
}

export default Trip
