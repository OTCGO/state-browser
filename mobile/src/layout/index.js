
import React from 'react'
// import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'

import menuRoutes from '../routes/menu'

// import dashboardStyle from 'assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx'

// import image from 'assets/img/sidebar-2.jpg'
// import logo from 'assets/img/reactlogo.png'

const switchRoutes = (
  <Switch>
    {menuRoutes.map((prop, key) => {
      if (prop.redirect) { return <Redirect from={prop.path} to={prop.to} key={key} /> }
      return <Route path={prop.path} component={prop.component} key={key} />
    })}
  </Switch>
)

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      siderOpen: false
    }
  }
  // getRoute () {
  //   return this.props.location.pathname !== '/maps'
  // }
  handleDrawerToggle = () => {
    this.setState({ siderOpen: !this.state.siderOpen })
  };

  render () {
    // const { classes } = this.props
    return (
      <div >
        <Sidebar
          // open={this.state.siderOpen}
          open
          handleDrawerToggle={this.handleDrawerToggle}
          routes={menuRoutes}

        />
        <div ref='mainPanel'>
          <Header
            routes={menuRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
          />

          <div >
            <div >{switchRoutes}</div>
          </div>

          <Footer />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  // classes: PropTypes.object.isRequired
}

export default App
