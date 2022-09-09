import React, {FC} from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {Transaction} from "./types";
ChartJS.register(ArcElement, Tooltip, Legend);

export const getChartData = (spendMap: any) => {
    const labels = Object.keys(spendMap);
    const data = labels.map((label:string) => {
        return spendMap[label].amount;
    });

    return {
        labels,
        datasets: [
            {
                label: '# of Votes',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }
};

const getTransactionValue = (transaction: Transaction) => {
    return parseInt(transaction.debit ? transaction.debit: transaction.credit);
}

const getTransactionMap = (spendList: Transaction[]) => {
    const result: any = {};
    spendList.map((item: Transaction) => {
        if (!result[item.category]) {
            result[item.category] =  {
                times: 1,
                amount: getTransactionValue(item)
            }
        } else {
            result[item.category].times += 1;
            result[item.category].amount += getTransactionValue(item)
        }
    });
    return result;
}

interface IProps {
    spendList: Transaction[]
}

export const TransactionTypes:FC<IProps> = ({spendList}) => {
    const transactionMap = getTransactionMap(spendList);
    const data = getChartData(transactionMap);
    return (
        <div>
            <Doughnut data={data}/>;
        </div>
    )
}
