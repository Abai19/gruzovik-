import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { DeleteItem } from '@src/api/api';
import { useAuth } from '@src/context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

interface IProps {
    open: boolean,
    setOpen: (open: boolean) => void,
    id: number,
    label: "cargo" | "car",
    fetchData?: (token:string)=> void
}

const DeleteComponent = ({ open, setOpen, id, label, fetchData }: IProps) => {
    const theme = useTheme();
    const {token} = useAuth();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async () => {
        handleClose();
        if (!token) {
            return;
        }
        try {
            const response = await DeleteItem(token, label, id);
            if (axios.isAxiosError(response)) {
                if (response.response) {
                    toast.error(response.response.data.message, { autoClose: 1000 });
                } else {
                    toast.error(response.message, { autoClose: 1000 });
                }
            } else {
                fetchData!(token)
                toast.success('Успешно удалено!', { autoClose: 1000 });
            }
        } catch (error) {
            // Handle the error here
        }
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Вы уверены что хотите удалить 
                    {
                        label === 'car' ? ' траснпорт' : ' груз'
                    }?
                </DialogTitle>
                <DialogActions>
                    <Button variant='contained' autoFocus onClick={onSubmit}>
                        Да
                    </Button>
                    <Button variant='outlined' onClick={handleClose} autoFocus>
                        Отмена
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteComponent;
