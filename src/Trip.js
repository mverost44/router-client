import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from './apiConfig'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import Delete from '@material-ui/icons/Delete'
import AddCircle from '@material-ui/icons/AddCircle'
import Edit from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'

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

  deleteExpense (tripId, id) {
    axios({
      url: `${apiUrl}/expenses/${id}`,
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
        pathname: '/trips/',
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

    const { id, name, origin, destination } = trip
    return (
      <article>
        <div key={id} className="trip-card container">
          <span className="trip-name">{name}</span>
          <hr className="ruler" /><br />
          <center>
            <Link to={{ pathname: `/trip/${id}/todo-create`, state: { trip } }}>
              <Button><AddCircle />Todo</Button>
            </Link>
            <Link to={{ pathname: `/trip/${id}/expense-create`, state: { trip } }}>
              <Button><AddCircle />Expense</Button>
            </Link>
            <Link to={`/trip/${id}/edit`}>
              <Button><Edit /></Button>
            </Link>
            <Button>
              <Delete onClick={() => this.deleteTrip(id)} />
            </Button>
          </center>
          <p className="lead">{origin} to {destination}.</p>
          <hr className="my-4" />
          <p className="lead">Expenses:</p>
          <ul>
            {this.state.trip.expenses.map(expense => (
              <li key={expense.id}>
                <span>${expense.amount} for {expense.description}<Button onClick={() => this.deleteExpense(expense.trip_id, expense.id)}><Delete /></Button></span>
              </li>
            ))}
          </ul>
          <p className="lead">Todo List:</p>
          <ul>
            {this.state.trip.todos.map(todo => (
              <li key={todo.id}>
                <span>{todo.title}<Button onClick={() => this.deleteTodo(todo.trip_id, todo.id)}><Delete /></Button></span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    )
  }
}

Trip.propTypes = {
  classes: PropTypes.object.isRequired
}

export default Trip
