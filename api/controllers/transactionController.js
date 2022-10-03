const asyncHandler = require('express-async-handler');
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');

const getTransactions = asyncHandler( async (req, res) => {
    const transactions = await Transaction.find({ user: req.user.id});
    res.status(200).json(transactions);
})

const setTransaction = asyncHandler(async (req, res) => {

    const transaction = await Transaction.create({
        user: req.user.id,
        title: req.body.title,
        type: req.body.type,
        ammount: req.body.ammount,
    })

    res.status(201).json(transaction);
});

module.exports = {
    setTransaction,
    getTransactions,
}