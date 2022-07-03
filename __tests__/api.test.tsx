/**
 * @jest-environment node
 */

import axios from "axios";

describe('Test the API routes', () => {
  it('should make a GET request to /api/tasks', async () => {
    await axios.get('http://localhost:3000/api/tasks')
      .then(({ data }) => {
        console.log(data);
        expect(data).toEqual({ tasks: [] });
      });
  });
});
