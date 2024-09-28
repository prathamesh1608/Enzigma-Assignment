const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()
// Create tasks
router.post('/addTask', (request, response) => {
  const {assignedTo, status, dueDate,priority,description}=request.body
    const statement = `insert into todoList( assignedTo, status, dueDate,priority,description) values (? ,?, ?, ?,?);`
  db.pool.execute(statement,[assignedTo, status, dueDate,priority,description], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

//Edit tasks
router.put('/editTask', (request, response) => {
    const { taskId, assignedTo,status, dueDate,priority,description} = request.body
    const statement = `update todoList set assignedTo=?, status = ?, dueDate = ?, priority = ?, description = ? where taskId = ?`
    db.pool.execute(
      statement,
      [assignedTo , status,dueDate,priority,description,taskId],
      (error, result) => {
        response.send(utils.createResult(error, result))
      }
    )
  })

// Delete Tasks
  router.delete('/deleteTask', (request, response) => {
    const {taskid} = request.headers
    const statement = `delete from todoList where taskId = ?`
    db.pool.execute(
      statement,[taskid],
      (error, result) => {
        response.send(utils.createResult(error, result))
      }
    )
  })

// Search Tasks
  router.post('/searchTask', (request, response) => {
    const {status} = request.body
    const statement = `select assignedTo, status, dueDate, priority, description from todoList where status=?;`
    db.pool.execute(statement, [title], (error, result) => {
      response.send(utils.createResult(error, result))
    })
  })

//Get all tasks
  router.get('/getAllTasks', (request, response) => {
    const statement = `select taskId,assignedTo, status, dueDate, priority, description from todoList;`
    db.pool.query(statement, (error, result) => {
      response.send(utils.createResult(error, result))
    })
  })

  router.get('/Task', (request, response) => {
    const {taskid}=request.headers;
    const statement = `select taskId,assignedTo, status, dueDate, priority, description from todoList where taskId=?;`
    db.pool.query(statement ,[taskid],(error, result) => {
      response.send(utils.createResult(error, result))
    })
  })

module.exports = router
