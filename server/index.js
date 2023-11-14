const express = require(`express`);
const app = express();
const PORT = 3005;

app.get("/", (req, res) => {
    res.send(`hello world`);

})


app.listen(PORT, (err) => { 
    if (!err) {
        console.log(`Server is listening and running on ${PORT}`)
    } else {
        console.log(`Server Error on ${PORT}`)
    }
});