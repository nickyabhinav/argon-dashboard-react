import {React,useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Label, 
  Button, 
} from 'reactstrap';
import UserHeader from 'components/Headers/UserHeader.js';



const Dmt = () => {
    
  const [SenderId, setMobile] = useState('');
  const [Key, setKey] = useState('');
  const [AgentID, setAgentId] = useState('');
  const navigate = useNavigate();
  const [digitCount1, setDigitNumber] = useState(0);
  const [digitCount, setDigitCount] = useState(0);

// get data of local storage

  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem('apiData');
    if (dataFromLocalStorage) {
      const parsedData = JSON.parse(dataFromLocalStorage);
      setAgentId(parsedData.agentId);
      setKey(parsedData.txn_key);
    }
  }, []); 

  // get recipient call

  const getBene = async (event) => {
    event.preventDefault();
    const response = await fetch('https://services.bankit.in:8443/BANKITMRA/resources/AESAPI/FindSender', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({SenderId , AgentID , Key })  
    });
    const json = await response.json();
    const apiData = JSON.stringify(json);
    const parsedApiData = JSON.parse(apiData);
   // alert(parsedApiData.SenderLimitDetails.balance);
    if(parsedApiData.status === '0' & parsedApiData.message ==='Success'){
      navigate('/admin/dmt-recipient',{ state: { parsedApiData}  });
    }{
      alert(parsedApiData.message);
    }
    
  };
  
  return (
    <>
      <UserHeader />
      <Container className="mt--9" fluid style={{width: '70%'}}>
        
            <Card className="bg-secondary shadow">
              
              
              <div>
              <Form>
                <div className="pl-lg-5" style={{marginRight:'-120%'}}>
                
                    <br></br>
                  
                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                    <Label style={{marginTop:'10px'}}>
                    SENDER MOBILE NUMBER	                   
                     </Label>
                    <Input
                        style={{marginBottom:"-20px"}}
                        className="form-control-alternative"
                        defaultValue=""
                        id="input-NUMBER"
                        placeholder=""
                        type="Text"
                        
                        maxLength={20}
                        onChange={(event) => setMobile(event.target.value)}
                        />
                        
                        </Row>
                        </FormGroup>
                    </Col>

                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                      
                    </Label>
                    
                        <span>
                       Number Of Digits:{digitCount}
                        </span>
                        </Row>
                        </FormGroup>
                    </Col>

                   

                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                      
                    </Label>
                    
                        <span  style={{ fontWeight: 'bold' }}>
                          OR
                        </span>
                        </Row>
                        </FormGroup>
                    </Col>

                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                    <Label style={{marginBottom:"-100px"}}>
                    RECIPIENT MOBILE
                    NUMBER/ACCOUNT
                    NUMBER                   
                     </Label>
                    <Input
                        style={{marginBottom:"-20px"}}
                        className="form-control-alternative"
                        defaultValue=""
                        id=" InputNumber"
                        placeholder=""
                        type="text"
                       
                        maxLength={20}
                        onChange={""}
                        />
                        
                        </Row>
                        </FormGroup>
                    </Col>

                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                      
                    </Label>
                    
                        <span>
                       Number Of Digits:{digitCount1}
                       
                        </span>
                        </Row>
                        </FormGroup>
                    </Col>
                    
                   
                   

                   
                    <Col lg="11">
                    <FormGroup>
                        <Row lg="2" style={{ width: '38%'}}>
                    
                    <Label >
                                      
                    </Label>
                    <div>
                               
                    <button
                                    class="btn btn-primary"
                                    type="button"
                                >
                                  Cancel
                                </button>
                                <Button onClick={getBene}>Submit</Button>
                            </div>
                        
                        </Row>
                        </FormGroup>
                    </Col>
                </div>
                
            </Form>
</div>
            </Card>
         
      </Container>
    </>
  );
};

export default Dmt;
