import React, {FC, useRef} from "react";
import {Button, styled} from "@mui/material";

const StyledInput = styled('input')({
    display: 'none',
});

interface IProps {
    onChange: (event: any) => void
}
export const CustomFileInput:FC<IProps> = ({onChange}) => {
    const fileInputRef = useRef<any>(null);

    const handleButtonClick = (): void => {
        if (fileInputRef != null &&
            fileInputRef.current != null &&
            fileInputRef.current.click != null
        ) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <Button
                variant='contained'
                color='primary'
                onClick={handleButtonClick}
            >
                Select File
            </Button>
            <StyledInput
                ref={fileInputRef}
                type="file"
                onChange={onChange}
            />
        </>
    )
}
