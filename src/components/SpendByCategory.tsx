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
import { faker } from '@faker-js/faker';
import {Category, CATEGORY_LIST, Transaction} from "../types";
import {getSpendMap, getTransactionByMonthForCategory, getTransactionInMonth} from "../utils";
import {useSelector} from "react-redux";
import {getTransactionList} from "../selectors";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    plugins: {
        title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const COLOR_LIST: string[] = [
    '#009688',
    '#fe9c8f',
    '#feb2a8',
    '#4b86b4',
    '#f37736',
    '#4d648d',
    '#e0a899',
    '#96ceb4',
    '#88d8b0',
    '#4b3832',
    '#3b5998',
    '#dcedc1',
    '#ff99cc',
    '#3d1e6d',
    '#e0ac69',
    '#64a1f4',
]

const getDataSetList = (): any[] => {
    const result: any[] = [];

    CATEGORY_LIST.forEach((category: Category, index: number) => {
        result.push({
            label: category,
            data: MONTHS.map((month:string, monthIndex: number) => faker.datatype.number({ min: monthIndex, max: 1000 })),
            backgroundColor: COLOR_LIST[index % COLOR_LIST.length]
        })
    })

    return result;
}

export const data = {
    labels: MONTHS,
    datasets: getDataSetList()
};

const buildDataset = (transactionList: Transaction[]) => {
    const datasets: any[] = [];

    CATEGORY_LIST.forEach((category: Category, index: number) => {
        datasets.push({
            label: category,
            data: getTransactionByMonthForCategory(transactionList, category),
            backgroundColor: COLOR_LIST[index % COLOR_LIST.length]
        })
    })

    return {
        labels: MONTHS,
        datasets
    }
}

export const SpendByCategory:FC<any> = () => {
    const activeTransactionList: Transaction[] = useSelector(getTransactionList);
    const [monthList] = useState([1,2,3,4,5,6,7,8,9,10,11]);
    const [barData, setBarData] = useState<any>(buildDataset(activeTransactionList));

    useEffect(() => {
        setBarData(buildDataset(activeTransactionList));
    }, [activeTransactionList])

    if(!barData) {
        return (<div>Bar chart is empty</div>)
    }

    return (
        <div style={{width: '50em', height: '62em'}}>
            <Bar options={options} data={barData} />
        </div>
    )
}
