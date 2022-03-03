// Packages
import React, { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Font, Form, Input, Alert } from "components-react-julseb"

// API
import { AuthContext } from "../../context/auth"
import authService from "../../api/auth.service"

// Components
import Page from "../../components/Page"

const Login = () => {
    const { loginUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // Form items
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    // Form handles
    const handleEmail = e => setEmail(e.target.value)
    const handlePassword = e => setPassword(e.target.value)

    // Submit form
    const handleSubmit = e => {
        e.preventDefault()

        const requestBody = { email, password }

        authService
            .login(requestBody)
            .then(res => {
                loginUser(res.data.authToken)
                navigate("/")
            })
            .catch(err => {
                const errorDescription = err.response.data.message
                setErrorMessage(errorDescription)
            })
    }

    return (
        <Page title="Login" template="form">
            <Font.H1>Log in</Font.H1>

            <Form btnprimary="Login" onSubmit={handleSubmit}>
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
                <Link to="/login/forgot-password">I forgot my password.</Link>
            </Font.P>

            <Font.P>
                You don't have an account? <Link to="/signup">Sign up</Link>.
            </Font.P>
        </Page>
    )
}

export default Login
