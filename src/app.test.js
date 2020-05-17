'use strict'

const supertest = require('supertest')

const app = require('./app')
const { message } = require('./constants/project')

describe('GET /', () => {
  it('should respond with a message', async () => {
    const response = await supertest(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)

    expect(response.body.message).toEqual(message)
  })
})
