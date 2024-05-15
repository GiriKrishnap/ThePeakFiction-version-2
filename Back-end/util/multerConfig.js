// // multerConfig.js
// const multer = require('multer');
// const path = require('path');

// // Set up multer for handling file uploads
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // Handle potential errors
//         if (!file) {
//             console.log('No file received');
//             return cb(new Error('No file received'));
//         }
//         cb(null, path.join(__dirname, '../public/NovelCovers'));
//     },

//     filename: function (req, file, cb) {
//         // Handle potential errors
//         if (!file || !req.body.title) {
//             console.log('Invalid file or missing title')
//             return cb(new Error('Invalid file or missing title'));
//         }
//         // Dynamically determine file extension based on MIME type
//         const fileExtension = file.mimetype.split('/')[1];
//         console.log(fileExtension);
//         const novelFileName = `${req.body.title}.${fileExtension}`;
//         console.log('file name is here - ', novelFileName);

//         cb(null, novelFileName);
//     }
// });

// const upload = multer({ storage: storage });

// module.exports = upload;




// multerConfig.js
const multer = require('multer');
const path = require('path');

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('multer cover - ', req.body.cover);
        if (!req.body.cover) {
            cb(null, path.join(__dirname, '../public/novelCovers'));
        }
    },
    filename: function (req, file, cb) {
        if (!req.body.cover) {
            const NovelFileName = `${req.body.title}.jpeg`;
            cb(null, NovelFileName);
        }
    },
}, { mkdirs: true })

const upload = multer({ storage: storage });

module.exports = upload;
