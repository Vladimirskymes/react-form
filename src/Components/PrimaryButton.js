import React from "react"
import {makeStyles} from "@material-ui/core/styles"
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3,0,2)
    }
}))

export const PrimaryButton = ({children, ...props}) =>{
    const styles = useStyles()
    return<Button type="submit" className={styles.root} variant="contained" color="primary" fullWidth {...props}>{children} </Button>
}