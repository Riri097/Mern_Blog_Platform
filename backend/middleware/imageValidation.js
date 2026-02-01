const validateImage = (req, res, next) => {
    const { image } = req.body;

    if (!image) return next();

    // Check File Type
    const isImage = image.match(/^data:image\/(png|jpg|jpeg|gif|webp);base64,/);
    if (!isImage) {
        res.status(400);
        throw new Error('Invalid file type. Only images are allowed.');
    }

    // Check File Size
    // Formula: sizeInBytes = (lengthInCharacters * (3/4)) - padding
    const sizeInBytes = (image.length * 3) / 4 - (image.indexOf('=') > 0 ? (image.length - image.indexOf('=')) : 0);

    const checkSize = 1 * 1024 * 1024;

    if (sizeInBytes > checkSize) {
        res.status(400);
        throw new Error('Image size too large. Max 1MB allowed.');
    }

    next();
};

module.exports = validateImage;