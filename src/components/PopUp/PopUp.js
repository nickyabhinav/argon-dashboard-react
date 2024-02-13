import React from "react";
import classes from "./PopUp.module.scss";


const PopOp = (props) => {
  const { onClose } = props; // destructuring
  const addMoney = () =>{
    console.log('Add Money Called');
  }

 

return (
		<div className={classes["root"]} onMouseLeave={onClose}>
				<div class="row" style={{width: '100%', marginLeft: '0%'}}>
					<div class="col-2" style={{border:'1px solid lightgray' , borderRadius:'5px 0px 0px 5px'}}>
           
           <div className={classes['heading']} style={{cursor:'pointer',height: '10%',padding: '5%',borderRadius: '10px'}} onClick={addMoney} > <img
                      alt="..."
                      src={require("../../assets/img/theme/addMoney.png")}
                      style={{ width: '20%', height: 'auto',  }}
                    />Add Money
           </div>
            
            
             <div className={classes['heading2']}style={{cursor:'pointer', fontSize: 'smaller'}}>
             <div className={classes['borderBox']} style={{color: 'black'}}>
            <li>Taktal Vallet Load</li>
            <li>Wallet Upload/Recharge</li>
            <li>Wallet To Wallet Topup</li>
            </div>
           </div>
          </div>

					
         <div class="col-4" style={{border:'1px solid lightgray', }}>
          <div className={classes['heading']} style={{cursor:'pointer',height: '10%',padding: '2%',borderRadius: '10px'}} onClick={addMoney} >  <img
                      alt="..."
                      src={require("../../assets/img/theme/document&drivers.png")}
                      style={{ width: '10%', height: '130%'}}
                    />DOCUMENTS & DRIVERS
         


           </div>
           <div className={classes['heading2']}style={{cursor:'pointer', fontSize: 'smaller', color:'black'}}>
            <li>Download Id Card</li>
            <li>Download Certificate</li>
            <li>Download TDS Exemption Certificate</li>
            <li>Download Commission Structure</li>
            <li>Download Morpho Driver</li>
            <li>Download mATM-F Driver</li>
            <li>Download mPOS Form</li>
            <li>Download Customer Chargeback Consent Form</li>
          </div>
          </div>

					<div class="col-3" style={{border:'1px solid lightgray'}}>
          <div className={classes['heading']} style={{cursor:'pointer',height: '10%',padding:'3%',borderRadius: '10px'}} onClick={addMoney} ><img
                      alt="..."
                      src={require("../../assets/img/theme/Report.png")}
                      style={{ width: '10%', height: 'auto', }}
                    /> REPORTS
          

          </div>
          <div className={classes['heading2']}style={{cursor:'pointer', fontSize: 'smaller' ,color:'black'}}>
            <li>Business Dashboard</li>
            <li>My Account Statements</li>
            <li>Download Statements</li>
            <li>AEPS Statements</li>
            <li>Customer/Recipient Statemen</li>
            <li>Cards Issuance Statements</li>
          </div>
          </div>

					<div class="col-3" style={{border:'1px solid lightgray' , borderRadius:'0px 5px 5px 0px'}}>
          <div className={classes['heading']} style={{cursor:'pointer',height: '10%',padding: '3%',borderRadius: '10px'}} onClick={addMoney} >
          <img
                      alt="..."
                      src={require("../../assets/img/theme/myProfile.jpg")}
                      style={{ width: '10%', height: 'auto'}}
                    /> MY PROFILE
          

          </div>
          <div className={classes['heading2']}style={{cursor:'pointer', fontSize: 'smaller' ,color:'black'}}>
            <li>Account Information</li>
            <li>Password Reset</li>
            <li>Transaction Pin Reset</li>
            <li>Pin Reset</li>
            <li>Training Request</li>
            <li>Call Back Request</li>
            </div>
          </div>
				</div>
		</div>
	);
};

export default PopOp;
