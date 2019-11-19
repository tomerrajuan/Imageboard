const express = require("express");
const db = require("./utils/db");
const app = express();
const s3 = require("./s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const { s3Url } = require("./config");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(express.static("./public"));

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const { title, description, username} = req.body;
    console.log("req.file is:", req.file.filename);
    const url = `${s3Url}${req.file.filename}`;
    db.addImage(title, description, username, url).then(({ rows }) =>
        res.json({
            image: rows[0]
        })

    );

});

app.get("/images", (req, res) => {
    console.log("we are at images");

    db.getImages().then(results => {
        console.log("results are", results);
        let images = results.rows;
        res.json(images);
    });
});

app.listen(8080, () => console.log("images board listening"));
