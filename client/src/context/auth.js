// Packages
import React, { useState, useEffect, createContext } from "react"
import axios from "axios"

// Data
import siteData from "../data/siteData"

// Create context
const AuthContext = createContext()

const AuthProviderWrapper = props => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    const loginUser = token => {
        localStorage.setItem("authToken", token)
        verifyStoredToken()
    }

    const logoutUser = () => {
        localStorage.removeItem("authToken")
        setIsLoggedIn(false)
        setUser(null)
    }

    const verifyStoredToken = () => {
        const storedToken = localStorage.getItem("authToken")

        if (storedToken) {
            axios
                .get(`${siteData.apiUrl}/api/auth/loggedin`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                })
                .then(res => {
                    const user = res.data.user
                    setUser(user)
                    setIsLoggedIn(true)
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setIsLoggedIn(false)
                    setUser(null)
                    setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        verifyStoredToken()
    }, [])

    return (
        <AuthContext.Provider
            value={{ isLoggedIn, isLoading, user, loginUser, logoutUser }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext }
