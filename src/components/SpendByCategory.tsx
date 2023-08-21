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
import {Category, CATEGORY_LIST, Transaction} from "../types";
import {getTransactionByDayInMonthForCategory, getTransactionByMonthForCategory} from "../utils/utils";
import {getCategoryColor} from "../utils/constant-wrappers";
import {DAYS} from "../config/constants";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const buildOptions = (title: string) => {
    return {
        plugins: {
            title: {
                display: true,
                text: title,
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
    }
}

export const buildDataset = (transactionList: Transaction[], labels: string[]) => {
    const datasets: any[] = [];

    CATEGORY_LIST.forEach((category: Category, index: number) => {
        datasets.push({
            label: category,
            data: getTransactionByMonthForCategory(transactionList, category),
            backgroundColor: getCategoryColor(category),
        })
    })

    return {
        labels,
        datasets
    }
}

const buildDatasetForDays = (transactionList: Transaction[], labels: any[]) => {
    const datasets: any[] = [];

    CATEGORY_LIST.forEach((category: Category, index: number) => {
        datasets.push({
            label: category,
            data: getTransactionByDayInMonthForCategory(transactionList, category),
            backgroundColor: getCategoryColor(category),
        })
    })

    return {
        labels,
        datasets
    }
}


interface IProps {
    transactionList: Transaction[],
    year: number,
    month: string,
}

export const SpendByCategory:FC<IProps> = (props: IProps) => {
    const {transactionList, year, month} = props;

    const [barData, setBarData] = useState<any>(null);

    useEffect(() => {
        setBarData(buildDatasetForDays(transactionList, DAYS));
    }, [transactionList])

    if (!barData) {
        return (<div>Bar chart is empty</div>)
    }

    return (
        <Bar options={buildOptions(`${year}-${month}`)} data={barData} />
    )
}
