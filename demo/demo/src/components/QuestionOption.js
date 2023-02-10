import { Grid, Typography } from "@mui/material"

export const QuestionOption = ({ question, children, number }) => {

    return <Grid item>
        <Typography>
            {number}.{" " + question}
        </Typography>
        {children}
    </Grid>
}