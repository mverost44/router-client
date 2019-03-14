import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

class MenuAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked })
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  openNav = () => {
    document.getElementById('mySidepanel').style.width = '250px'
  }

  closeNav = () => {
    document.getElementById('mySidepanel').style.width = '0'
  }

  render () {
    const { classes } = this.props
    const { auth, anchorEl } = this.state
    const open = Boolean(anchorEl)
    const authenticatedOptions = (
      <React.Fragment>
        <MenuItem onClick={this.handleClose}><Link to="/change-password">Change Password</Link></MenuItem>
        <MenuItem onClick={this.handleClose}><Link to="/sign-out">Sign Out</Link></MenuItem>
      </React.Fragment>
    )
    const unauthenticatedOptions = (
      <React.Fragment>
        <MenuItem onClick={this.handleClose}><Link to="/sign-up">Sign Up</Link></MenuItem>
        <MenuItem onClick={this.handleClose}><Link to="/sign-in">Sign In</Link></MenuItem>
      </React.Fragment>
    )

    return (
      <React.Fragment>
        <div id="mySidepanel" className="sidepanel">
          <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
          {this.props.user && (
            <React.Fragment>
              <span className="nav-text">Welcome back, {this.props.user.email}.</span>
              <Link to="/home" user={this.props.user}>Home</Link>
              <Link to="/trips" user={this.props.user}>My Trips</Link>
              <Link to="/trip-create" user={this.props.user}>New Trip</Link>
            </React.Fragment>)}
        </div>

        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>{ this.props.user &&
              <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                <MenuIcon className="openbtn" onClick={this.openNav} />
              </IconButton> }
            <Typography variant="h6" color="inherit" className={classes.grow}>
                router.jn
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={this.handleClose}
                >

                  { this.props.user ? authenticatedOptions : unauthenticatedOptions }
                </Menu>
              </div>
            )}
            </Toolbar>
          </AppBar>
        </div>
      </React.Fragment>
    )
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRouter(withStyles(styles)(MenuAppBar))
