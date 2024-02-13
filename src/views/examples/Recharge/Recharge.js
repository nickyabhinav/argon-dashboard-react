import { React, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Label,
  FormText,
} from "reactstrap";
import UserHeader from "components/Headers/UserHeader.js";
import Mobile from "./Mobile";
import Dth from "./Dth";
import DataCard from "./DataCard";

const options = [
  { name: "Swedish", value: "sv" },
  { name: "English", value: "en" },
  {
    type: "group",
    name: "Group name",
    items: [{ name: "Spanish", value: "es" }],
  },
];

const Profile = () => {
  const [selected, setSelected] = useState("Mobile");

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--9" fluid style={{ width: "70%" }}>
        <Card className="bg-secondary shadow">
          <CardHeader
            className="bg-white border-0"
            style={{ boxShadow: "5px 0px 18px #888888" }}
          >
            <Row className="align-items-center">
              <Col lg="12" style={{ textAlign: "center" }}>
                <div class="container text-center">
                  <div class="">
                    <Button
                      style={{
                        backgroundColor:
                          selected === "Mobile" ? "#5e72e4" : "white",
                        marginInline: "2rem",
                        color: selected === "Mobile" ? "white" : "black",
                      }}
                      class="col"
                      onClick={() => setSelected("Mobile")}
                    >
                      Mobile
                    </Button>
                    <Button
                      style={{
                        backgroundColor:
                          selected === "dth" ? "#5e72e4" : "white",
                        marginInline: "4rem",
                        color: selected === "dth" ? "white" : "black",
                      }}
                      class="col"
                      onClick={() => setSelected("dth")}
                    >
                      DTH
                    </Button>
                    <Button
                      style={{
                        backgroundColor:
                          selected === "DataCard" ? "#5e72e4" : "white",
                        marginInline: "2rem",
                        color: selected === "DataCard" ? "white" : "black",
                      }}
                      class="col"
                      onClick={() => setSelected("DataCard")}
                    >
                      DataCard
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </CardHeader>
          <CardBody style={{ boxShadow: "5px 10px 18px #888888" }}>
            {selected == "Mobile" ? (
              <Mobile />
            ) : selected == "dth" ? (
              <Dth />
            ) : selected == "DataCard" ? (
              <DataCard />
            ) : null}
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default Profile;
