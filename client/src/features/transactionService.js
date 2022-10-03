import axios from "axios";

const API_URL = "http://localhost:9000/api/transactions/";

const getTransactions = async () => {

    const response = await axios.post(API_URL + "get")
    
    return response.data
}

const createTransaction = async (transactionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + "create", transactionData, config)

    return response.data
}

const transactionService = {
    createTransaction,
    getTransactions,
}

export default transactionService