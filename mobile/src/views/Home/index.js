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
    textAlign: 'center',
    height: 50
  }
})

class Home extends React.Component {
  render () {
    const { classes } = this.props

    const arr = [{
      name: '开始时间',
      value: '2016-07-15',
      link: ''
    }, {
      name: '运行时间',
      value: '790 天',
      link: ''
    }, {
      name: '资产数量',
      value: '79',
      link: ''
    }, {
      name: '区块数量',
      value: '2,728,068',
      link: ''
    }, {
      name: '交易数量',
      value: '19,702,378',
      link: ''
    }, {
      name: '地址数量',
      value: '1,779,536',
      link: ''
    }]

    const statisticsList = arr.map(item => {
      return (
        <Grid item xs={6} key={item.name}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color='textSecondary'>
                {item.name}
              </Typography>
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
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography color='textSecondary'>
                    Block
                </Typography>
                <Divider />
                <List >
                  <ListItem button>
                    <ListItemText primary='319343' secondary='914 byte' />
                    <ListItemSecondaryAction>

                      <ListItemText primary='0 Transactions' secondary='2018-09-14 | 10:28:17' />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText primary='319343' secondary='914 byte' />
                    <ListItemSecondaryAction>

                      <ListItemText primary='0 Transactions' secondary='2018-09-14 | 10:28:17' />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </List>
              </CardContent>
              <CardActions>
                <Button size='small'>Load More</Button>
              </CardActions>
            </Card>

          </Grid>
        </Grid>

        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardContent>
                <Typography color='textSecondary'>
                    Transaction
                </Typography>
                <Divider />
                <List >
                  <ListItem button>
                    <ListItemText primary='297d...e4e1' secondary='Contract' />
                    <ListItemSecondaryAction>

                      <ListItemText secondary='2018-09-14 | 10:29:41' />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText primary='297d...e4e1' secondary='Contract' />
                    <ListItemSecondaryAction>

                      <ListItemText secondary='2018-09-14 | 10:29:41' />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </List>
              </CardContent>
              <CardActions>
                <Button size='small'>Load More</Button>
              </CardActions>
            </Card>

          </Grid>
        </Grid>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Home)
