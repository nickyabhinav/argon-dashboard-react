/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { useState, useEffect } from 'react';
const Header = () => {
  const [data, setData] = useState(null);
  const [agentId, setAgentId] = useState(null);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  useEffect(() => {

    const fetchData = async () => {
      const dataFromLocalStorage = localStorage.getItem('apiData');

      if (dataFromLocalStorage) {
        const parsedData = JSON.parse(dataFromLocalStorage);
        setAgentId(parsedData.agentId);

      }
      try {
        const response = await fetch(baseUrl + '/dashboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Key: '9df96bb80bdb81a65648ccae348d60d6f54ea887',
            AgentID: "26898",
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const dash = data.dashBoardData;
        setData(dash);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  },);



  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          {data && (<div className="header-body">
            {/* Card stats */}
            <Row>
              {data.map((key) => (<Col lg="6" xl="4">

                <Card className="card-stats mb-4 mb-xl-4">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          {key.service}
                        </CardTitle>
                        This month
                        <span className="h2 font-weight-bold mb-0">
                          {" "}{key.currentMonthAmount}
                        </span>
                        <br />
                        Last month
                        <span className="h4 font-weight-bold mb-0">
                          {" "}{key.previousMonthAmount}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      {key.businessVolumegrowth.startsWith("-") ? (
                        <span className="text-danger mr-2">
                          <i className="fa fa-arrow-down" /> {key.businessVolumegrowth} %
                        </span>
                      ) : (<span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> {key.businessVolumegrowth} %
                      </span>)}
                      {" "}
                      <span className="text-nowrap"> in current month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>))}

            </Row>
          </div>)}
        </Container>
      </div>
    </>
  );
};

export default Header;
