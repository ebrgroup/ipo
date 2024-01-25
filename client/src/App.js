import React, { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

const App = () => {

  const [userData, setUserData] = useState({
    userId: null,
    token: null
  });

  useEffect(() => {
    (async () => {
      await axios.post("/ipo/login", {
        cnic: "1234567890123",
        password: "secretpassword"
      })
      .then(response => {
        setUserData({
          userId: response.data._id,
          token: response.data.token
        });
      }).catch(error => {
        console.error(error);
      })
    })();
  }, []);
  

  return (
    userData && (
      <div className="App">
        <h1>Following data is coming from database:</h1>
        <h2>User Id: </h2>
        <h3>{userData.userId}</h3>
      </div>
    )
  );
}

export default App;
