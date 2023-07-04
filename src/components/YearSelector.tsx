import React, {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getSelectedYear, getYearList} from "../selectors";
import {FormControl, InputLabel} from "@mui/material";
import {SMenuItem, SSelect} from "./StyledComponents";
import {setSelectedYear} from "../actions";

export const YearSelector:FC<any> = () => {
    const yearList = useSelector(getYearList);
    const selectedYear = useSelector(getSelectedYear);
    const dispatch = useDispatch();

    const onFormChange = (selectChangeEvent: any) => {
        dispatch(setSelectedYear(selectChangeEvent.target.value));
    };

    return (
        <FormControl variant="standard">
            <InputLabel id="year-label">Year</InputLabel>
            <SSelect
                labelId="year-label"
                id="year-label"
                value={selectedYear}
                label="Year"
                onChange={(selectChangeEvent) => {
                    onFormChange(selectChangeEvent)
                }}
            >
                {yearList.map((yearItem: any, keyItem: number) => {
                    return ( <SMenuItem value={yearItem} key={keyItem}>{yearItem}</SMenuItem>)
                })}
            </SSelect>
        </FormControl>
    )
}
