const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:postgres:postgres@localhost:8080/images");

exports.getImages = function() {
    console.log("selecting all from images");
    return db.query("SELECT * FROM images"

    );
};
