import React from 'react';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function AnalyticsNotice() {
    const [open, setOpen] = React.useState(window.localStorage.getItem('analyticsNotice') !== 'false');

    const [modalOpen, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setModalOpen(false);
        window.localStorage.setItem('analyticsNotice', 'false');
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleModalOpen} sx={{ color: 'white' }}>
                WAIT WHAT?
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" sx={{ color: 'white' }}/>
            </IconButton>
        </React.Fragment>
    );
    return (
        <div>
            <Snackbar open={open} onClose={handleClose} action={action}>
                <Alert severity="info" action={action}>hi this website uses <a href='https://umami.is' style={{ color: "white" }}><u>umami</u></a> for analytics</Alert>
            </Snackbar>
            <Modal
                open={modalOpen}
                onClose={() => handleClose()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Analytics
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Umami is used to track page visits. These aren't sold to anyone and are just to see what you guys like.

                        Endpoint is https://analytics.srizan.dev
                    </Typography>
                </Box>
            </Modal>
        </div>

    )
}