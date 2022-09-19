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
import {useSelector} from "react-redux";
import {getTransactionList} from "../selectors";
import {Transaction} from "../types";
import moment from "moment";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const getDataset = (spendList: Transaction[]) => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return {
        labels: labels,
        datasets: [
            {
                label: 'Spend',
                data: labels.map((label, labelIndex) =>  getSpendData(label, labelIndex, spendList)),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Earn',
                data: labels.map((label, labelIndex) => getEarnData(label, labelIndex, spendList)),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ]
    }
};

const getSpendData= (month: string, monthIndex: number, spendList: Transaction[]) => {
    let result = 0;
    spendList.map((item: Transaction) => {
        const date = moment(item.transactionDate);
       if (date.isValid()) {
           const month = date.month();
           if (monthIndex === month) {
               result += Number.parseInt(item.debit || 0);
           }
       }
       return null;
    });
    return result;
}

const getEarnData = (month: string, monthIndex: number, spendList: Transaction[]) => {
    let result = 0;
    spendList.map((item: Transaction) => {
        const date = moment(item.registrationDate);

        if (date.isValid()) {
            const month = date.month();
            if (monthIndex === month) {
                result += Number.parseInt(item.credit || 0);
            }
        }
        return null;
    });
    return result;
}

export const SpendChart:FC<any> = () => {
    const activeTransactionList = useSelector(getTransactionList);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const result = getDataset(activeTransactionList);
        setData(result);
    }, [activeTransactionList])

    if (!data) {
        return <div></div>
    }

    return (
        <div style={{width: '42em', height: '42em'}}>
            <Bar options={options} data={data}/>
        </div>
    );
}

export default SpendChart;

