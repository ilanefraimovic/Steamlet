// tests/routes/items.test.js
const request = require('supertest');
const server = require('../../src/server'); // Import server directly

describe('Users Route', () => {
    afterAll(() => {
        return new Promise((resolve, reject) => {
            server.close((err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    });
    

    test('GET /api/v1/users should respond with 200 and a list', async () => {
        const response = await request(server).get('/api/v1/users');
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

    test('POST /api/v1/users/create should create a new user and respond with 201 and the new user ID', async () => {
        const newUser = {
            userName: 'testUser',
            password: 'testPassword123'
        };

        const response = await request(server)
            .post('/api/v1/users/create')
            .send(newUser);

        expect(response.status).toBe(200); // Expect a 200 Created status code
        expect(typeof response.body).toBe('number'); // Verify that the ID is a number
    });

    
});
