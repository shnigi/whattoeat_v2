const server = require('../build/app.js');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);

const payload = {
    "latitude": 60.2766107,
    "longitude": 25.0348919,
    "offset": 0
};

describe('Test backend', function () {
    test('Server is up and running', async () => {
        const res = await requestWithSupertest.get('/test');
        expect(res.status).toEqual(200);
        expect(res.text).toEqual('Server is up and running');
    });

    test('Business search returns data', async () => {
        const res = await requestWithSupertest
            .post('/api/business/search')
            .send(payload);
        expect(res.status).toEqual(200);
    });
});