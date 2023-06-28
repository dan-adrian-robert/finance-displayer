import * as XLSX from "xlsx";

export const convertWBtoJSON = (workBook: XLSX.WorkBook): any => {
    const result: any = {};
    workBook.SheetNames.forEach((sheetName) => {
        const worksheet = workBook.Sheets[sheetName];
        result[sheetName] = XLSX.utils.sheet_to_json(
            worksheet,
            {
                range: 20 ,
                blankrows: false,
                header: ['registerDate', 'transactionDate', 'debit', 'credit', 'opNumber', 'beneficiaryCode', 'finalOrderer', 'finalBeneficiary', 'sourceName','sourceBankName', 'accoutNumber', 'description']
            }
        );

    });
    return result;
}