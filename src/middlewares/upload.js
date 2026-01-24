const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp|pdf|doc|docx|mp4|mov|avi|webm|insv|insp/;
        const extname = allowedTypes.test(file.originalname.toLowerCase());

        if (extname) {
            return cb(null, true);
        } else {
            cb(new Error('Formato de archivo no permitido'));
        }
    }
});

module.exports = upload;
