import React from "react"
import {FileInput} from "./Components/FileInput"
import {MainContainer} from "./Components/MainContainer"
import Typography from "@material-ui/core/Typography";
import { PrimaryButton } from "./Components/PrimaryButton";
import { Form } from "./Components/Form";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import {useData} from "./DataContext"

export const Step3 = () => {
    const history = useHistory()
    const {data, setValues} = useData()

    const  {control, handleSubmit} = useForm({
      defaultValues: {
            files: data.files
        }
    })
    const onSubmit = (data) => {
        history.push("./result")
        setValues(data)
    }
    return (
        <MainContainer>
          <Typography component="h2" variant="h5">
            Step 3
          </Typography>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FileInput name="files" control={control} />
            <PrimaryButton >Next</PrimaryButton>
          </Form>
        </MainContainer>
      );
}