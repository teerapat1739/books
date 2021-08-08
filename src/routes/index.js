const fs = require('fs')
const path = require('path')
require('dotenv').config()
const express = require('express');
const { EVENTS, add_queue } = require('../lib/queue')
const logger = require('../../logger')

module.exports = () => {
  const router = express.Router()

  router.use((req, res, next) => {
    req.locals = {}
    res.locals = {
      _response: {},
      _uri: req.originalUrl.replace(/^\/dry\-run(\-fail)?\//, '/'),
      _method: req.method,
      _next: next
    }
    next()
  })


  // define custom routes here
  const routes_path = path.join(process.cwd(), 'src', 'routes')
  // const routes_list = fs.readdirSync(routes_path).filter(n => n !== 'index.js').map(n => n.replace(/\.js$/, ''))

  const routes_list = fs.readdirSync(routes_path).filter(p => fs.lstatSync(path.join(routes_path, p)).isDirectory())


  routes_list.forEach(r => {
    const name = `/${r}`
    const route = require(`./${r}`)
    router.use(name, route())
    logger.info(`Route: ${name} is registered`)
  })


  // debug uri
  if (process.env.DEBUG === "YES") {

    router.use((req, res, next) => {
      req.locals = req.locals || {}
      if (req.originalUrl.startsWith("/dry-run")) {
        req.locals = { ...req.locals, debugPrefix: 'dry-run' }
      }
      if (req.originalUrl.startsWith("/dry-run-fail")) {
        req.locals = { ...req.locals, debugPrefix: 'dry-run-fail' }
      }
      next();
    });

    // register debug routes here
    routes_list.forEach(r => {
      const route = require(`./${r}`)
      router.use(`/dry-run/${r}`, route())
      logger.info(`Route: /dry-run/${r} is registered`)
      router.use(`/dry-run-fail/${r}`, route())
      logger.info(`Route: /dry-run-fail/${r} is registered`)
    })
  }

  router.use((req, res, next) => {
    const { _response, _uri, _method } = res.locals
    const { status_code, data, response_headers } = _response


    if (process.env.DEBUG === "YES") {
      // save response to file
      add_queue(EVENTS.DRY_RUN, {
        method: res.locals._method,
        uri: res.locals._uri,
        ..._response
      })
    }

    if (response_headers) {
      Object.entries(response_headers).forEach(header => res.append(header[0], header[1]))
      if (response_headers['Content-Type']) {
        res.status(status_code).send(data)
        return next()
      }
    }

    res.status(status_code || 500).json(data || "Internal Server Error")

    next()
  })



  return router
}