import http from "./http-common"

class AuthService {
    signup(data) {
        return http.post("/auth/signup", data)
    }

    login(data) {
        return http.post("/auth/login", data)
    }

    loggedIn() {
        return http.get("/auth/loggedin")
    }

    verify(data) {
        return http.put("/auth/verify", data)
    }

    forgotPassword(data) {
        return http.post("/auth/forgot-password", data)
    }

    resetPassword(data) {
        return http.put("/auth/reset-password", data)
    }
}

export default new AuthService()
