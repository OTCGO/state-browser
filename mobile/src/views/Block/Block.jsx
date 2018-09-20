import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
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
        name: "大小",
        value: "1367 字节",
        link: ""
      }
    ];
    return (
      <div>
        <GridContainer>
          {arr.map(item => {
            return (
              <GridItem xs={12} sm={6} md={4} key={item.name}>
                <Card>
                  <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                      <Icon>content_copy</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>{item.name}</p>
                  </CardHeader>
                  <CardBody stats>
                    <h3 className={classes.cardTitle}>{item.value}</h3>
                  </CardBody>
                </Card>
              </GridItem>
            );
          })}
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
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>散列值</h4>
              </CardHeader>
              <CardBody>
                <p>
                  0xd0ea4f5787e1af11f29fc165bfc9388459e0fd92885836e7253a1e6de4a7c140
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>根散列值</h4>
              </CardHeader>
              <CardBody>
                <p>
                  0xb69b9664a2ed9073f940d908e213dab9ddb291cdfb646a3d2ebc14aea5be9d35
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>合约脚本</h4>
              </CardHeader>
              <CardBody>
                <p>
                  40ced4022bcc9ddf3fc4f929ef8a410c727020a975343df73a774b30a820c453b90f0bc7c9e9ad852a9e1b01f244d04ae8e465e8fe50d890d363a74e84392a65c74039e50e2b34a817e4dd586266ebecb7844d9ceac39f5adacd22b39b709e24a5e730c3f8f29d2536ff60318f2f7e712ab04f40985848682e9b7b5870ec9ecf90a0407b22848cd60c752d046518c46d6ea224fee0750b00987878ba7a6cc725b94fceab76dc1806648172f5841fab846beafd715f265bbd938181c5bc66b55c3e7bd74027f0add80c1953dc51f23f380d8b4c8f2a1d5b26d42ea849a6ffb2e9bea455be1d96e972a88efbdc19f87854aa66df26f1e9c1154b910753b2f5d3759fae88ed4096cb4ee5eff274c8602f02ca578d272367e155e2e447716487cfb38515c8c2d8d035eeb05febcdf262be170e2b25aea7e2d8e3c636b57813f00c2f4f23f3c8a0
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>验证脚本</h4>
              </CardHeader>
              <CardBody>
                <p>
                  40ced4022bcc9ddf3fc4f929ef8a410c727020a975343df73a774b30a820c453b90f0bc7c9e9ad852a9e1b01f244d04ae8e465e8fe50d890d363a74e84392a65c74039e50e2b34a817e4dd586266ebecb7844d9ceac39f5adacd22b39b709e24a5e730c3f8f29d2536ff60318f2f7e712ab04f40985848682e9b7b5870ec9ecf90a0407b22848cd60c752d046518c46d6ea224fee0750b00987878ba7a6cc725b94fceab76dc1806648172f5841fab846beafd715f265bbd938181c5bc66b55c3e7bd74027f0add80c1953dc51f23f380d8b4c8f2a1d5b26d42ea849a6ffb2e9bea455be1d96e972a88efbdc19f87854aa66df26f1e9c1154b910753b2f5d3759fae88ed4096cb4ee5eff274c8602f02ca578d272367e155e2e447716487cfb38515c8c2d8d035eeb05febcdf262be170e2b25aea7e2d8e3c636b57813f00c2f4f23f3c8a0
                </p>
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
