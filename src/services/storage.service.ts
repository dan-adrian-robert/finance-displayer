export const STATIC_DB_KEY = 'transactions';

export const getStaticDB = (): object => {
    const transactionString = localStorage.getItem(STATIC_DB_KEY) || '{}';

    return JSON.parse(transactionString)
}

export const updateStaticDB = (payload: object) => {
    localStorage.setItem(STATIC_DB_KEY, JSON.stringify(payload));
}