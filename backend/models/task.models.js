import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: String,
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending'
    },
    date: {
      type: Date,
      default: Date.now
    }
  }
)

export const Task = mongoose.model('Task', taskSchema)
