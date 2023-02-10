/* eslint-disable react/prop-types */
import { Autocomplete, TextField } from "@mui/material"
import { fieldToTextField } from 'formik-material-ui'
export const AutocompleteF = ({ textFieldProps, ...props }) => {
    const {
        form: { setTouched, setFieldValue }
    } = props
    const { error, helperText, ...field } = fieldToTextField(props)
    const { name } = field

    return (
        <Autocomplete
            fullWidth
            disablePortal
            {...props}
            {...field}
            onChange={(_, value) => setFieldValue(name, value)}
            onBlur={() => setTouched({ [name]: true })}
            // getOptionSelected={(item, current) => item.value === current.value}
            renderInput={props => (
                <TextField
                    label={"Skills"}
                    {...props}
                    {...textFieldProps}
                    helperText={helperText}
                    error={error}
                />
            )}
        />
    )
}
