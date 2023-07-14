export const numberConvertor = (value: any) => {
    if (typeof value === 'string') {

        const commaList = value.split(',');

        const value2 = commaList[0];

        const pointList = value2.split('.');

        const result = parseFloat(pointList[0]);

        return result;
    }

    if (typeof value === 'number') {
        return value;
    }

    return 0;
}