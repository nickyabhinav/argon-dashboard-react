import {React, useState} from 'react';
import axios from 'axios';

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
    FormText 
  } from "reactstrap";
export default function Dth2() {

  const [inputValue, setInputValue] = useState('');
  const [digitCount, setDigitCount] = useState(0);
  const [storedData, setStoredData] = useState(null);

  const handleKeyPress = (e) =>{
    setInputValue(e.target.value);
    setDigitCount(e.target.value.length);
  }

  const [formData, setFormData] = useState({
    Mobile: '',
    AMT:'',
    OperatorDTH:'',
    number:'',
    
});

  const handleRecharge = async () => {

    try {
    
        const response = await axios.post('http://localhost:8080/BANKITMRA_New/resources/AESAPI/RechargeOperator', {
          "AgentID": storedData.agentId,
          "Key": storedData.txn_key,
          
        });
        const apiResponse = response.data;
        alert(apiResponse.message);
        if (apiResponse.status === "00") {
            return true;
        }
    } catch (error) {
        console.error('Error fetching data from API:', error);
        return false;
    }
    return false;
};

  return (
    <div>

<Form>
          
          <div className="pl-lg-2">
            
              <Col lg="9">
                <br></br>
              <FormGroup>
  
  <Input type="select" name="OperatorDTH" id="exampleSelect">
  <option>SELECT OPERATOR NAME</option>
    <option>AIRTEL DTH</option>
    <option>BIG TV</option>
    <option>DISH TV</option>
    <option>SUN DIRECT</option>
    <option>TATA SKY</option>
    <option>VIDEOCON DTH</option>
    
  </Input>
</FormGroup>
                  
              </Col>
              
              <Col lg="9">
                
              <Input
                   className="form-control-alternative"
                   defaultValue=""
                   id="input-NUMBER"
                   placeholder="DTH ACCOUNT NUMBER"
                   type="text"
                   value={inputValue}
                   onChange={handleKeyPress}
                  />
                  <label
                    className="form-control-label"
                    htmlFor="input"
                  >
                    Number Of Digits:{digitCount}
                  </label>
              </Col>
            <br></br>
              <Col lg="9">
                <FormGroup>
             
                  <Input
                    className="form-control-alternative"
                     id='AMT'
                    name='AMT'
                    placeholder="ENTER AMOUNT"
                    type="AMOUNT"
                  />
             
                </FormGroup>
              </Col>
              <Col lg="9">
                <br></br>
                <FormGroup>
                <div >
               
                <button class="btn btn-primary" type="button" onClick={handleRecharge} >Proceed to Recharge</button>
                </div>
                  
                </FormGroup>
              </Col>
          </div>
         
         
        </Form>
    </div>
  )
}
