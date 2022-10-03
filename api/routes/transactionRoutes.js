const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const { 
    setTransaction,
    getTransactions
} = require('../controllers/transactionController');

router.route('/create').post(protect, setTransaction);

router.route('/get').get(protect, getTransactions);

module.exports = router;