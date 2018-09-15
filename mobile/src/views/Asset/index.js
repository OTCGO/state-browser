
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
  title: {
    height: 70,
    wordWrap: 'break-word'
  },
  script: {
    height: 70,
    wordWrap: 'break-word'
  }
})
class Asset extends React.Component {
  render () {
    const { classes } = this.props

    const arr = [{
      name: '名称',
      value: 'NEO',
      link: ''
    }, {
      name: '符号',
      value: 'NEO',
      link: ''
    }, {
      name: '类型',
      value: 'GoverningToken',
      link: ''
    }, {
      name: '标识',
      value: '0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
      link: ''
    }, {
      name: '总量',
      value: '100000000',
      link: ''
    }]

    const statisticsList = arr.map(item => {
      return (
        <Grid item xs={6} key={item.name}>
          <Card className={classes.card}>
            <CardContent>
              {item.name}
              <Typography className={classes.title} color='textSecondary'>
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )
    })

    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container spacing={24} >

          {statisticsList}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Asset)
