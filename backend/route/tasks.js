const { Router } = require('express')
const router = Router()
const Task = require('../models/Task')
const TaskController = require('../controllers/TaskController')

// All tasks
router.get('/', TaskController.index);
// Task by id
router.get('/:taskId', TaskController.show)
// Submit a Task
router.post('/', TaskController.store)
// Task Update by id
router.put('/:taskId', TaskController.update)
// Task Delete 
router.delete('/:taskId', TaskController.delete) 

module.exports = router
