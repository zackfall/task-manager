import { TasksModel, SubTasksModel } from '../models/tasks';

const fetchTasks = async () => await TasksModel
    .find({})
    .populate('sub-tasks')
    .exec();

const fetchTask = async (id: any) => await TasksModel
  .findById(id)
  .populate('sub-tasks')
  .exec();

const fetchSubTasks = async () => await SubTasksModel
  .find({})
  .exec();

const fetchSubTask = async (id: any) => await SubTasksModel
  .findById(id)
  .exec();

const createTask = async (name: string, desc: string, subTasks: typeof SubTasksModel | null) => {
  if (subTasks === null) {
    subTasks = [];
  }

  const task = new TasksModel({
    name,
    desc,
    subTasks
  });
  await task.save();
};

const createSubTask = async (name: string, desc: string) => {
  const subTask = new SubTasksModel({
    name,
    desc
  });
  await subTask.save();
};

const updateTask = () => {};
const updateSubTask = () => {};
const deleteTasks = () => {};
const deleteTask = () => {};
const deleteSubTasks = () => {};
const deleteSubTask = () => {};

export {
  fetchTasks,
  fetchTask,
  fetchSubTasks,
  fetchSubTask,
  createTask,
  createSubTask,
  updateTask,
  updateSubTask,
  deleteTask,
  deleteTasks,
  deleteSubTask,
  deleteSubTasks
};
