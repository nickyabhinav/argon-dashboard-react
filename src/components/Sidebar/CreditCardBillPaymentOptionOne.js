import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
    const [bankList, setBankList] = useState(null);
    const [paymentType, setPaymentType] = useState("2");
    const [storedData, setStoredData] = useState(null);
    const [data, setData] = useState(null);

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
        const { name, type, checked, value } = e.target;

        if (type === 'checkbox') {
            const checkboxValue = checked ? 1 : 0;
            setFormData({ ...formData, [name]: checkboxValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const baseUrl = process.env.REACT_APP_BASE_URL;
    

    

    
    const handleSelect = (e) => {
        const {name, value} = e.target;
        
        if(value === "-1"){
            setFormData({ ...formData, 'ifscCode' : '', [name]: value });
            return;
        }
        const results = bankList.filter((item) => {
            return item.bname.toLowerCase() === (value.toLowerCase());
        });
        if(results){
            setFormData({ ...formData, 'ifscCode' : results[0].ifscCode, [name]: value });
        }
        
            
    }

    const handleRadioChange = (event) => {
        alert("In paymentType condition : " + event.target.value);
        setPaymentType(event.target.value);
    };

    const [formData, setFormData] = useState({
        amount: '',
        ccNumber: '',
        ccNumberConfirm: '', 
        mobileNumber: '',
        ifsccode: '',
        bankname: '',
        name: '',
        tpin: '',
        ccType: '',
    });



    useEffect(() => {
        let dataFromLocalStorage = localStorage.getItem('apiData');
        
        if (dataFromLocalStorage) {
            const parsedData = JSON.parse(dataFromLocalStorage);
            setStoredData(parsedData);
        }

        dataFromLocalStorage = localStorage.getItem('bankList');
        if (dataFromLocalStorage) {
            const parsedData = JSON.parse(dataFromLocalStorage);
            console.log(parsedData);
            setBankList(parsedData);
        }
    }, []);



    const initiateTransaction = async () => {
        if (!formData.name ) {
            alert("Please Enter CradHolder Name");
            return false;
        }
       else if (!formData.ccType ) {
            alert("Please Enter CardType");
            return false;
        }
        else if (!formData.ccNumber ) {
            alert("Please Enter CardNumber");
            return false;
        }
      
      
    
        try {
            const response = await axios.post('http://localhost:8080/BANKITMRA_New/resources/AESAPI/CreditCardOptionOne', {
                "AgentID": storedData.agentId,
                "Key": storedData.txn_key,
                "channel": 'Web',
                "amount": formData.amount,
                "transferMode": 'Instant',
                "transferType": 'transferType',
                "settlementType": 'InstantPayout',
                "accountNo": formData.ccNumber,
                "mobileNo": formData.mobileNumber,
                "ifscCode": formData.ifsccode,
                "bankName": formData.bankname,
                "accountName": formData.name,
                "tpin": formData.tpin,
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
    
      const handleCancelClick = () => {
        setFormData({
            amount: '',
            ccNumber: '',
            ccNumberConfirm: '', 
            mobileNumber: '',
            ifsccode: '',
            bankname: '',
            name: '',
            tpin: '',
            ccType: '',
          });

      };

    const validateFormData = () => {

        const mobileRegex = /^[6-9]\d{9}$/;
        if (formData.amount === null || formData.amount === "") {
            alert("Please Enter Amount");
            document.walletLoadForm.requestAmount.focus();

            return false;
        }
        if (formData.amount > 1) {
            alert("Amount should be greater than 99");
            document.walletLoadForm.requestAmount.focus();
            document.walletLoadForm.requestAmount.value = '';

            return false;
        }

        if (formData.name === null || formData.name === "") {
            alert("Please Enter Name");
            document.walletLoadForm.depositorName.focus();
            return false;
        }
        if (formData.bankname === null || formData.bankname === "") {
            alert("Please Enter bank name");
            document.walletLoadForm.remark.focus();
            return false;
        }
        if (formData.ccNumber === null || formData.ccNumber === "") {
            alert("Please Enter bank name");
            document.walletLoadForm.remark.focus();
            return false;
        }
        if (formData.ifsccode === null || formData.ifsccode === "") {
            alert("Please Enter bank name");
            document.walletLoadForm.remark.focus();
            return false;
        }
        return true;
    }


    return (

        <>
            <UserHeader />
            <Container className="mt--9" id='redirect' fluid>
                <Card className='mt--10'>
                    <div className='justify-content-center' style={{ paddingInline: "5rem" }}>

                        <Form name="creaditCardPayment">
                            <FormGroup>
                                <Col>
                                    <h1 style={{ color: "blue" }}>Credit Card Bill Payment</h1>
                                </Col>
                                <br></br>
                                <Col>
                                    <div className='d-flex justify-content-center' >
                                        <h2 style={{ color: "black" }}> Card Details</h2>
                                    </div>
                                </Col>
                            </FormGroup>


                            <FormGroup row>
                                <Col>
                                    <Label>Name (As per this card)<span style={{ color: 'red' }}> *</span></Label>
                                </Col>
                                <Col>
                                    <Input type="text" className="form-control" id="name" value={formData.name} name="name" placeholder="Enter Name" onChange={handleInputChange} ></Input>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col>
                                    <Label>Card Type<span style={{ color: 'red' }}> *</span></Label>
                                </Col>
                                <Col>
                                    <select class="form-control" name="ccType" id="ccType" value={formData.ccType} onChange={handleInputChange} >
                                        <option value="-1">Select Card Type</option>
                                        <option value="RUPAY">RuPay Card</option>
                                        <option value="MASTERCARD">Master Card</option>
                                        <option value="VISA">Visa Card</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col>
                                    <Label>Credit Card Number<span style={{ color: 'red' }}> *</span></Label>
                                </Col>
                                <Col>
                                    <Input className="form-control" name="ccNumber" id="ccNumber" type="text" value={formData.ccNumber} placeholder="Enter Credit Card Number" onChange={handleInputChange} />
                                </Col>
                            </FormGroup>


                            <FormGroup row>
                                <Col>
                                    <Label>Confirm Credit Card Number<span style={{ color: 'red' }}> *</span></Label>
                                </Col>
                                <Col>
                                    <Input className="form-control" name="ccNumberConfirm" id="ccNumberConfirm" type="text" value={formData.ccNumberConfirm} placeholder="Confirm Credit Card Number" onChange={handleInputChange} />
                                </Col>
                            </FormGroup>


                            <FormGroup row>
                                <Col>
                                    <Label>Bank Name<span style={{ color: 'red' }}> *</span></Label>
                                </Col>
                                <Col>
                                <Input
                                type="select"  name="bankName" className="" id="bankName">  onChange={handleInputChange}

                                <option selected value="-1">SELECT </option>
                                {bankList && bankList.map((key) => { 
                                    return (key.accVerAvailabe === 'Y') &&  <option >{key.bname}</option>
                                })}
                                
                                
                            </Input>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col>
                                    <Label>IFSC Code<span style={{ color: 'red' }}> *</span></Label>
                                </Col>
                                <Col>
                                <Input
                        name="ifscCode" id="ifscCode" className=""
                        type="text" onChange={handleInputChange}
                        value={formData.ifscCode}
                    />
                                </Col>
                            </FormGroup>



                            <FormGroup row>
                                <Col>
                                    <Label>AMOUNT<span style={{ color: 'red' }}> *</span></Label>
                                </Col>
                                <Col>
                                    <Input className="form-control" name="amount" id="amount" type="text" maxlength="5" value={formData.amount} placeholder="Enter Amount (&#x20B9;)" onChange={handleInputChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col>
                                    <Label>Mobile Number<span style={{ color: 'red' }}> *</span></Label>
                                </Col>
                                <Col>
                                    <Input className="form-control" placeholder="Enter Mobile Number" value={formData.mobileNumber} name="mobileNumber" id="mobileNumber" maxlength="10" type="text" onChange={handleInputChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col>
                                    <Label>TRANSACTION PIN<span style={{ color: 'red' }}> *</span></Label>
                                </Col>
                                <Col>
                                    <Input className="form-control" name="tpin" id="tpin" type="password" value={formData.tpin} autocomplete="off" placeholder="Enter Transaction Pin" onChange={handleInputChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col>
                                    <div>
                                        <Button color="primary" className="btn btn-primary" type="button" style={{ width: '200px' }} onClick={handleCancelClick} >Cancel</Button>
                                    </div>
                                </Col>
                                <Col >

                                </Col>
                                <Col>
                                    <div>
                                        <Button color="primary" className="btn btn-primary" id="submit-btn" type="button" style={{ width: '200px' }} onClick={initiateTransaction}>Submit</Button>
                                    </div>
                                </Col>
                            </FormGroup>



                        </Form>
                    </div>
                </Card>
            </Container>
        </>

    )
}
