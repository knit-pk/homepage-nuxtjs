#!/usr/bin/env node

const http = require('http')

const options = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '3000',
  timeout: 1000,
}

const request = http.request(options, ({ statusCode }) => {
  process.exit(statusCode === 200 ? 0 : 1)
})

request.on('error', () => process.exit(1))

request.end()
