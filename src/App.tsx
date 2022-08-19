import React from 'react';
import './App.css';
import * as XLSX from 'xlsx';
import {getDataPointsFromSpendList} from "./utils";
import SpendChart from "./SpendChart";
import {Transaction} from "./types";

function App() {
    const onChange = (e: any) => {
        const [file] = e.target.files;
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target?.result;
            const wb = XLSX.read(bstr, { type: "binary"});
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_csv(ws);
            const transactionList = getDataPointsFromSpendList(data);
            // transactionList.map((item: Transaction) => {
            //     console.log(item.registrationDate);
            // })
            console.log(transactionList[0])
            console.log(transactionList[transactionList.length - 1]);
        };
        reader.readAsBinaryString(file);
    };

  return (
    <div className="App">
      <div>
          <input type="file" onChange={onChange} />
          <SpendChart/>
      </div>
        <></>
    </div>
  );
}

export default App;
