const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the uploads directory path
const uploadsDir = process.env.UPLOADS_DIR || path.join(__dirname, '../uploads');
// Ensure the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true }); // Create the directory if it doesn't exist
}

// Set up Multer for temporary storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir); // Use the uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// File filter to allow only JPEG and PNG files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false);
    }
};

// Initialize Multer
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;