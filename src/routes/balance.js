const express = require('express');
const balanceRouter = express.Router();
const {
  getBalance,
  setBalance
} = require('../db.js');

balanceRouter.get('/', (req, res, next) => {
  const balance = getBalance();
  res.status(200).send(balance)
})

balanceRouter.put('/', (req, res, next) => {
  const balance = setBalance(req.body);
  res.status(200).send(balance)
})

module.exports = balanceRouter