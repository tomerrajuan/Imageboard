const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:postgres:postgres@localhost:8080/images");

exports.getImages = function() {
    console.log("selecting all from images");
    return db.query("SELECT * FROM images");
};

exports.addImage = function(title, description, username, url) {
    console.log("adding an image");
    return db.query(
        "INSERT INTO images (title, description, username, url) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, description, username, url]
    );
};
