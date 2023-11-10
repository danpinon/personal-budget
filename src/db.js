const { faker } = require('@faker-js/faker');

const allEnvelops = [];
const totalBudget = { balance: 0 };

// const envelopSchema = {
//   id: Id,
//   category: String,
//   budget: Number,
// }

const findDataArrayByName = (name) => {
  switch (name) {
    case 'envelops':
      return db.allEnvelops;
    default:
      return null;
  }
}

const isValidEnvelop = (instance) => {
  instance.category = instance.category || '';

  if (typeof instance.category !== 'string') {
    throw new Error('Envelop\'s category must be strings');
  }
  if (!isNaN(parseFloat(instance.budget)) && isFinite(instance.budget)) {
    instance.budget = Number(instance.budget);
  } else {
    throw new Error('Envelop\'s budget must be a number.');
  }
  return true;
}

const isValidTotalBudget = (instance) => {
  let { balance } = instance
  if (typeof !isNaN(parseFloat(balance)) && isFinite(balance) && balance >= 0) {
    balance = Number(balance)
  } else {
    throw new Error('Total budget must be a number.');
  }
  return true;
}

const db = {
  allEnvelops: {
    data: allEnvelops,
    nextId: faker.string.uuid,
    isValid: isValidEnvelop
  },
  totalBudget: {
    data: totalBudget,
    isValid: isValidTotalBudget,
  }
}

const getAllFromDatabase = (modelType) => {
  const model = findDataArrayByName(modelType);
  if (model === null) {
    return null;
  }
  return model.data;
}

const getFromDatabaseById = (modelType, id) => {
  const model = findDataArrayByName(modelType);
  if (model === null) {
    return null;
  }
  return model.data.find((element) => {
    return element.id === id;
  });
}

const addToDatabase = (modelType, instance) => {
  const model = findDataArrayByName(modelType);
  if (model === null) {
    return null;
  }
  if (model.isValid(instance)) {
    instance.id = `${model.nextId()}`;
    model.data.push(instance);
    return model.data[model.data.length - 1];
  }
}

const updateInstanceInDatabase = (modelType, instance) => {
  const model = findDataArrayByName(modelType);
  if (model === null) {
    return null;
  }
  const instanceIndex = model.data.findIndex((element) => {
    return element.id === instance.id;
  });
  if (instanceIndex > -1 && model.isValid(instance)) {
    model.data[instanceIndex] = instance;
    return model.data[instanceIndex];
  } else {
    return null;
  }
}

const deleteFromDatabasebyId = (modelType, id) => {
  const model = findDataArrayByName(modelType);
  if (model === null) {
    return null;
  }
  let index = model.data.findIndex((element) => {
    return element.id === id;
  });
  if (index !== -1) {
    model.data.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

const getBalance = () => {
  const balance = db.totalBudget
  return balance
}

const setBalance = (instance) => {
  if (db.totalBudget.isValid(instance)) {
    db.totalBudget.data = instance
    return db.totalBudget
  } 
}

module.exports = {
  getAllFromDatabase,
  addToDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  getBalance,
  setBalance,
  db,
}