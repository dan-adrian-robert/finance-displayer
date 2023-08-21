import React, {FC, useState} from 'react';
import {Box, Button} from "@mui/material";
import {ColorMap} from "../config/ColorMap";
import { GiKnifeFork, GiMedicines } from "react-icons/gi";
import {IoCarOutline, IoEllipsisHorizontalOutline, IoHeartOutline} from "react-icons/io5";
import {FaChartLine, FaDollarSign, FaGamepad, FaGlassCheers, FaMoneyBillAlt, FaPiggyBank} from "react-icons/fa";
import ColorEditPopup from "../popups/ColorEditPopup";

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap:'wrap',
        gap:'2em'
    },
}

const ICON_SIZE = '1.5rem';

const iconMap: any = {
    FOOD: <GiKnifeFork size={ICON_SIZE}/> ,
    TRANSPORT: <IoCarOutline size={ICON_SIZE}/> ,
    CASH_WITHDRAW: <FaMoneyBillAlt size={ICON_SIZE}/> ,
    INVESTMENT: <FaChartLine size={ICON_SIZE}/> ,
    OTHER: <IoEllipsisHorizontalOutline size={ICON_SIZE}/> ,
    SALARY: <FaDollarSign size={ICON_SIZE}/> ,
    ENERGY: <Box/> ,
    CHARITY: <IoHeartOutline size={ICON_SIZE}/> ,
    SAVINGS:<FaPiggyBank size={ICON_SIZE}/> ,
    PHARMA: <GiMedicines size={ICON_SIZE}/> ,
    GAMING: <FaGamepad size={ICON_SIZE}/> ,
    CLUBBING: <FaGlassCheers size={ICON_SIZE}/> ,
}

const getIcon = (category: string) => {
    return iconMap[category];
}

const getBoxStyle = (color: string) => {
    return {
        backgroundColor: color,
        width: '4rem',
        height: '4rem',
        cursor: 'pointer',
    }
}

const ColorEditView:FC<any> = () => {
    const colorNameList = Object.keys(ColorMap);
    const [editOpen, setEditOpen] = useState(false);
    const [bulkData, setBulkData] = useState<string>('{}');

    const handleClose = () => {
        setEditOpen(false);
    };

    const handleSave = (result: any) => {
        try {
            const result1 = JSON.parse(result);
            console.log(result1);
        } catch (e) {
            console.log(e);
        }
        setEditOpen(false);
    }

    const handleOpen = () => {
        setEditOpen(true);
    };

    return (
        <Box sx={styles.root}>
            <Button onClick={handleOpen}>Open</Button>

            <ColorEditPopup open={editOpen} onClose={handleClose} onSave={handleSave} data={JSON.stringify(bulkData)}/>

            <Box>
                {colorNameList.map((colorKey, colorIndex) => {
                    return <Box key={colorIndex} sx={getBoxStyle(ColorMap[colorKey])}>{`${colorKey} : ${ColorMap[colorKey]}`}</Box>
                })}
            </Box>
        </Box>
    );
}

export default ColorEditView;

