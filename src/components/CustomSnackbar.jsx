import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
export default function CustomSnackbar({
    open,
    setOpen,
    message,
}) {
    const onClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            message={message}
            action={
                <>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </>
            }
        />
    );
}