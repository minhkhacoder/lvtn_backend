/** @format */

const { deleteImageInDrive } = require("../common/driveAPI");
const Images = require("../models/images");

const images = new Images();

const imageDeleted = async (req, res) => {
  try {
    const image = req.body;
    const result1 = await deleteImageInDrive(image.img_url);
    if (result1) {
      const result2 = await images.deleteImage(image);
      if (result2) {
        res.status(200).json({
          success: true,
          message: "Deleted successfully!",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to delete image",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  imageDeleted,
};
