import React, { useState, useEffect } from "react";
import axios from 'axios';
import Displaytask from "../DisplayTask/DisplayTask";
import nothing from './nothing.png';
import './style.css';

const ListOfTasks = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    setLoading(true); 
    try {
      const userToken = localStorage.getItem('accessToken');
      const userEmail = localStorage.getItem('email');

      if (!userToken || !userEmail) {
        setError('Veuillez vous reconnecter');
        return; 
      }

      const response = await axios.post('http://localhost:3001/api/task/seetask', 
        { email: userEmail }, 
        {
          headers: {
            Authorization: `Bearer ${userToken}` 
          },
          withCredentials: true
        }
      );

      if (response.status === 200) {
        setTasks(response.data.task); 
        setError(null);
      }
    } catch (err) {
      if (err.response) {
        setError('Veuillez vous reconnecter');
      } else if (err.request) {
        setError('Erreur réseau ou serveur.');
      } else {
        setError('Erreur inconnue.');
      }
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []); 

  const refreshTasks = () => {
    fetchData(); 
  };

  return (
    <div id="list_of_task">
      {error && <div style={{ color: 'red' }}>{error}</div>} 
      {loading && <div>Loading...</div>}
      {tasks.length > 0 ? (
        tasks.slice().reverse().map((task) => (
          <Displaytask key={task._id} task={task} refreshTasks={refreshTasks} />
        ))
      ) : (
        <>
          <img id="nothing_img" src={nothing} alt="Aucune tâche" />
          <h4 id="congrat">Félicitations, vous avez complété toutes vos tâches !</h4>
        </>
      )}
    </div>
  );
};

export default ListOfTasks;
