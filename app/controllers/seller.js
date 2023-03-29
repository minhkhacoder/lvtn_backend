/** @format */

const {
  uploadImage,
  getImageLink,
  updateImage,
} = require("../common/driveAPI");
const Seller = require("../models/seller");
const sha = require("sha1");
const jwt = require("jsonwebtoken");
const { validateLogin } = require("../common/validators");
const Accounts = require("../models/accounts");
const seller = new Seller();
const account = new Accounts();

const createSeller = async (req, res) => {
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

const login = async (req, res) => {
  const { phone, password, role } = req.body;

  // Check validator
  const { message, isValid } = validateLogin(req.body);
  if (!isValid)
    return res.status(400).json({ success: false, message: message });

  try {
    const result = await account.findWithPassword(phone);
    console.log(result[0]);
    if (!result.length || result[0].acc_password !== sha(password))
      return res
        .status(400)
        .json({ success: false, message: "Phone or password incorrect!" });

    if (result[0].acc_role !== role)
      return res.status(400).json({
        success: false,
        message: "Please, create account seller!",
      });
    // Generates a JWT token for the current account.
    let accessToken = `${jwt.sign(
      { id: result[0].acc_id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    )}`;

    let refreshToken = `${jwt.sign(
      { id: result[0].acc_id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    )}`;

    let sellerInfo = await seller.getInfoSeller(result[0].acc_id);
    return res.status(201).json({
      success: true,
      message: "Login successfully!",
      accessToken,
      refreshToken,
      data: { ...sellerInfo[0] },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateInfoSeller = async (req, res) => {
  try {
    if (!req.files || !req.files.avatar) {
      return res.status(400).json({
        success: false,
        message: "No avatar file was uploaded.",
      });
    }
    const { id, desc } = req.body;
    const avatar = req.files.avatar;

    const url = await seller.getLinkAvatar(id);
    const avatarId =
      url &&
      url.slice(32, url.length - process.env.DRIVE_SDK_URL_SUFFIX.length);

    const fileId = avatarId
      ? await updateImage(avatarId, avatar)
      : await uploadImage(avatar);
    const linkAvatar = await getImageLink(fileId);

    await seller.updateSeller(id, desc, linkAvatar);

    res.status(201).json({
      success: true,
      message: "Update successfully!",
      data: {
        id,
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

module.exports = {
  createSeller,
  login,
  updateInfoSeller,
};
