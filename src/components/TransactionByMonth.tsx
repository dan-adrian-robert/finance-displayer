import React, { FC } from "react";
import {Chart as ChartJS, Tooltip, Legend, LinearScale, PointElement} from 'chart.js';
import { Bubble } from "react-chartjs-2";
import {Month, Transaction} from "../types";
import moment from "moment";
import {DAYS} from "../config/constants";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const getNormalizedValue = (maxRange: number, currentValue: number, minSize= 5, maxSize= 20): number  => {
    if (currentValue === 0) {
        return 0;
    }

    return minSize + Math.floor((currentValue/(maxRange-minSize)) * (maxSize- minSize));
}

export const getMaxTransactionInMonth = (transactionList: Transaction[]): number => {
    let maxSpend = 0;

    for (let i = 0; i < transactionList.length; i++) {
        const item: Transaction= transactionList[i];
        // if (item.debit) {
        //     console.log(item.debit);
        // }
        if (parseInt(item.debit) > maxSpend) {
            maxSpend = item.debit;
        }
    }
    return maxSpend;
}

const buildData = (transactionList: Transaction[], month: Month) => {
    const dataSet: any[] = [];
    const maxSpend = getMaxTransactionInMonth(transactionList)
    const spendMapByDay: any = {};
    DAYS.map(day => {
        spendMapByDay[day] = 0;
    })

    transactionList.map((transaction: Transaction) => {
        const date = moment(transaction.registrationDate);
        if (transaction.debit && date.month() === month.index - 1) {
            spendMapByDay[date.date()] += parseInt(transaction.debit);
        }
        return null;
    })

    Object.keys(spendMapByDay).map((dayItem: any) => {
       const value =  spendMapByDay[dayItem];
        const point = {
            x: dayItem,
            y: value,
            r: getNormalizedValue(maxSpend, value),
        }
        dataSet.push(point);
    })

    // transactionList.map((transaction: Transaction) => {
    //     const date = moment(transaction.registrationDate);
    //     if (transaction.debit && date.month() === month.index) {
    //         const point = {
    //             x: date.date(),
    //             y: transaction.debit,
    //             r: getNormalizedValue(maxSpend,transaction.debit),
    //         }
    //         dataSet.push(point);
    //     }
    //     return null;
    // })

    dataSet.push({x:30,y:0,r:1})

    return {
        datasets: [
            {
                label: month.value,
                data: dataSet,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }
}

interface IProps {
    transactionList: Transaction[],
    month: Month,
}

export const TransactionByMonth:FC<IProps> = ({transactionList, month}) => {
    return (
        <Bubble options={options} data={buildData(transactionList, month)}/>
    )
}
