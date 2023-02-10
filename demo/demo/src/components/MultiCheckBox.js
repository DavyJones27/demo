import { FormControl, Checkbox, FormGroup, FormControlLabel } from '@mui/material';

export const MultiCheckBox = ({ options, onChange, value }) => {

    return <FormControl component="fieldset" onChange={console.log}>
        <FormGroup aria-label="position" row >
            {options.map((ele, index) =>
                <FormControlLabel
                    key={index}
                    onChange={console.log}
                    control={<Checkbox
                        onClick={() => onChange(ele)}
                        checked={ele === value}
                    />}
                    label={ele}
                    labelPlacement="start"
                />
            )}
        </FormGroup>
    </FormControl>

}