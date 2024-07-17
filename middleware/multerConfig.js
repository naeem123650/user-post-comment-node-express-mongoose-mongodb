const multer = require("multer");

// config
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
