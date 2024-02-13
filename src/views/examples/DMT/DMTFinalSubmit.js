import {React, useState,useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import sha1 from 'js-sha1';

import {
    Button,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    Label,
    Container,
    Card,
  } from 'reactstrap';
  import UserHeader from 'components/Headers/UserHeader.js';
export default function WalletTopup() {
    
    

    const location = useLocation();
    const beneData = location.state?.recipientData || "No Data";
    const [paymentType, setPaymentType] = useState("2");
    const [storedData, setStoredData] = useState(null);
   // const senderDetails = location.state?.recipientData || "No Data";
    const [tpin, setHashedValue] = useState('');

    const sha1JavaStyle = (text) => {
        const encodedText = unescape(encodeURIComponent(text)); // Convert to ISO-8859-1
        return sha1(encodedText);
      };
      
      const handleTpinHash = (inputTpin) => {
        const hashedResult = sha1JavaStyle(inputTpin);
        setHashedValue(hashedResult);
      };
      
      

  const handleInputChange = (e) => {
    const { name,type,checked,value } = e.target;

    if (type === 'checkbox') {
        const checkboxValue = checked ? 1 : 0;
        setFormData({ ...formData, [name]: checkboxValue });
      }else{
        setFormData({ ...formData, [name]: value });
      }
  };

  const handleRadioChange = (event) => {
    alert("In paymentType condition : "+event.target.value);
    setPaymentType(event.target.value);
  };

    const [formData, setFormData] = useState({
        senderMobile: '',
        availableLimit: '',
        recipientMobile: '',
        recipientName: '',
        recipientAccount: '',
        amount: '',
        fee: '',
        totalAmount: '',
        serviceAssurance:'',
        remark: '',
        otp: '',
        tpin:'',
      });



  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem('apiData');
    if (dataFromLocalStorage) {
        const parsedData = JSON.parse(dataFromLocalStorage);
        setStoredData(parsedData);
      }
  }, []);
  

  // final dmt submit

   const initiateTransaction = async () => {
    alert(storedData.Key);
    try {
      const response = await axios.post('http://localhost:8989/BANKITMRA_New/resources/AESAPI/v1/InitiateTransaction',{
        "SenderId" :beneData.mobile,
        "AgentID": storedData.agentId,
        "tpin":formData.tpin,
        "TxnAmount":formData.totalAmount,
        "TxnType":paymentType,
        "Ifsc":beneData.ifsc,
        "Key": storedData.txn_key,
        "BeneAccount":beneData.account,
        "RecipientId":beneData.mobile,
        "BankName":beneData.BankName,
        "BeneMobile":beneData.mobile,
        "SenderName":storedData.agentName,
        "BeneName":beneData.name,
        "serviceAssurance":formData.serviceAssurance,
        "Remark":formData.remark,
        
    });
      const apiResponse = response.data;
      alert(apiResponse.message);
      if(apiResponse.status==="00"){
        return true;
      }
    } catch (error) {
      console.error('Error fetching data from API:', error);
      return false;
    }
    return false;
  };  

  const validateFormData = () =>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    if(formData.amount===null||formData.amount===""){
        alert("Please Enter Amount");
        document.walletLoadForm.requestAmount.focus(); 
       // setAmountError(true);
       // document.walletLoadForm.requestAmount.style.border = '1px solid red';
        return false;
    }
    if(formData.amount<100){
        alert("Amount should be greater than 99");
        document.walletLoadForm.requestAmount.focus(); 
        document.walletLoadForm.requestAmount.value=''; 
       // document.walletLoadForm.requestAmount.style.border = '1px solid red';
        return false;
    }
    if(formData.paymentType==="-1"){
        alert("Please Select Payment Mode");
        document.walletLoadForm.paymentType.focus();
        return false;
    }

    if(formData.depositorName===null||formData.depositorName===""){
        alert("Please Enter Depositor Name");
        document.walletLoadForm.depositorName.focus();
        return false;
    }
    if(formData.remark===null||formData.remark===""){
        alert("Please Enter Remark");
        document.walletLoadForm.remark.focus();
        return false;
    }
    return true;
  }

 
    return (
       
            <>
             <UserHeader />
                <Container className="mt--9" id='redirect' fluid>
                    <Card>
                        <Form name="walletLoadForm">
                            <div className="pl-lg-5" style={{marginRight:'-100%'}}>

                                <Col lg="12">
                                    <FormGroup>
                                        <Row lg="6">
                                            <Label>SENDER MOBILE NUMBER<span style={{ color: 'red' }}> *</span></Label>
                                                <Input type="text" className="form-control" name="senderMobile" value={beneData.mobile} id="senderMobile" onChange={handleInputChange} ></Input>
                                        </Row>
                                    </FormGroup>
                                </Col>
                                <Col lg="12">
                                    <FormGroup>
                                        <Row lg="6">
                                            <Label>SENDER REMAINING LIMIT<span style={{ color: 'red' }}> *</span></Label>
                                            <Input className="form-control" name="availableLimit" value={beneData.availableLimit} id="availableLimit" type="text" onChange={handleInputChange} />
                                        </Row>
                                    </FormGroup>
                                </Col>

                                <Col lg="12">
                                        <FormGroup>
                                            <Row lg="6">
                                                <Label>RECIPENT MOBILE NUMBER<span style={{ color: 'red' }}> *</span></Label>
                                                    <Input className="form-control" name="recipientMobile" id="recipientMobile" type="text" value={beneData.mobile} placeholder="Enter Recipient Mobile" onChange={handleInputChange}/>
                                            </Row>
                                        </FormGroup>
                                </Col>

                                <Col lg="12">
                                        <FormGroup>
                                            <Row lg="6">
                                                <Label>RECIPENT NAME<span style={{ color: 'red' }}> *</span></Label>
                                                    <Input className="form-control" name="recipientName" id="recipientName" type="text" value={beneData.name} placeholder="Enter Recipient Name" onChange={handleInputChange}/>
                                            </Row>
                                        </FormGroup>
                                </Col>

                                <Col lg="12">
                                        <FormGroup>
                                            <Row lg="6">
                                                <Label>RECIPENT ACCOUNT NO.<span style={{ color: 'red' }}> *</span></Label>
                                                    <Input className="form-control" name="recipientAccount" id="recipientAccount" type="text" value={beneData.account} placeholder="Enter Recipient Account" onChange={handleInputChange}/>
                                            </Row>
                                        </FormGroup>
                                </Col>




                                <Col lg="12">
                                        <FormGroup>
                                            <Row lg="6">
                                                <Label>TRANSFER AMOUNT<span style={{ color: 'red' }}> *</span></Label>
                                                    <Input className="form-control" name="amount" id="amount"type="text" placeholder="Enter Amount" onChange={handleInputChange}/>
                                            </Row>
                                        </FormGroup>
                                </Col>

                                    
                                <Col lg="12">
                                        <FormGroup>
                                            <Row lg="6">
                                                <Label>BANKIT FEE<span style={{ color: 'red' }}> *</span></Label>
                                                    <Input className="form-control" name="fee" id="fee" type="text" placeholder="0" onChange={handleInputChange}/>
                                            </Row>
                                        </FormGroup>
                                </Col>

                                <Col lg="12">
                                        <FormGroup>
                                            <Row lg="6">
                                                <Label>TOTAL AMOUNT<span style={{ color: 'red' }}> *</span></Label>
                                                    <Input className="form-control" name="totalAmount" id="totalAmount" type="text" placeholder="" onChange={handleInputChange}/>
                                            </Row>
                                        </FormGroup>
                                </Col>
                            
                                <Col lg="12">
                                        <FormGroup>
                                            <Row lg="6">
                                                <Label>REMARKS<span style={{ color: 'red' }}> *</span></Label>
                                                    <Input className="form-control" name="remark" id="remark" type="text" placeholder="Enter remark" onChange={handleInputChange}/>
                                            </Row>
                                        </FormGroup>
                                </Col>

                                <Col lg="12">
                                        <FormGroup>
                                            <Row lg="6">
                                                <Label>TRANSACTION PIN<span style={{ color: 'red' }}> *</span></Label>
                                                    <Input className="form-control" name="tpin" id="tpin" type="password" autocomplete="off" placeholder="Enter Transaction Pin" onChange={handleInputChange}/>
                                            </Row>
                                        </FormGroup>
                                </Col>

                                <Col lg="4">
                                        <FormGroup>
                                            <Row lg="8" className="d-flex justify-content-end">
                                                <div className="w-100" style={{ wordWrap: 'break-word' }}>
                                                    <span>
                                                        <input type="checkbox" className="" name="serviceAssurance" id="serviceAssurance" value="1" required="required" onChange={handleInputChange}/>
                                                        &nbsp;&nbsp; I as a bankit
                                                        retailer, confirm that I have downloaded and filled the form on
                                                        behalf of the customer. At any given point of time when I am
                                                        asked to provide details regarding this transaction, I will
                                                        provide.
                                                    </span>
                                                </div>
                                            </Row>
                                        </FormGroup>
                                </Col>

                                <Col lg="5">
                                    <FormGroup>
                                        <Row lg="6" className="d-flex justify-content-center align-items-center">
                                        <div>
                                        <input  type="radio" name="paymentType" value="2"checked={paymentType === '2'}onChange={handleRadioChange} />
                                            <Label htmlFor="impsRadio">IMPS</Label>
                                        </div>
                                        <div>
                                        <input  type="radio" name="paymentType" value="1"checked={paymentType === '1'}onChange={handleRadioChange} />
                                            <label htmlFor="neftRadio">NEFT</label>
                                        </div>
                                        </Row>
                                    </FormGroup>
                                </Col>



                                
                                <Col lg="4">
                                    <FormGroup>
                                        <Row lg="6" className="d-flex justify-content-center align-items-center">
                                            <div>
                                                <Button  color="primary" className="btn btn-primary" type="button" style={{ width: '200px' }}  onClick={initiateTransaction}>PAY NOW</Button>
                                            </div>
                                        </Row>
                                    </FormGroup>
                                </Col>
                            </div>
                                
                        </Form>
                    </Card>
                </Container>
            </>
       
    )
}
