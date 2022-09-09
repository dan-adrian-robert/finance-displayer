import React, {FC} from 'react';
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

const getDataset = (spendList: any[]) => {
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

const getSpendData= (month: string, monthIndex: number, spendList: any[]) => {
    let result = 0;
    spendList.map((item: any) => {
       if (item.transactionDate.isValid()) {
           const month = item.transactionDate.month();
           if (monthIndex === month) {
               result += Number.parseInt(item.debit || 0);
           }
       }
    });
    return result;
}

const getEarnData = (month: string, monthIndex: number, spendList: any[]) => {
    let result = 0;
    spendList.map(item => {
        if (item.registrationDate.isValid()) {
            const month = item.registrationDate.month();
            if (monthIndex === month) {
                result += Number.parseInt(item.credit || 0);
            }
        }
    });
    return result;
}

export const SpendChart:FC<any> = ({spendList}) => {
    const data = getDataset(spendList);
    return (
        <div className='chart'>
            <Bar options={options} data={data}/>
        </div>
    );
}

export default SpendChart;

