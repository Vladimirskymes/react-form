import React from "react"
import { useHistory } from "react-router-dom";
import { MainContainer } from "./Components/MainContainer";
import { Form } from "./Components/Form";
import { Input } from "./Components/Input";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "./Components/PrimaryButton";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import {parsePhoneNumberFromString} from "libphonenumber-js"
import {useData} from "./DataContext"
export const Step2 = () =>{
    const schema = yup.object().shape({
        email: yup.string().email("Email should have correct format")
        .required("Email is a required field")
    })
    const {data, setValues} = useData();
    const history = useHistory()
    const {register, handleSubmit, errors, watch} = useForm({
        defaultValues: {email: data.email, hasPhone: data.hasPhone, phoneNumber: data.phoneNumber },
        mode: "onBlur",
        resolver: yupResolver(schema)
    })
    const onSubmit = (data) => {
        history.push("/step3")
        setValues(data)
    }
    const normalizePhoneNumber = (value) => {
        const phoneNumber = parsePhoneNumberFromString(value);
        if(!phoneNumber){
            return value
        }
        return phoneNumber.formatInternational()
    }
    const hasPhone = watch("hasPhone")
    return <MainContainer>
    <Typography component="h2" variant = "h5">Step 2</Typography>
    <Form onSubmit = {handleSubmit(onSubmit)}> 
        <Input error={!!errors.email}
      helperText={errors?.email?.message} ref={register} id ="email" type="email" label="Email" name="email" required  ></Input>
        <FormControlLabel name = "hasPhone" inputRef = {register} color = "primary" control={
        <Checkbox 
        defaultValues = {data.hasPhone} 
        defaultChecked = {data.hasPhone}
        name="hasPhone" 
        inputRef = {register} color="primary"/>} label="Do you have a phone"/>
        {
            hasPhone && (
                <Input ref={register} id="phoneNumber"  type="tel" label="Phone number" name="phoneNumber"
                onChange = {(event) => {
                    event.target.value = normalizePhoneNumber(event.target.value);
                }}/>
            )
        }
        <PrimaryButton>Next</PrimaryButton>
    </Form>
</MainContainer>
}