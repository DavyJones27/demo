import { Radio, RadioGroup, FormControlLabel, FormControl, } from '@mui/material';

export const RadioQuestion = ({ value, onChange, options }) => {
    return (
        <FormControl>
            <RadioGroup row value={value} onChange={(_, v) => onChange(v)}>
                {options.map((ele, index) =>
                    <FormControlLabel key={index} value={ele} control={<Radio />} label={ele} />
                )}
            </RadioGroup>
        </FormControl>
    );
}