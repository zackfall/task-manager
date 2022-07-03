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
    type: Date
  },
  updatedAt: {
    type: Date
  },
  subTasks: [{
    type: Schema.Types.ObjectId,
    ref: 'sub-tasks'
  }],
  done: {
    type: Boolean
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
    type: Date
  },
  updatedAt: {
    type: Date
  },
  done: {
    type: Boolean
  }
});

const TasksModel = mongoose.model('tasks', tasksSchema);
const SubTasksModel = mongoose.model('sub-tasks', subTasksSchema);

export {
  TasksModel,
  SubTasksModel
}
