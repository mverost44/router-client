import React, { Component } from 'react'
import './App.scss'
import { Route, withRouter } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Nav from './header/Nav'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import Home from './Home'
import Trips from './Trips'
import TripCreate from './TripCreate'
import Trip from './Trip'
import TripEdit from './TripEdit'
import TodoCreate from './TodoCreate'
import Layout from './Layout'

import Alert from 'react-bootstrap/Alert'
import 'typeface-roboto'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Layout>
          <Nav user={user} />
          {alerts.map((alert, index) => (
            <Alert key={index} dismissible variant={alert.type}>
              <Alert.Heading>
                {alert.message}
              </Alert.Heading>
            </Alert>
          ))}
          <main>
            <AuthenticatedRoute user={user} exact path='/trip/:id/todo-create' render={({ match }) => (
              <TodoCreate user={user} match={match} alert={this.alert} />
            )} />
            <AuthenticatedRoute user={user} exact path='/trips' render={() => (
              <Trips user={user} alert={this.alert} />
            )} />
            <AuthenticatedRoute exact path='/trips/:id' user={user} render={({ match }) => (
              <Trip user={user} match={match} alert={this.alert} />
            )} />
            <AuthenticatedRoute exact path='/trip/:id/edit' user={user} render={({ match }) => (
              <TripEdit user={user} match={match} alert={this.alert} />
            )} />
            <AuthenticatedRoute exact path='/trip-create' user={user} render={() => (
              <TripCreate user={user} alert={this.alert} />
            )} />
            <AuthenticatedRoute exact path='/home' user={user} render={() => (
              <Home user={user} alert={this.alert} />
            )} />
            <Route path='/sign-up' render={() => (
              <SignUp alert={this.alert} setUser={this.setUser} />
            )} />
            <Route exact path='/sign-in' render={() => (
              <SignIn alert={this.alert} setUser={this.setUser} />
            )} />
            <AuthenticatedRoute user={user} path='/sign-out' render={() => (
              <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/change-password' render={() => (
              <ChangePassword alert={this.alert} user={user} />
            )} />
          </main>
        </Layout>
      </React.Fragment>
    )
  }
}

export default withRouter(App)
