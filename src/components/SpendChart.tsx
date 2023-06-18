import React, {FC, useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {Transaction} from "../types";
import {getMonthNames} from "../config/constants";
import {filterTransactionByMonth} from "../utils/filters";
import {getTotalGainedAmount, getTotalSpendAmount} from "../utils/transaction-wrappers";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const getDataset = (transactionList: Transaction[], labels: string[]) => {
    return {
        labels: labels,
        datasets: [
            {
                label: 'Spend',
                data: labels.map((label, labelIndex) => {
                    const transactionByMonth = filterTransactionByMonth(transactionList, labelIndex);
                    return getTotalSpendAmount(transactionByMonth);
                }),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Earn',
                data: labels.map((label, labelIndex) => {
                    const transactionByMonth = filterTransactionByMonth(transactionList, labelIndex);
                    return getTotalGainedAmount(transactionByMonth);
                }),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ]
    }
};

const getBarOptions = (year: any) => {
    return {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: `Spend Chart in year ${year}`,
            },
        },
    }
}

interface IProps {
    transactionList: Transaction[],
    year: string | number,
}

export const SpendChart:FC<IProps> = ({transactionList, year}) => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        setData(getDataset(transactionList, getMonthNames()));
    }, [transactionList])

    if (!data) {
        return <div>Something went wrong</div>
    }

    return (
        <Bar options={getBarOptions(year)} data={data}/>
    );
}

export default SpendChart;

