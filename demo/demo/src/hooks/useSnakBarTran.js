import { useCallback, } from "react";
import { useSnackbar as useNotistackSnackbar } from "notistack";

export const useSnakBarTran = () => {
    const { enqueueSnackbar } = useNotistackSnackbar();

    const showSnackbarVariant = useCallback(
        ({ text, action_text, onActionClick, variant }) =>
            enqueueSnackbar(
                text,
                { autoHideDuration: action_text && onActionClick ? 6000 : 4000, variant }
            ),
        [enqueueSnackbar]
    );

    const showSuccessSnackbar = useCallback(
        ({ text, action_text, onActionClick }) => {
            showSnackbarVariant({
                variant: "success",
                text,
                action_text,
                onActionClick
            });
        },
        [showSnackbarVariant]
    );

    const showErrorSnackbar = ({ text, action_text, onActionClick }) => {
        showSnackbarVariant({
            variant: "error",
            text,
            action_text,
            onActionClick
        });
    }

    const showInfoSnackbar = ({ text, action_text, onActionClick }) => {
        showSnackbarVariant({
            variant: "info",
            text,
            action_text,
            onActionClick
        });
    }

    return {
        showSuccessSnackbar,
        showErrorSnackbar,
        showInfoSnackbar
    };
};

