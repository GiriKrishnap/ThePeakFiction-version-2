// multerConfig.js
const multer = require('multer');

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload/');
    },
    filename: function (req, file, cb) {
        const NovelFileName = `${req.body.title}.jpeg`;
        cb(null, NovelFileName);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
