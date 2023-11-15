const router = require("express").Router();

router.get("/", (req, res) =>{
    res.send("auth router");
});

// register a user

// router.post("/register");



module.exports = router;
