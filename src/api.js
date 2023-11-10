const express = require('express')
const apiRouter = express.Router()

const { envelopsRouter, balanceRouter } = require('./routes/index.js')

apiRouter.use('/envelops', envelopsRouter)
apiRouter.use('/balance', balanceRouter)

module.exports = apiRouter