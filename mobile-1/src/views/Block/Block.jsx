import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Accessibility from "@material-ui/icons/Accessibility";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Block extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;

    const arr = [
      {
        name: "索引",
        value: "2728179",
        link: ""
      },
      {
        name: "交易数",
        value: "3",
        link: ""
      },
      {
        name: "散列值",
        value:
          "0xd0ea4f5787e1af11f29fc165bfc9388459e0fd92885836e7253a1e6de4a7c140",
        link: ""
      },
      {
        name: "时间",
        value: "2018-09-14 | 11:19:38",
        link: ""
      },
      {
        name: "版本",
        value: "0",
        link: ""
      },
      {
        name: "列表的根散列",
        value:
          "0xb69b9664a2ed9073f940d908e213dab9ddb291cdfb646a3d2ebc14aea5be9d35",
        link: ""
      },
      {
        name: "大小",
        value: "1367",
        link: ""
      }
    ];
    return (
      <div>
        <GridContainer>
          {arr.map(item => {
            return (
              <GridItem xs={12} sm={6} md={3} key={item.name}>
                <Card>
                  <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                      <Icon>content_copy</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>{item.name}</p>
                    <h3 className={classes.cardTitle}>{item.value}</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Danger>
                        <Warning />
                      </Danger>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        Get more space
                      </a>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            );
          })}
          {/* <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>索引</p>
                <h3 className={classes.cardTitle}>2741045</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Get more space
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>merkleroot</p>
                <h3 className={classes.cardTitle}>
                  0x434b4b51a44d24372e60a8eb6094e1349e8a100c293831a5cb5ff49ba3e43689
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>资产数量</p>
                <h3 className={classes.cardTitle}>75</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Tracked from Github
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>区块数量</p>
                <h3 className={classes.cardTitle}>+245</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem> */}
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Transaction</h4>
                <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  type="transaction"
                  tableHeaderColor="warning"
                  tableHead={["txid", "类型", "时间"]}
                  tableData={[
                    ["32c9...7cd2", "Invocation", "2018-09-17 | 16:28:08"],
                    ["32c9...7cd2", "Claim", "2018-09-17 | 16:28:08"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Block.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Block);
