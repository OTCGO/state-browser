import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import indexRoutes from './routes'

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
})

export default function App () {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} component={prop.component} key={key} />
          })}
          {/* <SHeader />
          <article>
            {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
          </article>
          <footer>footer</footer> */}
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}
