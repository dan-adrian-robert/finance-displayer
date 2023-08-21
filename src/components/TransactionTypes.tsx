import React, {FC, useEffect, useState} from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import {getSpendMap} from "../utils/utils";
import {Month, Transaction} from "../types";
import {CATEGORY_COLOR } from "../config/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

 const buildChartData = (spendMap: any) => {
    const labels: string[] = Object.keys(spendMap);
    console.log('labels: ', labels);
    const colorList: any[] = [];
    const data: any[] = labels.map((label:any) => {
        colorList.push(CATEGORY_COLOR[label]);
        return spendMap[label].amount;
    });

    return {
        labels,
        datasets: [
            {
                label: '',
                data: data,
                backgroundColor: colorList,
                borderColor: ['#2C3333'],
                borderWidth:2,
            },
        ],
    }
};

interface IProps {
    transactionList: Transaction[],
    month: Month
}

export const TransactionTypes:FC<IProps> = ({transactionList, month}) => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const spendMap = getSpendMap(transactionList);
        const data = buildChartData(spendMap);
        setData(data);
    }, [transactionList])

    if (!data) {
        return <div>No Transaction Data</div>
    }

    if (data.datasets[0].data.length === 0) {
        return (
            <div>
                <div>{month.value}</div>
                <div>No Transaction Data</div>
            </div>
        )
    }

    return (
        <>
            <div>{month.value}</div>
            <Doughnut
                data={data}
                options={{
                    responsive: true,
                    maintainAspectRatio: true,
                }}
            />
        </>

    )
}
