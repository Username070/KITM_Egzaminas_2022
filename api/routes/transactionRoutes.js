const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const { 
    setTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactionController');

router.route('/create').post(protect, setTransaction);

router.route('/get').get(protect, getTransactions);

router.route('/update').post(protect, updateTransaction);

router.route('/delete').post(protect, deleteTransaction);

module.exports = router;