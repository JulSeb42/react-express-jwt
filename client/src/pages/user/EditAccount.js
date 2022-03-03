// Packages
import React, { useContext, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Font, Form, Input, Alert } from "components-react-julseb"

// API
import { AuthContext } from "../../context/auth"
import userService from "../../api/user.service"

// Components
import Page from "../../components/layouts/Page"
import DangerZone from "../../components/DangerZone"

const EditAccount = ({ edited, setEdited }) => {
    const { user, setUser, setToken, logoutUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const title = "Edit your account"

    // Form items
    const [fullName, setFullName] = useState(user.fullName)
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleFullName = e => setFullName(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { fullName }

        userService
            .editAccount(user._id, requestBody)
            .then(res => {
                setUser(res.data.user)
                setToken(res.data.authToken)
                setEdited(!edited)
                navigate(-1)
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    // Delete account
    const handleDelete = e => {
        e.preventDefault()

        userService
            .deleteAccount(user._id)
            .then(() => {
                logoutUser()
                navigate("/goodbye")
            })
            .catch(err => console.log(err))
    }

    return (
        <Page title={title} template="form">
            <Font.H1>{title}</Font.H1>

            <Form
                btnprimary="Save changes"
                btncancel="/my-account"
                onSubmit={handleSubmit}
            >
                <Input
                    label="Full name"
                    id="fullName"
                    onChange={handleFullName}
                    value={fullName}
                />

                <Input
                    label="Email"
                    helperBottom="You can not edit your email"
                    value={user.email}
                    disabled
                />
            </Form>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

            <Font.P>
                <Link to="/my-account/edit-password">Edit your password.</Link>
            </Font.P>

            <DangerZone
                textBtnOpen="Delete account"
                text="Are you sure you want to delete your account?"
                textBtnPrimary="Yes, delete my account"
                onClickPrimary={handleDelete}
            />
        </Page>
    )
}

export default EditAccount
