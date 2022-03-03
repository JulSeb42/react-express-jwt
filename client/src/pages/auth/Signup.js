// Packages
import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
    Font,
    Form,
    Input,
    Alert,
    getRandomString,
} from "components-react-julseb"

// API
import { AuthContext } from "../../context/auth"
import authService from "../../api/auth.service"

// Components
import Page from "../../components/Page"

const Signup = () => {
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Form items
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)

    // Form handles
    const handleFullName = e => setFullName(e.target.value)
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = {
            fullName,
            email,
            password,
            verifyToken: getRandomString(20),
        }

        authService
            .signup(requestBody)
            .then(res => {
                loginUser(res.data.authToken)
                navigate("/thank-you")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page title="Signup" template="form">
            <Font.H1>Create an account</Font.H1>

            <Form btnprimary="Create your account" onSubmit={handleSubmit}>
                <Input
                    label="Full name"
                    id="fullName"
                    onChange={handleFullName}
                    value={fullName}
                />

                <Input
                    label="Email"
                    id="email"
                    type="email"
                    onChange={handleEmail}
                    value={email}
                />

                <Input
                    label="Password"
                    id="password"
                    password
                    iconpassword
                    onChange={handlePassword}
                    value={password}
                />
            </Form>

            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}

            <Font.P>
                You already have an account? <Link to="/login">Log in</Link>.
            </Font.P>
        </Page>
    )
}

export default Signup
