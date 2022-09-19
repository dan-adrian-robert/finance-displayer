import React, {FC, useState} from "react";
import {Chart as ChartJS, Tooltip, Legend, LinearScale, PointElement} from 'chart.js';
import {useSelector} from "react-redux";
import {getTransactionList} from "../selectors";
import { Bubble } from "react-chartjs-2";
import {Transaction} from "../types";
import moment from "moment";
import {CustomSelector} from "./CustomSelector";

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

const buildData = (transactionList: Transaction[], month: number) => {
    const dataSet: any[] = [];

    let maxSpend = 0;

    for (let i = 0; i < transactionList.length; i++) {
        const item: Transaction= transactionList[i];
        if (item.debit) {
            console.log(item.debit);
        }
        if (parseInt(item.debit) > maxSpend) {
            maxSpend = item.debit;
        }
    }

    transactionList.map((transaction: Transaction) => {
        const date = moment(transaction.registrationDate);
        if (transaction.debit && date.month() === month) {
            // const size = getNormalizedValue(maxSpend,transaction.debit);
            const point = {
                x: date.date(),
                y: transaction.debit,
                r: getNormalizedValue(maxSpend,transaction.debit),
            }
            dataSet.push(point);
        }
        return null;
    })

    dataSet.push({x:30,y:0,r:1})

    return {
        datasets: [
            {
                label: 'Spend',
                data: dataSet,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    }
}

export const TransactionByMonth:FC<any> = () => {
    const activeTransactionList: Transaction[] = useSelector(getTransactionList);
    const [monthList] = useState([1,2,3,4,5,6,7,8,9,10,11]);
    const [selectedMonth, setSelectedMonth] = useState(1);

    const onSelectChange = (event: any) => {
        setSelectedMonth(event.target.value);
    }

    return (
        <div style={{width: '42em', height: '42em'}}>
            <CustomSelector
                itemList={monthList}
                onSelectChange={onSelectChange}
                selectedItem={selectedMonth}
            />
            <Bubble options={options} data={buildData(activeTransactionList, selectedMonth)} />
        </div>
    )
}
