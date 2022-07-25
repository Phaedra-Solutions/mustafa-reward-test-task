const request = require('supertest')
const app = require('../src/app');

describe('Points Endpoints Test', () => {
  it('should fetch results for points api', async () => {

    const res = await request(app).get('/v1/points').send()
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('points'),
    expect(res.body).toHaveProperty('users'),
    expect(res.body).toHaveProperty('pointsPerMonths'),
    expect(res.body).toHaveProperty('transactions')
  })
})