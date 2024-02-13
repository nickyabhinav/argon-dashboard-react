import {React, useState} from 'react';import {
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
    FormText 
  } from "reactstrap";
export default function DataCard() {

    const [inputValue, setInputValue] = useState('');
  const [digitCount, setDigitCount] = useState(0);
  
  const handleKeyPress = (e) =>{
    setInputValue(e.target.value);
    setDigitCount(e.target.value.length);
  }
  return (
    <div>

<Form>
          
          <div className="pl-lg-2">
            
              <Col lg="9">
                <br></br>
              <FormGroup>
  
  <Input type="select" name="select" id="exampleSelect">
  <option>SELECT OPERATOR NAME</option>
    <option>AIRTEL</option>
    <option>BSNL SPECIAL</option>
    <option>BSNL TOPUP</option>
    <option>IDEA</option>
    <option>JIO</option>
    <option>MTNL SPECIAL</option>
    <option>MTNL TOPUP</option>
    <option>VODAFONE</option>
  </Input>
</FormGroup>
                  
              </Col>
              
              <Col lg="9">
              <Input
                   className="form-control-alternative"
                   defaultValue=""
                   id="input-NUMBER"
                   placeholder="DATA CARD ACCOUNT NUMBER"
                   type="text"
                   value={inputValue}
                   onChange={handleKeyPress}
                  />
                  <label
                    className="form-control-label"
                    htmlFor="input-email"
                  >
                    Number Of Digits:{digitCount}
                  </label>
              </Col>
            <br></br>
              <Col lg="9">
                <FormGroup>
             
                  <Input
                    className="form-control-alternative"
                    id="input-email"
                    placeholder="ENTER AMOUNT"
                    type="AMOUNT"
                  />
             
                </FormGroup>
              </Col>
              <Col lg="9">
                <br></br>
                <FormGroup>
                <div >
               
                <button class="btn btn-primary" type="button">Proceed to Recharge</button>
                </div>
                  
                </FormGroup>
              </Col>
          </div>
          
         
        </Form>
    </div>
  )
}
