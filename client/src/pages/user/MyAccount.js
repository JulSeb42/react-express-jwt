// Packages
import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Font } from "components-react-julseb"
import { getFirstName } from "js-utils-julseb"

// API
import { AuthContext } from "../../context/auth"

// Components
import Page from "../../components/layouts/Page"

const MyAccount = () => {
    const { user } = useContext(AuthContext)

    return (
        <Page title={user.fullName}>
            <Font.H1>Hello {getFirstName(user.fullName)}</Font.H1>

            {!user.verified && <Font.P>Your account is not verified.</Font.P>}

            <Font.P>
                <Link to="/my-account/edit">Edit your account.</Link>
            </Font.P>
        </Page>
    )
}

export default MyAccount
