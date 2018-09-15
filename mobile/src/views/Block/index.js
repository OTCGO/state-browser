
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
    height: 320,
    wordWrap: 'break-word'
  }
})
class Block extends React.Component {
  render () {
    const { classes } = this.props

    const arr = [{
      name: '索引',
      value: '2728179',
      link: ''
    }, {
      name: '交易数',
      value: '3',
      link: ''
    }, {
      name: '散列值',
      value: '0xd0ea4f5787e1af11f29fc165bfc9388459e0fd92885836e7253a1e6de4a7c140',
      link: ''
    }, {
      name: '时间',
      value: '2018-09-14 | 11:19:38',
      link: ''
    }, {
      name: '版本',
      value: '0',
      link: ''
    }, {
      name: '列表的根散列',
      value: '0xb69b9664a2ed9073f940d908e213dab9ddb291cdfb646a3d2ebc14aea5be9d35',
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
      value: '40809665c036327c5d4d018baeaacec93da6bffb901d44723ded1f2160d046d45f4baebd89d9c06e4cc0dcb9f3364deca9da8c39f045aadba95d8db6791ceb96934078756f4a6047d5fa0db75afff020e724191ec70b02ade56af58ac2a1670b2a1545b6434c0bd6da61367e0ca1850b0f9c220c597a1df21da97214f89a131fd1e24006b8309cc1ac7ebe8f7edfdea48b91ad2c716bfded9f4101a3743016159d17df8812b8061fbd1c829f5585375a93dc363aa72af112ae5262cc980df074492727403f435c0cf590408360521845794bd332e2478f1cc0483e285f631858e3341340461eee5d4db71da64890ef023c7e8234d9c4e244630f50948ae3989fede2e02540803eb306f959dcfab4f91667792db0fcb461c2a567ce524a0245a8051f21b3c7362b8dd5fa799829c830de99c00abe3e32d151177bf6f0dd45c40438902947b8',
      link: ''
    }, {
      name: '验证脚本',
      value: '5521024c7b7fb6c310fccf1ba33b082519d82964ea93868d676662d4a59ad548df0e7d21025bdf3f181f53e9696227843950deb72dcd374ded17c057159513c3d0abe20b642102aaec38470f6aad0042c6e877cfd8087d2676b0f516fddd362801b9bd3936399e2103b209fd4f53a7170ea4444e0cb0a6bb6a53c2bd016926989cf85f9b0fba17a70c2103b8d9d5771d8f513aa0869b9cc8d50986403b78c6da36890638c3d46a5adce04a2102ca0e27697b9c248f6f16e085fd0061e26f44da85b58ee835c110caa5ec3ba5542102df48f60e8f3e01c48ff40b9b7f1310d7a8b2a193188befe1c2e3df740e89509357ae',
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

export default withStyles(styles)(Block)
