import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const styles = {
  list: {
    width: 250
  }
}

const Sidebar = ({ ...props }) => {
  // console.log('props', props)
  const { classes } = props

  const sideList = (
    <div className={classes.list}>
      <List>
        <NavLink
          to={'/home'}

        >
          <ListItem button>

            <ListItemText primary='首页' />
          </ListItem>
        </NavLink>
        <NavLink
          to={'/blocklist'}

        >
          <ListItem button>
            <ListItemText primary='最新区块' />
          </ListItem>
        </NavLink>
        <NavLink
          to={'/transactionlist'}

        >
          <ListItem button>
            <ListItemText primary='最新交易' />
          </ListItem>
        </NavLink>

        <NavLink
          to={'/assetlist'}

        >
          <ListItem button>
            <ListItemText primary='资产列表' />
          </ListItem>
        </NavLink>
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
