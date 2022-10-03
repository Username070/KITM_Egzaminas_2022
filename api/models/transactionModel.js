const { default: mongoose } = require('mongoose');

const transactionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Please provide a title']
    },
    type: {
        type: String,
        required: [true, 'Please provide a type']
    },
    ammount: {
        type: String,
        required: [true, 'Please provide a number']
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Transaction', transactionSchema)