import logo from './logo.svg';
import './App.css';
import TaskTable from './Pages/TaskTable';
import AddNewTask from './Pages/addNewTask';
import { useState } from 'react';
import UpdateTask from './Pages/updateTask';

function App() {
  const [show,setShow]=useState(false);
  const [update,setUpdate]=useState(false);
  const [id,setId]=useState(0);

  return (
    <div >
      <TaskTable show={show} setShow={setShow} update={update} setUpdate={setUpdate} id={id} setId={setId}/>
      {show && <AddNewTask show={show} setShow={setShow}/>}
      {update && <UpdateTask update={update} setUpdate={setUpdate} id={id} setId={setId} />}
    </div>
  );
}

export default App;
