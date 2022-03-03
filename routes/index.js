const router = require("express").Router()

// Middleware
const { isAuthenticated } = require("../middleware/jwt.middleware")

router.get("/", (req, res, next) => {
    res.json("All good in here")
})

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
const auth = require("./auth")
router.use("/auth", auth)

module.exports = router
