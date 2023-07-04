import {styled} from "@mui/system";
import {MenuItem, Select, TableCell} from "@mui/material";

export const STableCell = styled(TableCell)({
    backgroundColor: '#121734',
    color: 'rgba(255, 255, 255, 0.7)'
});

export const SMenuItem = styled(MenuItem)({
    backgroundColor: '#2E4676',
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
        backgroundColor: '#3365BC',
        color: 'rgba(255, 255, 255, 0.7)',
    },
    '&:focus': {
        backgroundColor: '#D1C6E8',
        color: 'rgba(0, 0, 0, 0.7)',
    },
})

export const SSelect = styled(Select)({
    color: 'rgba(255, 255, 255, 0.7)',
});
