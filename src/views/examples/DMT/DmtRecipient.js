import {React, useState,useEffect} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import {
  Button,
  Table,
  Container,
  
} from 'reactstrap';
import UserHeader from 'components/Headers/UserHeader.js';



const DmtRecipient = (props) => {
  const navigate = useNavigate();
  const [Key, setKey] = useState('');
  const [AgentID, setAgentId] = useState('');
  const [recipientData, setRecipientData] = useState(null);

  useEffect(() => {
    if(recipientData != null){
      navigate('/admin/dmt-submit',{ state: { recipientData}  });
    }
    
    const dataFromLocalStorage = localStorage.getItem('apiData');
    if (dataFromLocalStorage) {
      const parsedData = JSON.parse(dataFromLocalStorage);
      setAgentId(parsedData.agentId);
      setKey(parsedData.txn_key);      
    }
  }, [recipientData]);

  const location = useLocation();
  const beneData = location.state?.parsedApiData?.BeneList || "No Data";
  const beneLimit = location.state?.parsedApiData?.SenderLimitDetails || "No Data";
  
  const initiateTransaction = (e) => {
    const i = e.target.value;
    const data = beneData[i];
    setRecipientData({
      mobile: data.mobile,
      name: data.name,
      ifsc: data.ifsc,
      account: data.account,
      Key: Key,
      AgentID: AgentID,
      availableLimit:beneLimit.balance,
      BankName : data.bankName,
    });
  };
  

  return (
    <>
      <UserHeader />
      <Container className="mt--9" fluid >
        
      <div style={{  overflowY: 'auto',maxHeight: '30rem'  }}>
  <Table>
  <thead>
    <tr>
      <th style={{ fontWeight: 'bold', fontSize: '14px'}}>SN</th>
      <th style={{ fontWeight: 'bold', fontSize: '14px'}}>Recipient Name</th>
      <th style={{ fontWeight: 'bold', fontSize: '14px'}}>Bank Name</th>
      <th style={{ fontWeight: 'bold', fontSize: '14px'}}>IFSC Code</th>
      <th style={{ fontWeight: 'bold', fontSize: '14px'}}>Account No</th>
      <th style={{ fontWeight: 'bold', fontSize: '14px'}}>Mobile No</th>
      <th style={{ fontWeight: 'bold', fontSize: '14px'}}>Pay By IFSC</th>
      <th style={{ fontWeight: 'bold', fontSize: '14px'}}>Delete Recipient</th>
    </tr>
  </thead>
  <tbody>
  {beneData && beneData.map((row, index) => (
    <tr row={row.name}>
    <th scope="row">{index + 1}</th>
    <td>{row.name}</td>
    <td>{row.bankName}</td>
    <td>{row.ifsc}</td>
    <td>{row.account}</td>
    <td>{row.mobile}</td>
    <Button value={index} style={{color:'skyblue'}} onClick={initiateTransaction}>pay now</Button>
    <td>DELETE</td>
  </tr>
  ))}
  </tbody>
</Table>
</div>
         
      </Container>
    </>
  );
};

export default DmtRecipient;
