const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to upload file to Cloudinary
const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: 'profile_pictures', // Optional: specify a folder in Cloudinary
            use_filename: true, // Use the original filename
            unique_filename: false, // Allow overwriting files with the same name
        });
        return result.secure_url; // Return the secure URL of the uploaded file
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};

module.exports = { uploadToCloudinary };