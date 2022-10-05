import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function DeleteTransportButton(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const deleteHandle = () => {
        props.deletefunction()
        setOpen(false);
    }

    const dialogClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton variant="outlined" onClick={handleClickOpen}>
                <DeleteForeverIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={dialogClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Usuwanie Transportu
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Czy napewno chcesz usunąć Transport: {props.name}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={dialogClose}>
                        Nie
                    </Button>
                    <Button onClick={deleteHandle}>Tak</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}