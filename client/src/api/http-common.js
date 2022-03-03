// Packages
import axios from "axios"

const apiUrl = "http://localhost:5005"

export default axios.create({
    baseURL: `${apiUrl}/api`,
    headers: {
        "Content-type": "application/json",
    },
})
