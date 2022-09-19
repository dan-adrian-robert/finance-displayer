export interface Transaction {
    registrationDate: any,
    transactionDate: any,
    debit: any,
    credit: any,
    numOP: any,
    fiscalCode: any,
    ordination: any,
    finalBenefactor: any,
    targetName: any,
    bankName: any,
    accNumber: any,
    description: any,
    category: Category
}

export enum Category {
    FOOD='FOOD',
    TRANSPORT='TRANSPORT',
    CASH_WITHDRAW = 'CASH_WITHDRAW',
    SHOPING = 'SHOPING',
    INVESTMENT = 'INVESTMENT',
    OTHER = 'OTHER',
    SALARY='SALARY',
    ENERGY='ENERGY',
    CHARITY='CHARITY',
    SAVINGS='SAVINGS',
    PHARMA='PHARMA',
    GAMING='GAMING',
}

export interface TransactionState {
    yearList: string[],
    selectedYear: any,
    transactionMap: {
        [key: string]: Transaction[]
    };
}

export const CATEGORY_LIST: Category[] = [
    Category.FOOD,
    Category.TRANSPORT,
    Category.CASH_WITHDRAW,
    Category.INVESTMENT,
    Category.OTHER,
    Category.SALARY,
    Category.ENERGY,
    Category.CHARITY,
    Category.SAVINGS,
    Category.PHARMA,
    Category.GAMING,
];