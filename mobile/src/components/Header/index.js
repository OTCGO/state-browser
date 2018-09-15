import React from 'react'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  title: {
    height: 200,
    textAlign: 'center'
  }
})

const Header = ({ ...props }) => {
  const { classes } = props
  return (
    <header>

      <Grid container >
        <Grid item xs={12} >
          <Grid
            container
            direction='row'
            justify='flex-end'
            alignItems='stretch'
          >
            <Grid item xs={2}>
              <IconButton className={classes.button} aria-label='Add an menu' onClick={props.handleDrawerToggle}>
                <Icon>menu</Icon>
              </IconButton>
            </Grid>
          </Grid>

        </Grid>
        <Grid item xs={12} className={classes.title}>
          全资产区块浏览器
        </Grid>
        <Grid item xs={12} container
          direction='row'
          justify='center'
          alignItems='center' >
          <Input
            defaultValue='search'
            className={classes.input}
            inputProps={{
              'aria-label': 'Description'
            }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton className={classes.button} aria-label='Add an search'>
                  <Icon>search</Icon>
                </IconButton>
              </InputAdornment>
            }
          />
        </Grid>

      </Grid>

    </header>
  )
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header)
