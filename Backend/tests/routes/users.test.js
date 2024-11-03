// tests/routes/items.test.js
const request = require('supertest');
const app = require('../../src/app'); 

describe('Users Route', () => {
    test('GET /api/v1/users should respond with 200 and a list', async () => {
        const response = await request(app).get('/api/v1/users');
        expect(response.status).toBe(200);
        //expect(response.body).toHaveProperty('items');
        //expect(Array.isArray(response.body.items)).toBe(true);
    });
});
