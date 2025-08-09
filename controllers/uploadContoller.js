// controllers/uploadContoller.js

export const uploadImage = (req, res,next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: imageUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong during image upload',
      error: error.message,
    });
  }
};
