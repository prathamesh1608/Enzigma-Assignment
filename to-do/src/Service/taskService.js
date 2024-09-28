
import axios from 'axios';

export async function getTasks(){
    const result= await axios.get("http://localhost:4000/task/getAllTasks")
    return result.data;
}

export async function addTask(assignedTo,status,dueDate,priority,description) {
    const body={
        assignedTo,status,dueDate,priority,description
    }

    const result=await axios.post("http://localhost:4000/task/addTask",body)

}

export async function editTask(taskId, assignedTo,status,dueDate,priority,description) {
    const body={
       taskId, assignedTo,status,dueDate,priority,description
    }

    const result=await axios.put("http://localhost:4000/task/editTask",body)

}

export async function singleTask(taskId){
    const body={taskId}
    const result= await axios.get("http://localhost:4000/task/Task",{headers: {taskId}})
    console.log("id :",taskId,"Task: ",result.data)
    return result.data;
}

export async function deleteTask(taskId) {
    const body={taskId}
    console.log("deleteId :",taskId)
    const result=await axios.delete("http://localhost:4000/task/deleteTask",{headers: {taskId}})
}