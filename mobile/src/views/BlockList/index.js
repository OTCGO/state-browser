
import React from 'react'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import { NavLink } from 'react-router-dom'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 500
  }
})
class BlockList extends React.Component {
  render () {
    const { classes } = this.props

    let id = 0
    function createData (name, calories, fat, carbs) {
      id += 1
      return { id, name, calories, fat, carbs }
    }

    const rows = [
      createData('2729215', '7,542', '12', '2018-09-14 | 17:40:25'),
      createData('2729215', '7,542', '12', '2018-09-14 | 17:40:25'),
      createData('2729215', '7,542', '12', '2018-09-14 | 17:40:25'),
      createData('2729215', '7,542', '12', '2018-09-14 | 17:40:25')
    ]

    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>

        <Grid container spacing={24} >
          <Grid item xs={12}>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>高度</TableCell>
                    <TableCell >大小</TableCell>
                    <TableCell >交易数</TableCell>
                    <TableCell numeric>时间</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map(row => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell component='th' scope='row'>
                          <NavLink to={'/block'}>{row.name}</NavLink>
                        </TableCell>
                        <TableCell >{row.calories}</TableCell>
                        <TableCell >{row.fat}</TableCell>
                        <TableCell numeric>{row.carbs}</TableCell>

                      </TableRow>
                    )
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      colSpan={3}
                      count={10}
                      rowsPerPage={10}
                      page={1}
                      onChangePage={() => {}}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(BlockList)
