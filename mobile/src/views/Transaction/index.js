
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
class Transaction extends React.Component {
  render () {
    const { classes } = this.props

    const arr = [{
      name: '时间',
      value: '2018-09-14 | 11:19:38',
      link: ''
    }, {
      name: '类型',
      value: 'ClaimTransaction',
      link: ''
    }, {
      name: '网络费用',
      value: '0',
      link: ''
    }, {
      name: '系统费用',
      value: '0',
      link: ''
    }, {
      name: '索引',
      value: '2722222',
      link: ''
    }, {
      name: '大小',
      value: '1367',
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

    const scriptArr = [{
      name: '合约脚本',
      value: '4071a1320aeb8ef53823e80c8f72624ea9cb43cf95e106f22be1653f4c4b183f771a440e82db0e66e24ecfacfc016110ac7c564250af229d0237b0bce3c7bf8200',
      link: ''
    }, {
      name: '验证脚本',
      value: '2103efec4518949a29bafa7b67f2c52e6f449f23340421d4b7125a3c6c8acd1bd85bac',
      link: ''
    }]

    const scriptList = scriptArr.map(item => {
      return (
        <Grid item xs={12} key={item.name}>
          <Card className={classes.card}>
            <CardContent>
              {item.name}
              <Typography className={classes.script} color='textSecondary'>
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

        <Grid container spacing={24} >

          {scriptList}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Transaction)
