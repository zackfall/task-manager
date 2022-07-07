import { TasksModel, SubTasksModel } from '../models/tasks';

const fetchTasks = async () => await TasksModel
    .find({})
    .populate('sub-tasks')
    .exec();

const fetchTask = async (id: any) => await TasksModel
  .findById({ _id: id })
  .populate('sub-tasks')
  .exec();

const fetchSubTasks = async () => await SubTasksModel
  .find({})
  .exec();

const fetchSubTask = async (id: any) => await SubTasksModel
  .findById({ _id: id })
  .exec();

const createTask = async (name: string, desc: string, subTasks: typeof SubTasksModel | null) => {
  if (subTasks === null) {
    return await new TasksModel({
      name,
      desc
    }).save();
  }

  return await new TasksModel({
    name,
    desc,
    subTasks
  }).save();
};

const createSubTask = async (name: string, desc: string) => {
  const subTask = new SubTasksModel({
    name,
    desc
  });
  return await subTask.save();
};

const updateTask = async (id: any, obj: object) => TasksModel
  .updateOne({ updatedAt: Date.now(), ...obj })
  .where({ _id: id });

const updateSubTask = async (id: any, obj: object) => SubTasksModel
  .updateOne({ updatedAt: Date.now(), ...obj})
  .where({ _id: id });

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
