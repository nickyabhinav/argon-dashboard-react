import {React, useState, useEffect} from 'react';

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
export default function RegisterBank(props) {
    const bankList = props.bankList;
    const agentData = props.agentData;

    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [digitCount, setDigitCount] = useState(0);

    const initialFormData = {
        accountType: '',
        mobileNum: '',
        accHolderName: '',
        accNum: '',
        cnfAccNum: '',
        bankName: 'SELECT',
        ifscCode: ''
      };

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if(name === "cnfAccNum"){
            setDigitCount(value.length);
        }
    };
   

    const handleSelect = (e) => {
        const {name, value} = e.target;
        
        if(value === "-1"){
            setFormData({ ...formData, 'ifscCode' : '', [name]: value });
            return;
        }
        handleInputChange(e);
        
        const results = bankList.filter((item) => {
            return item.bname.toLowerCase() === (value.toLowerCase());
        });
        if(results){
            setFormData({ ...formData, 'ifscCode' : results[0].ifscCode, [name]: value });
        }
        
            
    }

    function clearAll(){
        setFormData(initialFormData);
    }

    const validateFormData = () =>{
        const mobileRegex = /^[6-9]\d{9}$/;
    
        if(formData.accountType==="" || formData.accountType==="-1"){
            alert("Please Select Settlement Account Type");
            document.registerBankForm.accountType.focus();
        //   document.walletLoadForm.routingVendor.style.border = '1px solid red';
            return false;
        }
        if(formData.mobileNum===null||formData.mobileNum===""){
            alert("Please Enter Mobile Number");
            document.registerBankForm.mobileNum.focus();
            return false;
        }
        if (!mobileRegex.test(formData.mobileNum)) {
            alert("Please Enter Valid Mobile number");
            document.registerBankForm.mobileNum.focus();
            return false;
        }
        if(formData.accHolderName===null ||formData.accHolderName===""){
            alert("Please Enter Account Holder Name");
            document.registerBankForm.accHolderName.focus();
            return false;
        }
        if(formData.accNum===null||formData.accNum===""){
            alert("Please Enter Bank Account Number");
            document.registerBankForm.accNum.focus();
            return false;
        }
        if(formData.cnfAccNum===null||formData.cnfAccNum===""){
            alert("Please Confirm Your Bank Account Number");
            document.registerBankForm.cnfAccNum.focus();
            return false;
        }
        if(formData.cnfAccNum !== formData.accNum){
            alert("Account Number Mismatch");
            document.registerBankForm.cnfAccNum.focus();
            return false;
        }
        if(formData.bankName===""||formData.bankName==="-1"){
            alert("Please Select Bank Name");
            document.registerBankForm.bankName.focus();
            return false;
        }
        return true;
    }

    function handleVerifyBeneficiary(e){
        if(!validateFormData){
            e.preventDefault();
        }
        console.log("validated");
        const url = baseUrl + "/account-verification";
        const reqObj = {
            "bankAccount":formData.cnfAccNum,
            "beneMobileNo":formData.mobileNum,
            "agentId":agentData.agentId,
            "beneName":formData.accHolderName,
            "agentMobileNo":agentData.mobileNumber,
            "agentName":agentData.agentName,
            "bankName":formData.bankName,
            "ifsc":formData.ifscCode,
            "key":agentData.txn_key
        };
        const data = apiCall(e, url, reqObj);
        handleResponse(data);
        e.preventDefault();
    }

    const handleResponse = (data) => {
        return <>
            <dialog></dialog>
        </>
    }
    const apiCall = async (e, url, reqObj) => {
        e.preventDefault();
        console.log("inside api call" + url + " | " +  JSON.stringify(reqObj));
        try{
          const response = await fetch(url , {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(reqObj)
          });
      
          const json = await response.json();
          return json;
          
        } catch (error) {
        return alert("error");
      }
    }


    return (
       
        <div >
            <Form id="registerBankForm" name="registerBankForm">
                <div className="pl-lg-5" style={{marginRight:'-130%'}}>
                <Col lg="10">
                    <Row lg="5">
                    
                    <Label>
                    Settlement AccountType<span style={{ color: 'red' }}> *</span>
        
                    </Label>
                    <Input
                        type="select" name="accountType" id="accountType"
                        className="" value={formData.accountType} onChange={handleInputChange}>

                       <option selected value="-1">SELECT </option>
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
                    Contact No.<span style={{ color: 'red' }}> *</span>      
                    </Label>
                    
                    <Input
                        name="mobileNum" id="mobileNum" value={formData.mobileNum}
                        type="text" onChange={handleInputChange} className=""
                        maxLength={10}
                        />
                        </Row>
                        </FormGroup>
                        </Col>

                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                    A/C Holder Name<span style={{ color: 'red' }}> *</span>        
                    </Label>
                    <Input
                        className="" value={formData.accHolderName}
                        name="accHolderName" id="accHolderName"
                        type="text"
                        onChange={handleInputChange}
                        />
                        </Row>
                        </FormGroup>
                    </Col>

                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                    Bank A/C No.<span style={{ color: 'red' }}> *</span>            
                       </Label>
                    <Input
                        className="" value={formData.accNum}
                        name="accNum" id="accNum"
                        type="AMOUNT" onChange={handleInputChange}
                        maxLength={20}
                        />
                        </Row>
                        </FormGroup>
                    </Col>

                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                    <Label style={{marginBottom:"-100px"}}>
                    Confirm Bank A/C No.<span style={{ color: 'red' }}> *</span>                   
                    </Label>
                    <Input
                        style={{marginBottom:"-20px"}}
                        className=""
                        value={formData.cnfAccNum}
                        name="cnfAccNum" id="cnfAccNum"
                        type="text"
                        maxLength={20}
                        onChange={handleInputChange}
                        />
                        
                        </Row>
                        </FormGroup>
                    </Col>

                    <Col lg="12">
                        <FormGroup>
                            <Row lg="6">
                    
                                <Label>
                        
                                </Label>
                        
                                <FormText>
                                Number Of Digits : {digitCount}
                                </FormText>
                            </Row>
                        </FormGroup>
                    </Col>
                    
                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                            <Label>
                            Bank Name<span style={{ color: 'red' }}> *</span>                     
                            </Label>
                            <Input
                                type="select" onChange={handleSelect} name="bankName" className="" id="bankName"> value={formData.bankName}

                                <option selected value="-1">SELECT </option>
                                {bankList && bankList.map((key) => { 
                                    return (key.accVerAvailabe === 'Y') &&  <option >{key.bname}</option>
                                })}
                                
                                
                            </Input>
                        </Row>
                        </FormGroup>
                    </Col>

                    <Col lg="12">
                        <FormGroup>
                        <Row lg="6">
                    
                    <Label>
                    IFSC Code<span style={{ color: 'red' }}> *</span>                  
                     </Label>
                    <Input
                        name="ifscCode" id="ifscCode" className=""
                        type="text" onChange={handleInputChange}
                        value={formData.ifscCode}
                    />
                        </Row>
                        </FormGroup>
                    </Col>

                   

                   
                    <Col lg="12" style={{paddingLeft:"10rem"}}>
                        <FormGroup>
                            <Col lg="6">
                                <button style={{paddingInline:"4rem"}}
                                class="btn btn-primary" 
                                type="button"
                                onClick={clearAll}
                                >
                                Cancel
                                </button>
                                <button
                                    class="btn btn-primary"
                                    type="button"
                                    onClick={handleVerifyBeneficiary}
                                >
                                   Register Beneficiary
                                </button>
                                <button
                                    class="btn btn-primary"
                                    type="button"
                                    onClick={handleVerifyBeneficiary}
                                >
                                   Verify Beneficiary
                                </button>
                            </Col>
                            
                        </FormGroup>
                    </Col>
                </div>
                
            </Form>
        </div>
       
    )
}
