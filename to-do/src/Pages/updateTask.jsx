import React, { useEffect, useState } from 'react'
import { addTask, editTask, singleTask } from '../Service/taskService'

export default function UpdateTask({update,setUpdate,id,setId}) {

    const [assignedTo,setAssignedTo]=useState('')
    const[ status,setStatus]=useState('Started')
    const[dueDate,setDueDate]=useState('')
    const[priority,setPriority]=useState('Low')
    const[description,setDescription]=useState('')

    useEffect(()=>{
        getTask()
    },[])

    async function getTask(){
        const result=await singleTask(id)
        console.log("Update Task: ",result)
        const task=result.data
        setAssignedTo(task[0].assignedTo)
        setStatus( task[0].status) 
        setDueDate( task[0].dueDate.slice(0,10)) 
        setPriority( task[0].priority)
        setDescription(task[0].description)
    }

    async function onUpdateTask(){
        const result=await editTask(id, assignedTo,status,dueDate,priority,description)
        setUpdate(false)
    }
    

  return (
    <div className='position-fixed bg-light bg-opacity-25 p-2 top-50 start-50 translate-middle min-vh-75 '>
        <h2>Update Task</h2>
        <div className=' flex-fill flex-column '>
        <button className='position-absolute top-0 end-0' onClick={()=>{
            setUpdate(false)
        }}><i class="ri-close-large-line"></i></button>
        <div className=' container '>
        <div className='row p-2 '>
            <div className='col'>
                Assign To <br />
                <input value={assignedTo} type="text" className='w-100 p-1' onChange={(e)=>{
                    setAssignedTo(e.target.value)
                }}/>
            </div>
            <div className='col'>
                Status <br />
                <select value={status} name="" id="" className='w-100 p-1'
                onChange={(e)=>{
                    setStatus(e.target.value)
                }}>
                    <option value="Started">Started</option>
                    <option value="Completed">Completed</option>
                    <option value="Not Completed">Not Completed</option>
                </select>
            </div>
        </div>
        <div className='row p-2'>
            <div className='col '>
                Due date <br />
                <input value={dueDate} className='w-100 py-1 px-4' type="date"  onChange={(e)=>{
                    setDueDate(e.target.value)
                }}/>
            </div>
            <div className='col'>
                Priority <br />
                <select value={priority} name="" id="" className='w-100 p-1' onChange={(e)=>{
                    setPriority(e.target.value)
                }}>
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                </select>
            </div>
        </div>

        <div className='row p-2'>
            <div className='col '>
                Comments <br />
                <textarea value={description} name="" id="" cols="100" rows="5" onChange={(e)=>{
                    setDescription(e.target.value)
                }}></textarea>
            </div>
        </div>
        <div className='p-2'>
            <button className='btn btn-success' onClick={onUpdateTask}>Submit</button>
            </div>
        </div>
        </div>
    </div>
  )
}
