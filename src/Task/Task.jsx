import React, {useState} from "react";
import './style.css';
import add from './add.png'
import back from './left-arrow.png'
import NewTask from "../NewTask/NewTask";
import ListOfTasks from "../ListOfTasks/ListOfTasks";


const Task = () => {
    const [toggleNew, setToggleNew] = useState(false);


    const seeForm = () =>{
        if (toggleNew) {
            setToggleNew(false)
        }else{
            setToggleNew(true)
        }
    }

    const renderContent = () => {
        if (toggleNew) {
          return (
            <>
            <NewTask/>
            <button id="back_btn" onClick={seeForm}><img src={back}/></button>
            </>
          );
        } else {
          return (
            <>
            <ListOfTasks/>
             <button id="add_btn" onClick={seeForm}><img src={add}/></button>
            </>
          );
        }
      };
    
      return (
        <>
          {renderContent()} 
        </>
      );
}

export default Task