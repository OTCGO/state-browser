import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  list: {
    width: 250
  },
  button: {
    margin: theme.spacing.unit,
    display: 'block'
  }
})

const Sidebar = ({ ...props }) => {
  console.log('props', props)
  const { classes } = props

  const sideList = (
    <div className={classes.list}>
      <h4>菜单</h4>
      <List>

        {
          props.routes.map((item) => {
            if (item.sidebarName) {
              return (
                <NavLink
                  to={item.path}

                >
                  <ListItem button>

                    <Button variant='contained' color='primary' className={classes.button}>
        item
                    </Button>
                  </ListItem>
                  <Divider />
                </NavLink>
              )
            }
          })
        }

      </List>

    </div>
  )

  return (
    <div>
      <Drawer open={props.open} anchor='right'
        onClose={props.handleDrawerToggle}
      >
        <div
          tabIndex={0}
          role='button'
        //   onClick={this.toggleDrawer('left', false)}
        //   onKeyDown={this.toggleDrawer('left', false)}
        >
          {sideList}
        </div>
      </Drawer>

      {/* Sidebar
      <NavLink
        to='/home'
      >
      home
      </NavLink>

      <NavLink
        to='/transaction'
      >
      transaction
      </NavLink> */}
    </div>
  )
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Sidebar)
