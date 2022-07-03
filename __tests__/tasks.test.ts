/**
 * @jest-environment node
 */

// @ts-expect-error TS7016  - Avoid the no declaration error
import * as mockingoose from "mockingoose";
import { SubTasksModel, TasksModel } from "../models/tasks";
import {
  fetchTasks,
  fetchTask,
  fetchSubTasks,
  fetchSubTask,
  createTask,
  createSubTask,
  updateTask,
  updateSubTask,
  deleteTasks,
  deleteTask,
  deleteSubTasks,
  deleteSubTask
} from "../services/tasks";

describe('Test Tasks Service', () => {
  describe('fetchTasks', () => {
    it('should return a list of tasks', async () => {
      mockingoose(TasksModel).toReturn([
        {
          _id: 1,
          name: 'Task 1',
          description: "The first task",
          createdAt: new Date('2022-06-01T13:24:42'),
          updatedAt: new Date('2022-06-12T09:40:35'),
          subTask: [
            {
              _id: 1,
              name: 'subTask 1',
              description: "The first subTask",
              createdAt: new Date('2022-06-01T13:24:50'),
              updatedAt: null,
              done: false,
            },
            {
              _id: 2,
              name: 'subTask 2',
              description: "The second subTask",
              createdAt: new Date('2022-06-01T13:26:37'),
              updatedAt: new Date('2022-07-01T10:11:25'),
              done: true,
            }
          ],
          done: false
        },
        {
          _id: 1,
          name: 'Task 2',
          description: "The second task",
          createdAt: new Date('2022-06-05T16:43:42'),
          updatedAt: null,
          subTask: [
            {
              _id: 3,
              name: 'subTask 1 of the second task',
              description: "The first subTask of the second task",
              createdAt: new Date('2022-06-05T16:44:50'),
              updatedAt: null,
              done: true,
            }
          ],
          done: true
        }
      ], 'find');
      const res = await fetchTasks();
      expect(res[0]._id).toBe(1);
      expect(res[0].name).toBe('Task 1');
      expect(res[0].createdAt.getTime()).toBe('13:24:42');
      expect(res[0].subTask[0].name).toBe('subTask 1');
      expect(res[1].name).toBe('Task 2');
      expect(res[1].updatedAt).toBe(null);
      expect(res[1].subTask[0].done).toBeTruthy();
      expect(res[1].done).toBeTruthy();
    });
    it('should return a tasks', async () => {
      mockingoose(TasksModel).toReturn(
        {
          _id: 1,
          name: 'Task 1',
          description: "The first task",
          createdAt: new Date('2022-06-01T13:24:42'),
          updatedAt: new Date('2022-06-12T09:40:35'),
          subTasks: null,
          done: false
        }, 'findOne');
      const res = await fetchTask();
      expect(res._id).toBe(1);
      expect(res.name).toBe('Task 1');
      expect(res.description).toBe('The first task');
      expect(res.subTasks).toBe(null);
      expect(res.done).toBeFalsy();
    });
    it('should return a list of subTasks', async () => {
      mockingoose(SubTasksModel).toReturn([
        {
          _id: 0,
          name: 'SubTask 1',
          description: "subtask 1",
          createdAt: new Date('2022-06-01T13:24:42'),
          updatedAt: null,
          done: true
        },
        {
          _id: 1,
          name: 'SubTask 2',
          description: "subtask 2",
          createdAt: new Date('2022-06-01T13:24:42'),
          updatedAt: new Date('2022-06-12T09:40:35'),
          done: false
        }
      ], 'find');
      const res = await fetchSubTasks();
      expect(res[0].name).toBe('SubTask 1');
      expect(res[0].done).toBeTruthy();
      expect(res[1].name).toBe('SubTask 2');
      expect(res[1].done).toBeFalsy();
    });
    it('should return a subTask', async () => {
      mockingoose(SubTasksModel).toReturn(
        {
          _id: 0,
          name: 'SubTask 1',
          description: "subtask 1",
          createdAt: new Date('2022-06-01T13:24:42'),
          updatedAt: null,
          done: true
        }, 'findOne');
      const res = await fetchSubTask();
      expect(res._id).toBe(0);
      expect(res.createdAt.getTime()).toBe('13:24:42');
      expect(res.done).toBeFalsy();
    });
    it('should return the created task', async () => {
      mockingoose(SubTasksModel).toReturn(
        {
          name: 'Task 1',
          description: 'task 1',
          createdAt: Date.now(),
          updatedAt: null,
          subTasks: null,
          done: true
        }, 'save');
      const res = await createTask("Task 1", "task 1", null);
      expect(res._id).toBe(0);
      expect(res.name).toBe('Task 1');
      expect(res.updatedAt).toBeNull();
      expect(res.subTasks).toBeNull();
      expect(res.done).toBeTruthy();
    });
    it('should return the created subTask', async () => {
      mockingoose(SubTasksModel).toReturn(
        {
          name: 'SubTask 1',
          description: 'subtask 1',
          createdAt: Date.now(),
          updatedAt: null,
          subTasks: null,
          done: true
        }, 'save');
      const res = await createSubTask("SubTask1", "subtask 1");
      expect(res._id).toBe(0);
      expect(res.name).toBe('SubTask 1');
      expect(res.updatedAt).toBeNull();
      expect(res.done).toBeTruthy();
    });
  });
});
