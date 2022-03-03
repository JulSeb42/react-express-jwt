// Packages
import axios from "axios"
import siteData from "../data/siteData"

export default axios.create({
    baseURL: `${siteData.apiUrl}/api`,
    headers: {
        "Content-type": "application/json",
    },
})
