import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

export const RadioGender = ({ value, onChange, }) => {
    return (
        <FormControl>
            <FormLabel >Gender</FormLabel>
            <RadioGroup defaultValue='female' row value={value} onChange={(_, v) => onChange(v)}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
        </FormControl>
    );
}