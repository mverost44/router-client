import React, { Component, Fragment } from 'react'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import apiUrl from './apiConfig'
import ExpenseForm from './ExpenseForm'
import { Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'

class ExpenseCreate extends Component {
  constructor () {
    super()

    this.state = {
      expense: {
        amount: '',
        description: '',
        trip_id: ''
      },
      message: null,
      shouldRedirect: false,
      redirectMessage: null,
      editedExpense: false
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
    const updatedField = { ...this.state.expense, [event.target.name]: event.target.value }
    this.setState({ expense: updatedField })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { amount, description } = this.state.expense

    axios({
      url: `${apiUrl}/expenses`,
      method: 'post',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        expense: {
          amount,
          description,
          trip_id: this.props.location.state.trip.id
        }
      }
    })
      .then(response => this.setState({ editedExpense: true }))
      .catch(console.error)
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { message, shouldRedirect, redirectMessage, trip, expense, editedExpense } = this.state

    if (shouldRedirect) {
      return <Redirect to={{
        pathname: '/',
        state: {
          message: redirectMessage
        }
      }} />
    }

    if (editedExpense) {
      return <Redirect to={`/trips/${trip.id}`} />
    }

    return (
      <Fragment>
        { message && <Alert variant="danger">{message}</Alert> }
        <ExpenseForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          trip={trip}
          expense={expense}
          user={this.props.user}/>
      </Fragment>
    )
  }
}

export default withRouter(ExpenseCreate)
