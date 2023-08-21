export const TRANSACTION_DB_KEY = 'transactions';
export const CONFIGURATION_DB_KEY = 'configurations';

export const getTransactionDB = (): object => {
    const transactionString = localStorage.getItem(TRANSACTION_DB_KEY) || '{}';

    return JSON.parse(transactionString)
}

export const updateTransactionDB = (payload: object) => {
    localStorage.setItem(CONFIGURATION_DB_KEY, JSON.stringify(payload));
}

export const getConfigurationDB = (): object => {
    const transactionString = localStorage.getItem(CONFIGURATION_DB_KEY) || '{}';

    return JSON.parse(transactionString)
}

export const updateConfigurationDB = (payload: object) => {
    localStorage.setItem(CONFIGURATION_DB_KEY, JSON.stringify(payload));
}