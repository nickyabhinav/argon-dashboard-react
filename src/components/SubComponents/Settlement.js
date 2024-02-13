import {React, useState} from 'react';
import {
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Label,
  } from 'reactstrap';
export default function Settlement() {

    const [inputValue, setInputValue] = useState('');
  const [digitCount, setDigitCount] = useState(0);
  
  const handleKeyPress = (e) =>{
    setInputValue(e.target.value);
    setDigitCount(e.target.value.length);
  }
    return (
        <div>



            <Form>
                <div className="pl-lg-5" style={{marginRight:'-130%'}}>
                <Col lg="10">
                    <Row lg="5">
                    
                    <Label>
                    Settlement Type 
        
                    </Label>
                    <Input
                       type="select" name="select" id="exampleSelect">

                       <option>SELECT </option>
                       <option>TYPE-1</option>
                       <option>TYPE-2</option>
                       
                   </Input>
                         </Row>
                         </Col>
                    <br></br>

                    <Col lg="12">
                    <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                    Balance                 
                   </Label>
                    <Input
                        className=""
                        id="input-AMOUNT"
                        type="AMOUNT"
                        />
                        </Row>
                        </FormGroup>
                        </Col>

                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                    Bank A/C No. :        
                    </Label>
                    <Input
                        className=""
                        id="input-AMOUNT"
                        type="AMOUNT"
                        />
                        </Row>
                        </FormGroup>
                    </Col>

                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                    Contact No. :                 
                       </Label>
                    <Input
                        className=""
                        id="input-AMOUNT"
                        type="AMOUNT"
                        />
                        </Row>
                        </FormGroup>
                    </Col>

                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                    Bank Name. :                    
                    </Label>
                    <Input
                        className=""
                        id="input-AMOUNT"
                        type="AMOUNT"
                        />
                        </Row>
                        </FormGroup>
                    </Col>

                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                    IFSC Code. :                       
                    </Label>
                    <Input
                        className=""
                        id="input-AMOUNT"
                        type="AMOUNT"
                        />
                        </Row>
                        </FormGroup>
                    </Col>

                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                    A/C Holder Name *                      
                     </Label>
                    <Input
                        className=""
                        id="input-AMOUNT"
                        type="AMOUNT"
                        />
                        </Row>
                        </FormGroup>
                    </Col>

                    <Col lg="12">
                    <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                    Bankit Fee                  
                   </Label>
                    <Input
                        className=""
                        id="input-AMOUNT"
                        type="AMOUNT"
                        />
                        </Row>
                        </FormGroup>
                        </Col>

                        <Col lg="12">
                    <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                    Amount                   
                   </Label>
                    <Input
                        className=""
                        id="input-AMOUNT"
                        type="AMOUNT"
                        />
                        </Row>
                        </FormGroup>
                        </Col>

                        <Col lg="12">
                    <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                    Transfer Mode                  
                   </Label>
                    <Input
                        className=""
                        id="input-AMOUNT"
                        type="AMOUNT"
                        />
                        </Row>
                        </FormGroup>
                        </Col>

                        <Col lg="12">
                    <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                    Transaction Pin                  
                   </Label>
                    <Input
                        className=""
                        id="input-AMOUNT"
                        type="AMOUNT"
                        />
                        </Row>
                        </FormGroup>
                        </Col>

                   

                   
                    <Col lg="12" style={{paddingLeft:"20rem"}}>
                        <FormGroup>
                        
                            <Col lg="6">
                                <button 
                                    class="btn btn-primary"
                                    type="button"
                                >
                                   Cancel
                                </button>
                                <button
                                    class="btn btn-primary"
                                    type="button"
                                >
                                  Submit
                                </button>
                                
                            </Col>
                            
                        </FormGroup>
                    </Col>
                </div>
                
            </Form>
        </div>
    )
}
