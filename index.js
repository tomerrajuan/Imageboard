const express = require("express");
const db = require("./utils/db");
const app = express();
app.use(express.static("./public"));

app.get("/images", (req, res) => {
    console.log("we are at images");

    db.getImages().then(results => {
        console.log("results are", results);
        let images = results.rows;
        res.json(images);
    });
});

app.listen(8080, () => console.log("images board listening"));
