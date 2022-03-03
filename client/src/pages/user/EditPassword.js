// Packages
import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Font, Form, Input, Alert } from "components-react-julseb"

// API
import { AuthContext } from "../../context/auth"
import userService from "../../api/user.service"

// Components
import Page from "../../components/layouts/Page"

const EditPassword = ({ edited, setEdited }) => {
    const { user, setUser, setToken } = useContext(AuthContext)
    const navigate = useNavigate()

    const title = "Edit your password"

    // Form items
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handlePassword = e => setPassword(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        userService
            .editPassword(user._id, { password })
            .then(res => {
                setUser(res.data.user)
                setToken(res.data.authToken)
                setEdited(!edited)
                navigate("/my-account")
            })
            .catch(err => setErrorMessage(err.response.data.message))
    }

    return (
        <Page title={title} template="form">
            <Font.H1>{title}</Font.H1>

            <Form
                onSubmit={handleSubmit}
                btnprimary="Save changes"
                btncancel="/my-account"
            >
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

export default EditPassword
