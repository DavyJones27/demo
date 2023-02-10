/* eslint-disable react/prop-types */
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useSnackbar } from 'notistack';

export const SnackbarCloseButton = ({ snackbarKey }) => {
    const { closeSnackbar } = useSnackbar();

    return (
        <HighlightOffIcon onClick={() => closeSnackbar(snackbarKey)} />
    );
}
