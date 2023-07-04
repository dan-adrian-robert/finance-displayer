import moment from "moment/moment";

export const getDateValue = (row: any, key: string) => {
    return moment(row[key]).format('DD/MMMM');
}
