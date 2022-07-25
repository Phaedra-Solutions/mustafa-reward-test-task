const transactions = require('../@shared/constants/MOCK_DATA.json');
const { REWARDS_GET_ERROR } = require('../@shared/constants/errors');
const moment = require('moment');
const _ = require('lodash');


/**
 * Getting all points
 */
exports.getAll = () => {
  try {
    const points = {};
    const pointsPerMonths = {};
    const users = {};

    // console.log(transactions);
    for (let transaction of transactions) {
      if (transaction.amount > 50 && moment().diff(moment(transaction.date), 'days') <= 90) {
        // POINTS
        points[transaction.name] = {
          name: transaction.name,
          points: (points[transaction.name]?.points || 0) + calculatePoints(transaction)
        }

        if (!pointsPerMonths[moment(transaction.date).format('MMMM')]) {
          pointsPerMonths[moment(transaction.date).format('MMMM')] = {}
        }

        // POINTS PER MONTH
        pointsPerMonths[moment(transaction.date).format('MMMM')][transaction.name] = {
          name: transaction.name,
          points: (pointsPerMonths[moment(transaction.date).format('MMMM')][transaction.name]?.points || 0) + calculatePoints(transaction),
          numberOfTransactions: (pointsPerMonths[moment(transaction.date).format('MMMM')][transaction.name]?.numberOfTransactions || 0) + 1,
          transactions: Array.isArray(pointsPerMonths[moment(transaction.date).format('MMMM')][transaction.name]?.transactions) ? 
            [...pointsPerMonths[moment(transaction.date).format('MMMM')][transaction.name]?.transactions, {...transaction, points: calculatePoints(transaction)}] : 
            [{
              ...transaction,
              points: calculatePoints(transaction)
            }]
        }
      }

      // ALL USERS
      users[transaction.name] = {
        name: transaction.name,
        points: (users[transaction.name]?.points || 0) + calculatePoints(transaction)
      }

    }

    Object.keys(pointsPerMonths).forEach((key) => {
      pointsPerMonths[key] = _.orderBy(_.values(pointsPerMonths[key]), ['points'], ['desc'])
    })

    return {
      points: _.orderBy(_.values(points), ['points'], ['desc']),
      users: _.orderBy(_.values(users), ['points'], ['desc']),
      pointsPerMonths,
      transactions
    };
  } catch (error) {
    console.log(error);
    throw new Error(REWARDS_GET_ERROR)
  }
}

const calculatePoints = (transaction) => {
  if (transaction.amount > 100) {
    return (transaction.amount - 50) * 1 + (transaction.amount - 100) * 1;
  } else if (transaction.amount > 50 && transaction.amount <= 100) {
    return (transaction.amount - 50) * 1;
  } else {
    return 0;
  }
}