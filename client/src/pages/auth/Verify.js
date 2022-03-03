// Packages
import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { Font, PageLoading } from "components-react-julseb"

// API
import { AuthContext } from "../../context/auth"
import authService from "../../api/auth.service"

// Components
import Page from "../../components/Page"

const Verify = ({ edited, setEdited }) => {
    // Context
    const { user, isLoggedIn } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(true)
    const [verified, setVerified] = useState(false)

    const splittedUrl = window.location.href.split("/")
    const verifyToken = splittedUrl[4]
    const userId = splittedUrl[5]

    setTimeout(() => {
        if (isLoggedIn && user._id === userId && user.verifyToken === verifyToken) {     
            authService
                .verify({ id: userId })
                .then(() => {
                    setVerified(true)
                    setEdited(!edited)
                })
                .catch(err => console.log(err))
        }

        setIsLoading(false)
    }, 1000)

    return (
        <Page title="Verify your account">
            {isLoading ? (
                <PageLoading />
            ) : (
                <>
                    {!isLoggedIn ? (
                        <>
                            <Font.H1>You are not logged in</Font.H1>

                            <Font.P>
                                Please log in to verify your account.
                            </Font.P>
                        </>
                    ) : verified ? (
                        <>
                            <Font.H1>Your account is verified!</Font.H1>

                            <Font.P>
                                You can now access all the functionalities on
                                our website.{" "}
                                <Link to="/my-account">
                                    Go to your account.
                                </Link>
                            </Font.P>
                        </>
                    ) : (
                        <>
                            <Font.H1>Verification failed</Font.H1>

                            <Font.P>
                                Your account could not be verified, please try
                                again later.
                            </Font.P>
                        </>
                    )}
                </>
            )}
        </Page>
    )
}

export default Verify
