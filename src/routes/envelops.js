const express = require('express');
const {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  getBalance,
  setBalance,
} = require('../db.js')
const envelopsRouter = express.Router();

const {
  takeFromBalanceToEnvelop,
  isEnvelopValid,
  returnBudgetToBalance,
  envelopCheck,
} = require('../middlewares/middlewares.js')

const addEnvelopToDatabase = (envelop) => addToDatabase('envelops', envelop);
const getEnvelopFromDatabase = (envelopId) => getFromDatabaseById('envelops', envelopId);

envelopsRouter.get('/', (req, res, next) => {
  const allEnvelops = getAllFromDatabase('envelops')
  res.status(200).send(allEnvelops)
})

envelopsRouter.post('/', isEnvelopValid, takeFromBalanceToEnvelop, (req, res, next) => {
  const categoryAlreadyAdded = getAllFromDatabase('envelops')
  .find(envelop => {
    return envelop.category === req.body.category
  })
  if (categoryAlreadyAdded) {
    res.status(400).send('category already added')
  } else {
    const newEnvelop = req.body
    const addedEnvelop = addEnvelopToDatabase(newEnvelop)
    res.status(201).send(addedEnvelop)
  }
})

envelopsRouter.param('envelopId', (req, res, next, id) => {
  const envelop = getEnvelopFromDatabase(id);
  if (envelop) {
    req.envelop = envelop
    next()
  } else {
    res.status(404).send("incorrect envelop's ID")
  }
})

envelopsRouter.get('/:envelopId', (req, res, next) => {
  res.status(200).send(req.envelop);
})

envelopsRouter.put('/:envelopId', isEnvelopValid, takeFromBalanceToEnvelop, (req, res, next) => {
  const newEnvelop = {
    id: req.envelop.id,
    ...req.body
  }
  const envelopToUpdate = updateInstanceInDatabase('envelops', newEnvelop)
  res.status(200).send(envelopToUpdate);
})

envelopsRouter.delete('/:envelopId', returnBudgetToBalance, (req, res, next) => {
  deleteFromDatabasebyId('envelops', req.envelop.id)

  res.status(200).send();
})

const fromEnvelopCheck = envelopCheck('from')
const toEnvelopCheck = envelopCheck('to')

envelopsRouter.param('from', fromEnvelopCheck)
envelopsRouter.param('to', toEnvelopCheck)

envelopsRouter.put('/transfer/:from/:to', (req, res, next) => {
  const fromEnvelop = req.from;
  const toEnvelop = req.to;

  const BudgetTransfer = Number(req.body.transfer);

  if (typeof !isNaN(parseFloat(BudgetTransfer)) && isFinite(BudgetTransfer)) {
    res.status(400).send(BudgetTransfer)
  }

  const newFromBudget = fromEnvelop.budget - BudgetTransfer;
  const newToBudget  = toEnvelop.budget + BudgetTransfer;

  if (newFromBudget < 0) {
    res.status(400).send("not enough Budget to transfer")
  } else {
    fromEnvelop.budget = newFromBudget
    toEnvelop.budget = newToBudget

    updateInstanceInDatabase('envelops', fromEnvelop);
    updateInstanceInDatabase('envelops', toEnvelop);
    res.status(200).send(`Budget transfer of $${BudgetTransfer} successful`)
  }
})

module.exports = envelopsRouter