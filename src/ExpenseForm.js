import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
})

const ExpenseForm = ({ handleChange, handleSubmit, trip, expense, classes }) => (
  <main className={classes.main}>
    <CssBaseline />
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar}>
      </Avatar>
      <Typography component="h1" variant="h5">
        New Expense
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="Expense amount">Amount</InputLabel>
          <Input id="amount" name="amount" type="number" value={expense.amount} onChange={handleChange} autoComplete="amount" autoFocus />
        </FormControl>
        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="Expense description">Description</InputLabel>
          <Input id="description" name="description" type="text" value={expense.description} onChange={handleChange} autoComplete="description" autoFocus />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Create Expense
        </Button>
      </form>
    </Paper>
  </main>
)

ExpenseForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ExpenseForm)
