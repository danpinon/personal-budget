const { getBalance, setBalance, db } = require('../db.js')

const takeFromBalanceToEnvelop = (req, res, next) => {
  let currentBalance = getBalance()
  currentBalance = currentBalance.data.balance;

  const newBalance =  currentBalance - req.body.budget;

  if (newBalance < 0) {
    res.status(400).send('not enough balance')
  } else {
    setBalance({ balance: newBalance });
    next()
  }
}

const returnBudgetToBalance = (req, res, next) => {
  let currentBalance = getBalance()
  currentBalance = currentBalance.data.balance;

  const newBalance =  currentBalance + req.envelop.budget;

  if (newBalance < 0) {
    res.status(400).send('not enough balance')
  } else {
    setBalance({ balance: newBalance });
    next()
  }
}

const isEnvelopValid = (req, res, next) => {
  if (db.allEnvelops.isValid(req.body)) {
    next()
  } else {
    res.status(400).send(`Envelop has invalid format`)
  }
}

const envelopCheck = (type) => {
  return (req, res, next, id) => {
    const envelop = getEnvelopFromDatabase(id);
    if (envelop) {
        req[type] = envelop
      next();
    } else {
      res.status(404).send(`incorrect envelop's ${type} ID`)
    }
  }
}

module.exports = {
  takeFromBalanceToEnvelop,
  isEnvelopValid,
  returnBudgetToBalance,
  envelopCheck,
}