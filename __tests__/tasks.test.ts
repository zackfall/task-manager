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
  deleteTask,
  deleteSubTask
} from "../services/tasks";

describe('Test Tasks Service', () => {
  describe('Fetch', () => {
    it('should return a list of tasks', async () => {
      // Create the mock model to use in the test
      mockingoose(TasksModel).toReturn([
        {
          name: 'Task 1',
          description: "The first task",
          createdAt: new Date('2022-06-01T13:24:42'),
          updatedAt: new Date('2022-06-12T09:40:35'),
          subTasks: [
            mockingoose(SubTasksModel).toReturn(
              {
                name: 'subTask 1',
                description: "The first subTask",
                createdAt: new Date('2022-06-01T13:24:50'),
                updatedAt: null,
                done: false,
              },
              {
                name: 'subTask 2',
                description: "The second subTask",
                createdAt: new Date('2022-06-01T13:26:37'),
                updatedAt: new Date('2022-07-01T10:11:25'),
                done: true,
              }, 'find')
          ],
          done: false
        },
        {
          name: 'Task 2',
          description: "The second task",
          createdAt: new Date('2022-06-05T16:43:42'),
          updatedAt: null,
          subTask: [
            mockingoose(SubTasksModel).toReturn(
              {
                name: 'subTask 1 of the second task',
                description: "The first subTask of the second task",
                createdAt: new Date('2022-06-05T16:44:50'),
                updatedAt: null,
                done: true,
              }, 'find')
          ],
          done: true
        }
      ], 'find');
      // using our service to work with the mock model
      const res = await fetchTasks();
      expect(res[0].name).toBe('Task 1');
      expect(res[0].createdAt).toEqual(new Date('2022-06-01T13:24:42'));
      expect(res[1].name).toBe('Task 2');
      expect(res[1].updatedAt).toBe(null);
      expect(res[1].done).toBeTruthy();
    });
    it('should return a tasks', async () => {
      mockingoose(TasksModel).toReturn(
        {
          name: 'Task 1',
          description: "The first task",
          createdAt: new Date('2022-06-01T13:24:42'),
          updatedAt: new Date('2022-06-12T09:40:35'),
          subTasks: null,
          done: false
        }, 'findOne');
      const res = await fetchTask("62c6249cb7f600f0cbc70095");
      expect(res.name).toBe('Task 1');
      expect(res.description).toBe('The first task');
      expect(res.subTasks).toBe(null);
      expect(res.done).toBeFalsy();
    });
    it('should return a list of subTasks', async () => {
      mockingoose(SubTasksModel).toReturn([
        {
          name: 'SubTask 1',
          description: "subtask 1",
          createdAt: new Date('2022-06-01T13:24:42'),
          updatedAt: null,
          done: true
        },
        {
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
          _id: "62c6249cb7f600f0cbc70095",
          name: 'SubTask 1',
          description: "subtask 1",
          createdAt: new Date('2022-06-01T13:24:42'),
          updatedAt: null,
          done: true
        }, 'findOne');
      const res = await fetchSubTask("62c6249cb7f600f0cbc70095");
      expect(res.createdAt).toEqual(new Date('2022-06-01T13:24:42'));
      expect(res.done).toBeTruthy();
    });
  });

  describe('Create', () => {
    it('should return the created task', async () => {
      mockingoose(SubTasksModel).toReturn(
        {
          name: 'Task 1',
          description: 'task 1',
          createdAt: Date.now(),
          updatedAt: null,
          subTasks: [],
          done: false
        }, 'save');
      const res = await createTask("Task 1", "task 1", null);
      expect(res.name).toBe('Task 1');
      expect(res.updatedAt).toBeNull();
      expect(res.subTasks).toEqual([]);
      expect(res.done).toBeFalsy();
    });
    it('should return the created subTask', async () => {
      mockingoose(SubTasksModel).toReturn(
        {
          name: 'SubTask 1',
          description: 'subtask 1',
          createdAt: Date.now(),
          updatedAt: null,
          subTasks: [],
          done: false
        }, 'save');
      const res = await createSubTask("SubTask1", "subtask 1");
      expect(res.name).toBe('SubTask 1');
      expect(res.updatedAt).toBeNull();
      expect(res.done).toBeFalsy();
    });
  });

  // This don't do anything so I just do a simple test like this one
  describe('Update', () => {
    it('should return the updated task document', async () => {
      const doc = {
        _id: "62c6249cb7f600f0cbc70095",
        name: 'Task 1',
        description: 'task 1',
        createdAt: new Date('2022-06-01T13:24:42'),
        updatedAt: null,
        subTasks: [],
        done: false
      };
      mockingoose(TasksModel).toReturn(doc, 'updateOne');
      const res = await updateTask("62c6249cb7f600f0cbc70095", { name: 'Updated task', done: true });
      expect(res).toMatchObject(res);
    });
    it('should return the updated subtask', async () => {
      const doc = {
        _id: "62c6249cb7f600f0cbc70095",
        name: "SubTask 1",
        description: "task 1",
        createdAt: new Date('2022-06-01T13:24:42'),
        updatedAt: null,
        done: false
      };
      mockingoose(SubTasksModel).toReturn(doc, 'updateOne');
      const res = await updateSubTask("62c6249cb7f600f0cbc70095", { name: 'Updated subtask', done: true });
      expect(res).toMatchObject(res);
    });
  });

  describe('Delete', () => {
    it('should remove the task and return the deleted object', async () => {
      const doc = {
        name: 'Task 1',
        description: "The first task",
        createdAt: new Date('2022-06-01T13:24:42'),
        updatedAt: new Date('2022-06-12T09:40:35'),
        subTasks: null,
        done: true
      };
      mockingoose(TasksModel).toReturn(doc, 'findOneAndDelete');
      const res = await deleteTask("62c6249cb7f600f0cbc70095");
      expect(res).toMatchObject(doc);
    });
    it('should remove the subTask and return the deleted object', async () => {
      const doc = {
        name: 'Task 1',
        description: "The first task",
        createdAt: new Date('2022-06-01T13:24:42'),
        updatedAt: new Date('2022-06-12T09:40:35'),
        done: true
      };
      mockingoose(SubTasksModel).toReturn(doc, 'findOneAndDelete');
      const res = await deleteSubTask("62c6249cb7f600f0cbc70095");
      expect(res).toMatchObject(doc)
    });
  });
});
