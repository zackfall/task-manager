import mongoose, { Schema } from 'mongoose'

const tasksSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  },
  subTasks: {
    type: Array<Schema.Types.ObjectId>,
    default: [],
    ref: 'sub-tasks'
  },
  done: {
    type: Boolean,
    default: false
  }
});

const subTasksSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  },
  done: {
    type: Boolean,
    default: false
  }
});

const TasksModel = mongoose.model('tasks', tasksSchema);
const SubTasksModel = mongoose.model('sub-tasks', subTasksSchema);

export {
  TasksModel,
  SubTasksModel
}
