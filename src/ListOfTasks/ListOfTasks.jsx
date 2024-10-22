import React, { useState, useEffect } from "react";
import axios from 'axios';

const ListOfTasks = () => {
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [tasks, setTasks] = useState([]); 

  useEffect(() => {
    const userToken = localStorage.getItem('accessToken');
    const userEmail = localStorage.getItem('email');
    
    if (!userToken || !userEmail) {
      setError('Veuillez vous reconnecter');
      return; 
    }

    setToken(userToken);
    setEmail(userEmail);
    
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/task/seetask', 
          { email }, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            withCredentials: true
          }
        );

        if (response.status === 200) {
          setTasks(response.data.task); 
          setError(null);
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

    fetchData(); 
  }, [token, email]);

  return (
    <>
      <h1>Liste des Tâches</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>} 
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>{task.title}</li> // Affiche les tâches
          ))
        ) : (
          <li>Aucune tâche trouvée.</li>
        )}
      </ul>
    </>
  );
};

export default ListOfTasks;
