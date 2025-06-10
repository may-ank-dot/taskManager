import { Router } from "express"
import { Task } from "../models/task.models.js"

const router = Router()

router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/', async (req, res) => {
  const tasks = await Task.find()
  res.status(200).json(tasks)
})

router.put('/:id', async (req, res) => {
  const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(updated)
})

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id)
  res.status(200).json({ message: 'task deleted' })
})

export default router
