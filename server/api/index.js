const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("You have reached the API.")
});

router.use("/user", require("./user"));

router.use("/application", require("./application"));



module.exports = router;
