import {Category, Month} from "../types";

export const MONTHS: Month[] = [
    {
       index: 1,
       value: 'January',
    },
    {
        index: 2,
        value: 'February',
    },
    {
        index: 3,
        value: 'March',
    },
    {
        index: 4,
        value: 'April',
    },
    {
        index: 5,
        value: 'May',
    },
    {
        index: 6,
        value: 'June',
    },
    {
        index: 7,
        value: 'July',
    },
    {
        index: 8,
        value: 'August',
    },
    {
        index: 9,
        value: 'September',
    },
    {
        index: 10,
        value: 'October',
    },
    {
        index: 11,
        value: 'November',
    },
    {
        index: 12,
        value: 'December',
    },
];

export const YEARS = [2017, 2018, 2019, 2020, 2021, 2022, 2023]

export const COLORS = [
    'rgba(255, 99, 132, 0.2)',
    // 'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    // 'rgba(75, 192, 192, 0.2)',
    // 'rgba(153, 102, 255, 0.2)',
    // 'rgba(255, 159, 64, 0.2)',
    '#ff80ed',
    '#fa8072',
    '#800080',
    '#468499',
    '#420420',
];

export const COLOR = {
    GREEN: '#3dae23',
    RED: '#e8464a'
}

export const CATEGORY_COLOR: any = {
    [Category.SALARY]: '#FC0049',
    [Category.FOOD]: '#FF5D1A',
    [Category.TRANSPORT] : '#E7E860',
    [Category.ENERGY]: '#00C891',
    [Category.CASH_WITHDRAW]: '#0097D1',
    [Category.INVESTMENT]: '#6FBEDC',

    [Category.OTHER]: '#B20238',
    [Category.CHARITY]: '#12A4D9',
    [Category.SAVINGS]: '#0D1137',
    [Category.PHARMA]: '#F5A9CB',
    [Category.GAMING]: '#746AB0',
    [Category.SHOPPING]: '#E389B9',

    [Category.RENT]: '#FFC13B',
    [Category.SHOPPING]: '#581845',
    [Category.ENTERTAINMENT]: '#E84A5f',
    [Category.REVOLUT]: '#288BA8',
}

export const TRANSACTION_KEYS = [
    'registrationDate',
    'transactionDate',
    'debit',
    'credit',
    'numOP',
    'fiscalCode',
    'ordination',
    'finalBenefactor',
    'targetName',
    'bankName',
    'accNumber',
    'description',
];

export const DAYS = Array.from({length: 31}, (_, i) => i + 1)

export const getMonthNames = (): string[] => {
    return MONTHS.map(month => {
        return month.value;
    })
}