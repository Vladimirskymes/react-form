import React from "react";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup';
import { PrimaryButton } from "./Components/PrimaryButton";
import { MainContainer } from "./Components/MainContainer";
import { Form } from "./Components/Form";
import { Input } from "./Components/Input";
import {useData} from "./DataContext"
import * as yup from "yup";

const schema = yup.object().shape({
    firstName: yup.string()
    .matches(/^([^0-9]*)$/, "first name should not contain number")
    .required("first name is a required field"),
    lastName: yup.string()
    .matches(/^([^0-9]*)$/, "last name should not contain number")
    .required("last name is a required field")
});
export const Step1 = () => {
    const history = useHistory()
    const {data, setValues} = useData();
    const {register, handleSubmit, errors} = useForm({
        defaultValues: {firstName: data.firstName, lastName: data.lastName},
        mode: "onBlur",
        resolver: yupResolver(schema)
    })
    const onSubmit = (data) => {
        history.push("/step2")
        setValues(data)
    }
    return <MainContainer>
        <Typography component="h2" variant = "h5">Step 1</Typography>
        <Form onSubmit = {handleSubmit(onSubmit)}> 
            <Input  ref={register} id ="firstName" type="text" label="First Name" name="firstName" error={!!errors.firstName}
          helperText={errors?.firstName?.message} ></Input>
            <Input ref={register} id ="lastName" type="text" label="Last Name" name="lastName" 
            error={!!errors.lastName}
            helperText={errors?.lastName?.message} ></Input>
            <PrimaryButton>Next</PrimaryButton>
        </Form>
    </MainContainer>
}