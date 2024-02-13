import { React, useState, useEffect } from 'react';
import { Button, Col, Form, FormGroup, Input } from 'reactstrap';
import axios from 'axios';





export default function Mobile() {
  const [inputValue, setInputValue] = useState('');
  const [digitCount, setDigitCount] = useState(0);
  const [storedData, setStoredData] = useState(null);
  const [operatorName, setOperatorName] = useState('');
  
  const [operatorID, setOperatorID] = useState('');
  const handleKeyPress = (e) => {
    setInputValue(e.target.value);
    setDigitCount(e.target.value.length);
  };

 
  const [formData, setFormData] = useState({
    Mobile: '',
    AMT:'',
    operatorName:'',
    number:'',
    operator :'',

});
  
const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;

    if (name === 'mobileNo') {
      setOperatorName(''); // Reset operator value
    }
        setFormData({ ...formData, [name]: value });
    
};

useEffect(() => {
    let dataFromLocalStorage = localStorage.getItem('apiData');
    
    if (dataFromLocalStorage) {
        const parsedData = JSON.parse(dataFromLocalStorage);
        setStoredData(parsedData);
    }

    
    
}, []);


const fetchMobileDetails = async (e) => {
  handleInputChange(e);
  try {
    
      const response = await axios.post('http://localhost:8080/BANKITMRA_New/resources/AESAPI/old-Recharge', {

        "mobileNo": e.target.value,

      });
      const apiResponse = response.data;

      // alert(apiResponse.message);
      if (apiResponse.status === "00") {

        const firstDataItem = apiResponse.data && apiResponse.data.length > 0 ? apiResponse.data[0] : null;
        const extractedOperatorName = firstDataItem ? firstDataItem.OperatorName : '';
        setOperatorName(extractedOperatorName);
        const extractedOperatorID = firstDataItem ? firstDataItem.OperatorID : '';
    setOperatorID(extractedOperatorID);

    alert(extractedOperatorID);
          return true;
      }
  } catch (error) {
      console.error('Error fetching data from API:', error);
      return false;
  }
  return false;
};

  const handleRecharge = async () => {

    try {
    
        const response = await axios.post('http://localhost:8080/BANKITMRA_New/resources/AESAPI/Recharge', {
            "AgentID": storedData.agentId,
            "Key": storedData.txn_key,
            "CN" : formData.number.toString(),
            "OP" : formData.operator,
            "AMT" : formData.AMT,
            "ST" : formData.number,
            "CircleID" : operatorID,
            "MPIN" : '989133',
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

  const browsePlan = (e) => {
    // Add logic for browsing plans
    e.preventDefault(); // Prevent the default behavior of the link
    console.log('View Plans clicked!');
  };

  return (
    <div>
      <Form>
        <div className="pl-lg-2">
          <Col lg="9">
            <br />
            <Input
              className="form-control-alternative"
              defaultValue=""
              id="number"
              name='number'
              maxLength={10}
              placeholder="ENTER YOUR 10 DIGIT MOBILE NUMBER"
              type="text"
              value={formData.number} 
              onChange={fetchMobileDetails} 
             
            />
            <label
              className="form-control-label"
              htmlFor="input-NUMBER"
            >
              Number Of Digits: {digitCount}
            </label>
          </Col>
          <br />
          <Col lg="9">
            <FormGroup>
              
                      <Input
                        type='select'
                        name='operator'
                        id='operator'
                        value={formData.operator}
                        onChange={handleInputChange}>
                          <option value="">SELECT OPERATOR NAME</option>
                          <option value="Airtel" selected={operatorName === "AIRTEL"}>Airtel</option>
                          <option value="BSNL SPECIAL" selected={operatorName === "BSNL SPECIAL"}>BSNL SPECIAL</option>
                          <option value="BSNL TOPUP" selected={operatorName === "BSNL TOPUP"}>BSNL TOPUP</option>
                          <option value="Idea" selected={operatorName === "IDEA"}>Idea</option>
                          <option value="Jio" selected={operatorName === "JIO"}>Jio</option>
                          <option value="MTNL SPECIAL" selected={operatorName === "MTNL SPECIAL"}>MTNL SPECIAL</option>
                          <option value="MTNL TOPUP" selected={operatorName === "MTNL TOPUP"}>MTNL TOPUP</option>
                          <option value="Vodafone" selected={operatorName === "VODAFONE"}>Vodafone</option>
                      </Input>
                      
            </FormGroup>
            
          </Col>

          <Col lg="9">
            <FormGroup>
              <Input
                className="form-control-alternative"
                id="AMT"
                name='AMT'
                placeholder="ENTER AMOUNT"
                type="AMOUNT"
                value={formData.AMT} 
                onChange={handleInputChange} 
                
              />
            </FormGroup>
            <FormGroup>

            </FormGroup>
          </Col>
          <Col lg="9">
            <label
              style={{
                float: 'left',
                textDecoration: 'underline',
                fontSize: '14px',
                cursor: 'pointer', 
              }}
            >
              <a href="#" id="plans" onClick={browsePlan}>
                View Plans
              </a>
            </label>
          </Col>

          <br />
          <Col lg="9">
            <FormGroup>
              <div>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleRecharge}
                >
                  Proceed to Recharge
                </button>
              </div>
            </FormGroup>
          </Col>
        </div>
      </Form>
    </div>
  );
}
