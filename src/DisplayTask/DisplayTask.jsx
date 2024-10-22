import React from "react";
import './style.css'
import Done from "../Done/Done";

const Displaytask = ({ task, refreshTasks }) =>{

    return(
        <>
        
        <div className="task">
        <h2 className="title_task">{task.title}</h2>
        <p className="desc_task">{task.description}</p>
        <div className="xp_done">
        <p className="xp">+{task.xp}XP</p>
            <Done taskID={task._id}  refreshTasks={refreshTasks}/>
        </div>
        </div>
        </>
    )
}

export default Displaytask;