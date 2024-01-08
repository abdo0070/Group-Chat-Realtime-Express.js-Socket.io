const path = require('path')

const router = require('express').Router()

router.route("/")
.get( (req,res) => {
    const htmlPage = path.resolve("./public/index.html")
    res.sendFile(htmlPage)
})


module.exports = router;