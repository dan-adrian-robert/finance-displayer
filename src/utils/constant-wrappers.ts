import {Category} from "../types";
import {CATEGORY_COLOR, MONTHS} from "../config/constants";

export const getCategoryColor = (category: Category) => {
    return CATEGORY_COLOR[category]? CATEGORY_COLOR[category]: '#0097D1';
}

export const getMonthNames = () => {
    return MONTHS.map(month => month.value);
}

