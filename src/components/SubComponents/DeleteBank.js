import {React, useState} from 'react';
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
    
  } from 'reactstrap';
export default function DeleteBank(props) {
    const settlementDetails = props.settlementDetails;
    const [bankAccOptions, setBankAccOptions] = useState([]);
    const [details, setDetails] = useState({bankAccNo:"",mobile : "", bankName : "", ifscCode : "", accName:""});

   
    const handleTypeSelect = (e) =>{
        const { name, value } = e.target;
        const beneAccounts = settlementDetails.settlementDetails;
        
        const results = beneAccounts.filter((item) => {
            return item.settlementType.toLowerCase() === (value.toLowerCase());
        });  
        setBankAccOptions(results); 
        console.log(bankAccOptions);
    }

    const handleAccSelect = (e) =>{
        const val = e.target.value;
        setDetails({
            bankAccNo : bankAccOptions[val].accountNo,
            mobile : bankAccOptions[val].mobileNo,
             bankName : bankAccOptions[val].bankName,
              ifscCode : bankAccOptions[val].ifscCode,
               accName:bankAccOptions[val].accountName})
    }

    return (
        <div>

            <Form id="deleteBankForm" name="deleteBankForm">
                <div className="pl-lg-5"style={{marginRight:'-130%'}}>
                <Col lg="10">
                    <Row lg="5">
                    
                    <Label>
                    Settlement Account Type
        
                    </Label>
                    <Input onChange={handleTypeSelect}
                       type="select" name="accountType" id="accountType">

                       <option>SELECT </option>
                       {settlementDetails && settlementDetails.data.map((key)=>{
                            return <option value={key.mode}>{key.Display_name}</option>
                        })}

                   </Input>
                         </Row>
                         </Col>
                    <br></br>

                    <Col lg="12">
                    <FormGroup>
                    <Row lg="6">
                    
                        <Label>
                        Bank A/C No.        
                        </Label>
                        <Input className="" name="bankAcc" id="bankAcc" type="select" onChange={handleAccSelect}>
                            <option>Select Bank A/C No./Beneficiary name/Bank Name</option>
                            {bankAccOptions && bankAccOptions.map((key, index)=>{
                            return <option value={index}>{key.accountNo} - {key.accountName} - {key.bankName}</option>
                        })}
                        </Input>
                            
                            
                    </Row>
                    </FormGroup>
                    </Col>

                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                    Contact No.         
                    </Label>
                    <Input
                        className="" value={details.mobile}
                        id="input-AMOUNT" readOnly
                        type="AMOUNT" maxLength={10}
                        />
                        </Row>
                        </FormGroup>
                    </Col>

                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                    Bank Name                 
                       </Label>
                    <Input
                        className="" value={details.bankName}
                        id="input-AMOUNT"
                        type="AMOUNT" readOnly
                        />
                        </Row>
                        </FormGroup>
                    </Col>

                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                    IFSC Code.                     
                    </Label>
                    <Input
                        className="" value={details.ifscCode}
                        id="input-AMOUNT"
                        type="AMOUNT" readOnly
                        />
                        </Row>
                        </FormGroup>
                    </Col>

                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                    A/C Holder Name                       
                    </Label>
                    <Input
                        className="" value={details.accName}
                        id="input-AMOUNT"
                        type="AMOUNT" readOnly
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
                                   Delete
                                </button>
                            </Col>
                            
                        </FormGroup>
                    </Col>
                </div>
                
            </Form>
        </div>
    )
}
