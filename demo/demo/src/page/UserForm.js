import { Button, CircularProgress, Grid, Stack, TextField, Typography, } from "@mui/material"
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Form, FormikProvider, useFormik, Field } from 'formik';
import { useState } from "react";
import { RadioGender, AutocompleteF, } from '../components'
import { skills } from '../data/skills';
import axios from "axios";
import { DateModal } from '../util/formateDate';
import { useSnakBarTran } from '../hooks/useSnakBarTran';
import { add } from '../redux/reducers/userDetails';
import { useNavigate } from "react-router-dom";

export const UserForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [gender, setGender] = useState('female');
    const { showErrorSnackbar, showSuccessSnackbar } = useSnakBarTran()
    const [dateOfJoin, setDateOfJoin] = useState(new Date().toString());
    const [dateOfBirth, setDateOfBirth] = useState(new Date().toString());
    const formSchema = Yup.object().shape({
        firstName: Yup.string().trim().required('First Name is required'),
        lastName: Yup.string().trim().required('Last Name is required'),
        email: Yup.string().trim().email("invalid email").required('email is a required field'),
        education: Yup.string().trim().required('education is required'),
        role: Yup.string().trim().required('role is required'),
        skills: Yup.array().min(1, "please add your skills"),
        salary: Yup.number().required("please add your salary")
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            education: '',
            role: '',
            skills: [],
            dateOfJoin: '',
            salary: null
        },
        validationSchema: formSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true)

                const { data } = await axios.post("http://localhost:8080/users", {
                    ...values,
                    gender,
                    dateOfBirth: DateModal(dateOfBirth),
                    qualification: {
                        salary: values.salary,
                        education: values.education,
                        role: values.role,
                        dateOfJoin: DateModal(dateOfJoin),
                        skills: values.skills.map(({ value }) => value)
                    },
                })
                dispatch(add(data))
                showSuccessSnackbar({ text: "details stored SucessFully" });
                navigate(`../survey?email=${values.email}`)
            } catch (e) {
                console.log(e.response.data);
                if (e?.response?.data) {
                    showErrorSnackbar({ text: e?.response?.data.message });
                } else {
                    showErrorSnackbar({ text: "Failed to save." });
                }
            } finally {
                setLoading(false);
            }

        }
    })

    const { errors, touched, handleSubmit, getFieldProps, } = formik;

    return <Grid container display='grid' sx={{
        padding: '2rem',
        width: '100vw'
    }
    } >
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit} style={{
                width: '80%',
                margin: 'auto',
                padding: '2rem',
                backgroundColor: '#f1f1f1',
                borderRadius: '12px'
            }} >
                <Typography variant="h6" sx={{
                    textAlign: 'center',
                    margin: '1rem'
                }}>
                    User Details
                </Typography>
                <Grid item container spacing={3}>
                    <Grid item xs={12} md={6} >
                        <TextField
                            fullWidth
                            label="First Name"
                            {...getFieldProps('firstName')}
                            error={Boolean(touched.firstName && errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            {...getFieldProps('lastName')}
                            error={Boolean(touched.lastName && errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                        />
                    </Grid>
                </Grid>
                <Grid item container spacing={1} sx={{
                    marginTop: '1rem'
                }}>
                    <Grid item xs={12} md={4}>
                        <TextField
                            type='email'
                            fullWidth
                            label="Email"
                            {...getFieldProps('email')}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DesktopDatePicker
                            label='Date Of Birth'
                            inputFormat="DD/MM/YYYY"
                            value={dateOfBirth}
                            maxDate={new Date()}
                            onChange={(v) => setDateOfBirth(v)}
                            renderInput={(params) => <TextField {...params}
                                sx={{
                                    bgcolor: '#F1F1F1',
                                    borderRadius: 1,
                                }}
                            />}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <RadioGender value={gender} onChange={setGender} />
                    </Grid>
                </Grid>
                <Grid item container spacing={1.5} sx={{
                    marginTop: '1rem'
                }}>

                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Education"
                            {...getFieldProps('education')}
                            error={Boolean(touched.education && errors.education)}
                            helperText={touched.education && errors.education}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            fullWidth
                            label="Role"
                            {...getFieldProps('role')}
                            error={Boolean(touched.role && errors.role)}
                            helperText={touched.role && errors.role}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DesktopDatePicker
                            maxDate={new Date()}
                            label='Date Of Join'
                            inputFormat="DD/MM/YYYY"
                            value={dateOfJoin}
                            onChange={(v) => setDateOfJoin(v)}
                            renderInput={(params) => <TextField {...params}
                                sx={{
                                    bgcolor: '#F1F1F1',
                                    borderRadius: 1,
                                }}
                            />}
                        />
                    </Grid>
                </Grid>
                <Grid item container spacing={3} sx={{
                    marginTop: '1rem'
                }}>
                    <Grid item xs={12} md={6}>
                        <Field
                            name="skills"
                            component={AutocompleteF}
                            label="Skills"
                            options={skills}
                            textFieldProps={{
                                fullWidth: true,
                                variant: 'outlined'
                            }}
                            multiple
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            type='number'
                            fullWidth
                            label="Salary"
                            {...getFieldProps('salary')}
                            error={Boolean(touched.salary && errors.salary)}
                            helperText={touched.salary && errors.salary}
                        />
                    </Grid>
                </Grid>
                <Stack justifyContent='center' sx={{
                    padding: '2rem'
                }}>
                    <Button variant="contained" type="submit" sx={{
                        width: '20%',
                        margin: 'auto'
                    }} >
                        {loading ? <CircularProgress
                            sx={{
                                color: "#fff"
                            }}
                        /> : "Next"}
                    </Button>
                </Stack>

            </Form>
        </FormikProvider>
    </Grid >
} 