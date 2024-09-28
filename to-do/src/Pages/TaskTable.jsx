import React, { useEffect, useState } from 'react';
import { deleteTask, getTasks } from '../Service/taskService';
import addNewTask from './addNewTask';

const TaskTable = ({show,setShow,update,setUpdate,setId,id}) => {
  const [tasks,setTasks]=useState([]);
  

  useEffect(()=>{
    getAllTasks()
  },[tasks])

  async function getAllTasks(){
    const result=await getTasks()
    console.log(result)
    if(result.status=="success"){
        console.log("Data :",result.data)
        setTasks(result.data)
    }
    
  }

  async function onDeleteTask(taskId){
    const result=await deleteTask(taskId)
  }



  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="card-title">Tasks</h4>
          <div>
            <button className="btn btn-warning mx-2" onClick={()=>{
                setShow(true)
            }}>New Task</button>
            <button className="btn btn-secondary" onClick={()=>{
                getAllTasks()
            }}>Refresh</button> 
            <div className='my-2 position-relative'>
            <span className='position-absolute  end-0'><i class="ri-search-line px-2 "></i></span>
            <input className="rounded-1 " placeholder='Search' type="text" />
            
            
            
            </div>
            
          </div>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Assigned To</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Comments</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.taskId}>
                    <td hidden>{task.taskId}</td>
                  <td>{task.assignedTo}</td>
                  <td>{task.status}</td>
                  <td>{task.dueDate.slice(0,10)}</td>
                  <td>{task.priority}</td>
                  <td>{task.description }</td>
                  <td>
                    <div className="dropdown">
                      <button
                        className="btn btn-light dropdown-toggle"
                        type="button"
                        id={`dropdownMenuButton-${task.taskId}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Actions
                      </button>
                      <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton-${task.taskId}`}>
                        <li className="dropdown-item" value={task.taskId} onClick={()=>{
                            setUpdate(true)
                            setId(task.taskId)
                        }}>Edit </li>
                        <li className="dropdown-item" value={task.taskId} onClick={(e)=>{
                            onDeleteTask(e.target.value)
                        }}>Delete </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between">
            <div>Showing 1 to 4 of 4 entries</div>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item"><a className="page-link" href="#">First</a></li>
                <li className="page-item"><a className="page-link" href="#">Prev</a></li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                <li className="page-item"><a className="page-link" href="#">Last</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

     

    </div>
  );
}




export default TaskTable;
