

// reactstrap components
import {React, useState } from 'react';
import {useNavigate} from 'react-router-dom';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Login = () => {
  const [mobileNo, setUsername] = useState('');
  const [MPIN, setPassword] = useState('');
  const [apiData, setApiData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const imei = '352232290929622';

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(baseUrl + 'Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mobileNo, MPIN, imei })
    });

    const json = await response.json();
    if(json.status === '0' && json.message === 'Success'){
      const apiData = JSON.stringify(json);
      localStorage.setItem('apiData', apiData);
      navigate('/admin/index.js');
    }
    else if(json.status === '0' && json.message === 'Otp sent Successfully'){
      setIsAuthenticated(true);
    }else{
      alert("Invalid Pin / Password");
    } 
   
    
  };

  const validateOTP = async (event) => {
    event.preventDefault();
    const response = await fetch(baseUrl + '/validateOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ mobileNo, MPIN, otp , imei })
    });
    const json = await response.json();
  
    const apiData = JSON.stringify(json);
    localStorage.setItem('apiData', apiData);
    setApiData(apiData);
    navigate('/admin/index.js');
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary border-20">
          <CardHeader className="bg-transparent ">
            <div className="text-muted text-center">
              <span style={{fontSize:"24px", fontWeight:"bold"}}>RETAILER LOGIN</span></div>

          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="User Name / Phone Number"
                    type="text"
                    autoComplete="new-email"
                    value={mobileNo}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
              <InputGroup className="input-group-alternative ">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password / Pin"
                    type="password"
                    autoComplete="new-password"
                    value={MPIN}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              {isAuthenticated && (<><FormGroup >
                <InputGroup className="input-group-alternative ">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-chat-round" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Please enter OTP"
                    type="otp"
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="" color="primary" type="submit" onClick={validateOTP}>
                  Validate OTP
                </Button>
              </div></>
              )}
              {!isAuthenticated && (<div className="text-center">
                <Button className="" color="primary" type="submit">
                  Sign in
                </Button>
              </div>)}
            </Form>
            {apiData && (<div>
                    <p> {apiData}
                    </p></div>
            )}
            <Row className="mt-3" style={{justifyContent:"space-between"}}>
                <a
                  className="text-dark"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Sign Up</small>
                </a>
                <div>|</div>
                <a
                  className="text-dark"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Create Pin</small>
                </a>
                <div>|</div>
                <a
                  className="text-dark"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Forgot Password?</small>
                </a>
                <div>|</div>
                <a
                  className="text-dark"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                >
                  <small>Forgot Pin?</small>
                </a>
            </Row>
          </CardBody>
        </Card>
        
      </Col>
    </>
  );
  
};

export default Login;
