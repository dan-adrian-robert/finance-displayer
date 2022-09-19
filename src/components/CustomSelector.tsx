import React, {FC} from "react";
import {MenuItem} from "@mui/material";
import Select from "@mui/material/Select";

interface IProps {
    onSelectChange: any;
    selectedItem: string | number;
    itemList: any[];
    label?: string;
}

export const CustomSelector:FC<IProps> = ({onSelectChange, itemList, selectedItem, label}) => {
    return (
        <Select
            value={selectedItem}
            label={label? label: 'Select'}
            onChange={onSelectChange}
        >
            {itemList.map((item: any, yearIndex: number) => {
                return <MenuItem key={yearIndex} value={item}>{item}</MenuItem>
            })}
        </Select>
    )
}
