// tests/routes/items.test.js
const request = require('supertest');
const app = require('../../src/app'); 

describe('Users Route', () => {
    
    test('GET /api/v1/users should respond with 200 and a list', async () => {
        const response = await request(app).get('/api/v1/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

        // Check that each user object has the expected properties
        response.body.forEach(user => {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('userName');
            expect(user).toHaveProperty('createDate');
            
            // Additional checks can be added to verify the types
            expect(typeof user.id).toBe('number');
            expect(typeof user.userName).toBe('string');
            expect(typeof user.createDate).toBe('string'); // Dates are typically strings in JSON
        });
    });

});
