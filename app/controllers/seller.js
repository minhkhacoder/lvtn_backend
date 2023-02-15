/** @format */

const {
  uploadImage,
  getImageLink,
  updateImage,
} = require("../common/driveAPI");
const Seller = require("../models/seller");
const seller = new Seller();

exports.createSeller = async (req, res) => {
  const data = req.body;

  try {
    await seller.createSeller(data);
    res.status(201).json({
      success: true,
      message: "Store created successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Store name already exists, please choose a different name",
      error: error.message,
    });
  }
};

exports.updateSeller = async (req, res) => {
  try {
    const { id, desc } = req.body;
    const avatar = req.files.avatar;
    if (!req.files) {
      return res.status(400).json({
        success: false,
        message: "No files were uploaded.",
      });
    }
    const url = await seller.getLinkAvatar(id);

    if (url !== null) {
      const fileOldId = url.slice(32, url.length - "/view?usp=drivesdk".length);

      const fileId = await updateImage(fileOldId, avatar);
      const linkAvatar = await getImageLink(fileId);

      return res.status(201).json({
        success: true,
        message: "Update successfully!",
        data: {
          id: id,
          description: desc,
          avatar: linkAvatar,
        },
      });
    }
    const fileId = await uploadImage(avatar);
    const linkAvatar = await getImageLink(fileId);

    await seller.updateSeller(id, desc, linkAvatar);

    res.status(201).json({
      success: true,
      message: "Update successfully!",
      data: {
        id: id,
        description: desc,
        avatar: linkAvatar,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
