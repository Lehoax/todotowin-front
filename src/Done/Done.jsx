import React, { useState, useEffect } from "react";
import axios from "axios";
import { useXP } from '../helpers/XpContext';


const Done = ({ taskID, refreshTasks }) => {
  const serveurURL = process.env.REACT_APP_SERVER_URL;
  const { xp, setXP } = useXP();
  const [doneTask, setDoneTask] = useState(false);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem('accessToken');
    const userEmail = localStorage.getItem('email');
    
    if (!userToken || !userEmail) {
      setError('Veuillez vous reconnecter');
      return;
    }
    
    setEmail(userEmail);
    setToken(userToken);
  }, []); 

  const fetchData = async () => {
    try {
      const response = await axios.post(serveurURL+'/task/donetask', 
        { email, taskId: taskID }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setXP(response.data.userXp)
        setError(null);
        console.log("Task marked as done");
        refreshTasks();
      }
    } catch (err) {
      console.log(err);

      if (err.response) {
        setError('Veuillez vous reconnecter');
      } else if (err.request) {
        setError('Erreur réseau ou serveur.');
      } else {
        setError('Erreur inconnue.');
      }
    }
  };

  const handleSubmit = () => {
    setDoneTask(!doneTask); 
    fetchData();
  };

  return (
    <input 
      type="checkbox" 
      checked={doneTask} 
      onChange={handleSubmit} 
    />
  );
};

export default Done;
