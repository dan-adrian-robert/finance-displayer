import React, {FC, useState} from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Button from '@mui/material/Button';

interface IProps {
    open: boolean;
    onClose: any;
    onSave: any;
    data: any;
}
const ColorEditPopup:FC<IProps> = (props) => {

    const {open, onClose, onSave, data} = props;

    const [value, setValue] = useState(data);

    return (
        <>
            {open &&
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="edit-color-dialog-title"
                aria-describedby="edit-color-dialog-description"
            >
                <DialogTitle id="edit-color-dialog-title">Edit Color Popup</DialogTitle>
                <DialogContent>
                    <TextField
                        value={value}
                        onChange={(event: any)=> {
                            setValue(event.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={onClose}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={()=>{onSave(value)}}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            }
        </>
    );
}

export default ColorEditPopup;

