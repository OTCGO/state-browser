import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  footer: {
    textAlign: 'center'
  }
}

const Footer = ({ ...props }) => {
  const { classes } = props
  return (
    <footer className={classes.footer}>
      Copyright © 2018 The SEA Team
    </footer>
  )
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Footer)
