import React, { useState, useEffect } from 'react';
import { Container } from 'reactstrap';
import axios  from 'axios';
const RedirectToAnotherTab = () => {
const [storedData, setStoredData] = useState(null);
const [error, setError] = useState(null);


useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem('apiData');
    if (dataFromLocalStorage) {
        const parsedData = JSON.parse(dataFromLocalStorage);
        setStoredData(parsedData);
      }
  }, []);

  const aepsTokenGen = async () => {
    setError(null);
    try {
      const response = await axios.post('http://localhost:8080/AEPS/generatetoken',{
        AgentID: storedData.agentId, 
        agentAuthId: 'Test252132',
        agentAuthPassword: 'z7u61bx7el',
        apiId: '10029',
        retailerId: storedData.fulAgentId,
        pipe: '',
    });
      const json = await response.data;
      if (json.errorCode === '00' && json.errorMsg === 'Success') {
        const apiData = JSON.stringify(json);
        localStorage.setItem('apiData', apiData);
        const redirectUrl = `http://localhost:8080/AEPS/login?token=${json.data.token}`;
        window.open(redirectUrl, '_blank');
      }else {
        setError('API Error: Invalid response format');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <Container>
    <div>
   
      <br />
      <br />
      <button onClick={aepsTokenGen}>AEPS</button>
    </div>
    </Container>
    </>
  );
};

export default RedirectToAnotherTab;
