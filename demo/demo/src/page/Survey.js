/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { Button, Divider, Grid, Typography, Stack, CircularProgress } from "@mui/material"
import { QuestionOption, HoverRating, SliderScore, MultiCheckBox, RadioQuestion } from '../components';
import { add, setLoading as setLoadGetUser } from '../redux/reducers/userDetails';
import { useSnakBarTran } from '../hooks/useSnakBarTran';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const typeToScore = {
    "very high": 5,
    "high": 4,
    "medium": 3,
    "low": 2,
    "very low": 1
}
const yesNo = {
    "Yes": 5,
    "No": 0
}
export const Survey = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { showErrorSnackbar, showSuccessSnackbar } = useSnakBarTran();
    const urlQuery = new URLSearchParams(window.location.search);
    const { firstName, loading: loadingUser } = useSelector(store => store.details.details)
    const [answer, setAnswer] = useState({
        q1: 0,
        q2: 0,
        q3: 0,
        q4: 'Yes',
        q5: 'high',
        q6: 0
    });
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!firstName) {
            fetchUserDetails()
        }
    }, [firstName])

    const fetchUserDetails = async () => {
        try {
            dispatch(setLoadGetUser())
            const { data } = await axios.get("http://localhost:8080/users/" + urlQuery.get('email'))
            dispatch(add(data))
            showSuccessSnackbar({ text: 'fetching user Data' })
        } catch (e) {
            navigate('../form');
            showErrorSnackbar({ text: 'Fail to Score' })
        }
    }

    const onCalculate = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);

        let { q1, q2, q3, q4, q5, q6 } = answer;
        q6 = q6 / 20;
        q3 = q3 / 20;

        let newScore = (q1 + q2 + q3 + q6 + typeToScore[q5] + yesNo[q4]) / 6;
        setScore(newScore)
    }


    const onChange = (name, value) => {
        const allAnswer = { ...answer };
        allAnswer[name] = value;
        setAnswer({ ...allAnswer })
    }

    if (loadingUser) {
        return <CircularProgress />
    }

    return <Grid container
        direction='column'
        spacing={2}
        sx={{
            width: '40%',
            margin: '4rem auto',
            padding: '0rem 2rem 1rem 2rem',
            backgroundColor: '#f1f1f1',
            borderRadius: '12px'
        }}>
        <Grid item>
            <Typography variant="h6" textAlign="center">
                Hello {firstName}, let calculate Happiness
            </Typography>
            <Divider />
        </Grid>
        {loading ?
            <Stack justifyContent='center' alignItems='center' sx={{
                width: '100%',
                margin: 'auto',
                padding: '2rem'
            }}>
                <CircularProgress size={100} />
            </Stack>
            : <>
                <QuestionOption number={1} question="How satisfied are you with your current workplace and job?">
                    <HoverRating
                        value={answer['q1']}
                        setValue={(v) => onChange('q1', v)}
                    />
                </QuestionOption>
                <QuestionOption number={2} question="How is your Work-life balance?">
                    <HoverRating
                        value={answer['q2']}
                        setValue={(v) => onChange('q2', v)}
                    />
                </QuestionOption>
                <QuestionOption number={3} question="To what extent are you satisfied with the support you receive from your manager when you need it?">
                    <SliderScore
                        value={answer['q3']}
                        onChange={(v) => onChange('q3', v)}
                    />
                </QuestionOption>
                <QuestionOption number={4} question="Does your team inspire you to do your best work?">
                    <MultiCheckBox options={["Yes", "No"]}
                        value={answer['q4']}
                        onChange={(v) => onChange('q4', v)}
                    />
                </QuestionOption>
                <QuestionOption number={5} question="To what degree is the management team transparent?">
                    <RadioQuestion options={["very high", "high", "medium", "low", "very low"]}
                        value={answer['q5']}
                        onChange={(v) => onChange('q5', v)}
                    />
                </QuestionOption>
                <QuestionOption number={6} question="On a scale of 1 to 100, how comfortable are you in giving feedback to your manager?">
                    <SliderScore
                        value={answer['q6']}
                        onChange={(v) => onChange('q6', v)}
                    />
                </QuestionOption>
            </>
        }
        <Stack justifyContent='center'>
            <Button variant="contained" type="submit"
                onClick={onCalculate}
                sx={{
                    width: '40%',
                    margin: 'auto',
                }} >
                {!score ? "Calculate" : "Recalculate"}
            </Button>
        </Stack>
        {!loading &&
            <Stack justifyContent='center'>
                <Typography textAlign='center'>
                    Your Score: {score.toFixed(2)}
                </Typography>
            </Stack>
        }
    </Grid>
}