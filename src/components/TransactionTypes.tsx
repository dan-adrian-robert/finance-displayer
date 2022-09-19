import React, {FC, useEffect, useState} from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {useSelector} from "react-redux";
import {getTransactionList} from "../selectors";
import { Doughnut } from "react-chartjs-2";
import {CustomSelector} from "./CustomSelector";
import {getSpendMap} from "../utils";

ChartJS.register(ArcElement, Tooltip, Legend);

export const getChartData = (spendMap: any) => {
    const labels: string[] = Object.keys(spendMap);
    const data: any[] = labels.map((label:string) => {
        return spendMap[label].amount;
    });

    return {
        labels,
        datasets: [
            {
                label: 'Spend',
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
                borderWidth:2,
            },
        ],
    }
};

export const TransactionTypes:FC<any> = () => {
    const activeTransactionList = useSelector(getTransactionList);
    const [data, setData] = useState<any>(null);
    const [typeList, setTypeList] = useState<any[]>([]);
    const [selectedType, setSelectedType] = useState<string| number>('');

    useEffect(() => {
        const spendMap = getSpendMap(activeTransactionList);
        const list: any[] = Object.keys(spendMap)
        setTypeList(list);
        setSelectedType(list[0]);

        const data = getChartData(spendMap);
        setData(data);
    }, [activeTransactionList])

    const onSelectChange = (event: any) => {
        setSelectedType(event.target.value);
    }

    if (!data) {
        return <div>No Transaction Data</div>
    }

    return (
        <div style={{width: '42em', height: '42em'}}>
            <Doughnut data={data} options={{
                responsive: true,
                maintainAspectRatio: true,
            }}/>
            <CustomSelector
                itemList={typeList}
                onSelectChange={onSelectChange}
                selectedItem={selectedType}
            />
        </div>
    )
}
