import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Accessibility from "@material-ui/icons/Accessibility";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { withRouter } from "react-router-dom";

class Home extends React.Component {
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
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>新块时间</p>
                <h3 className={classes.cardTitle}>
                  10 <small> 秒</small>
                </h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>开始时间</p>
                <h3 className={classes.cardTitle}>2016-07-15</h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>运行时间</p>
                <h3 className={classes.cardTitle}>
                  793 <small> 天</small>
                </h3>
              </CardHeader>
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
            </Card>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>区块数量</p>
                <h3 className={classes.cardTitle}>+245</h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>交易数量</p>
                <h3 className={classes.cardTitle}>1,781,488</h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Icon>content_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>地址数量</p>
                <h3 className={classes.cardTitle}>1,781,488</h3>
              </CardHeader>
            </Card>
          </GridItem>
        </GridContainer>

        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <h4 className={classes.cardTitleWhite}>Blocks</h4>
                <p className={classes.cardCategoryWhite} />
              </CardHeader>
              <CardBody>
                <Table
                  type="block"
                  tableHeaderColor="success"
                  tableHead={["高度", "交易数", "时间"]}
                  tableData={[
                    ["2,740,965", "11", "2018-09-17 | 16:28:08"],
                    ["2,740,966", "12", "2018-09-17 | 16:28:08"]
                  ]}
                />
              </CardBody>
              <CardFooter>
                <Button
                  color="info"
                  onClick={() => {
                    this.props.history.push("/blocklist");
                  }}
                >
                  More
                </Button>
              </CardFooter>
            </Card>
          </GridItem>

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
              <CardFooter>
                <Button
                  color="info"
                  onClick={() => {
                    this.props.history.push("/transactionlist");
                  }}
                >
                  More
                </Button>
              </CardFooter>
            </Card>
          </GridItem>

          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Assets</h4>
                <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  type="asset"
                  tableHeaderColor="info"
                  tableHead={["名称", "类型", "总量"]}
                  tableData={[
                    ["NEO", "GoverningToken", "100,000,000"],
                    ["GAS", "Token", "100,000,000 "]
                  ]}
                />
              </CardBody>
              <CardFooter>
                <Button
                  color="info"
                  onClick={() => {
                    this.props.history.push("/assetlist");
                  }}
                >
                  More
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default withStyles(dashboardStyle)(withRouter(Home));
