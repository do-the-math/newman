import request from 'supertest';
import app from '../../../../src';

describe('Users API', () => {
  it('GET / get all users', async () => {
    return request(app).get(`/api/v1/users`).expect(200);
  });
});
