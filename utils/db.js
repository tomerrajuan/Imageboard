const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:postgres:postgres@localhost:8080/images");

exports.getImages = function() {
    console.log("selecting all from images");
    return db.query("SELECT * FROM images ORDER BY created_at DESC");
};

exports.addImage = function(title, description, username, url) {
    console.log("adding an image");
    return db.query(
        "INSERT INTO images (title, description, username, url) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, description, username, url]
    );
};
exports.getSingleImage = function(id) {
    console.log("selecting a single image");
    return db.query("SELECT * FROM images WHERE id = $1", [id]);
};

exports.addComments = function(username, image_id, comment) {
    console.log("adding a comment");
    return db.query(
        "INSERT INTO comments (username, image_id, comment) VALUES ($1, $2, $3) RETURNING *",
        [username, image_id, comment]
    );
};

exports.getComments = function(id) {
    console.log("selecting a single comment");
    return db.query("SELECT * FROM comments WHERE image_id=$1", [id]);
};
