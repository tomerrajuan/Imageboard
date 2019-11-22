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
        fileSize: 4097152
    }
});

app.use(express.static("./public"));
app.use(express.json());

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const { title, description, username } = req.body;
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
        let images = results.rows;
        res.json(images);
    });
});

app.get("/image/:id", (req, res) => {
    console.log("we are at image/ id");
    let id = req.params.id;
    db.getSingleImage(id)
        .then(result => {
            db.getComments(id)
                .then(data => {
                    res.json({
                        image: result.rows[0],
                        comment: data
                    });
                })
                .catch(err => console.log("error at getting a comment: ", err));
        })
        .catch(err => console.log("error at getting a comment: ", err));
});

app.post("/comment",(req, res) => {
    console.log("results from add comments are: ",req.body);
    const { comment, image_id, username } = req.body;
    console.log("we are at comment");

    db.addComments(comment,image_id, username).then(results => {
        res.json({
            comment: results[0]
        });
    });
});

app.listen(8080, () => console.log("imageboard listening"));
