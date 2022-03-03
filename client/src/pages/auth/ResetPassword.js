// Packages
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Font, Form, Input, Alert } from "components-react-julseb"

// API
import authService from "../../api/auth.service"

// Components
import Page from "../../components/Page"

const ResetPassword = () => {
    const navigate = useNavigate()

    const title = "Reset your password"

    // Form items
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handlePassword = e => setPassword(e.target.value)

    // Get token and ID from url
    const splittedUrl = window.location.href.split("/")
    const token = splittedUrl[4]
    const id = splittedUrl[5]

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { password, resetToken: token, id }

        authService
            .resetPassword(requestBody)
            .then(() => navigate("/login"))
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
            
    }

    return (
        <Page title={title} template="form">
            <Font.H1>{title}</Font.H1>

            <Form btnprimary="Reset your password" onSubmit={handleSubmit}>
                <Input
                    label="New password"
                    id="password"
                    password
                    iconpassword
                    onChange={handlePassword}
                    value={password}
                />
            </Form>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
        </Page>
    )
}

export default ResetPassword
