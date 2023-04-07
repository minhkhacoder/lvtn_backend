/** @format */

const { validateLogin, validateSignup } = require("../common/validators");
const Customer = require("../models/customer");
const sha = require("sha1");
const jwt = require("jsonwebtoken");
const {
  updateImage,
  uploadImage,
  getImageLink,
} = require("../common/driveAPI");

const customer = new Customer();

const login = async (req, res) => {
  const { phone, password } = req.body;

  // Check validator
  const { message, isValid } = validateLogin(req.body);
  if (!isValid)
    return res.status(400).json({ success: false, message: message });

  const formatPhone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  try {
    const result = await customer.vertifyAccountCustomer(
      formatPhone,
      sha(password)
    );
    if (!result.length || result[0].acc_password !== sha(password))
      return res
        .status(400)
        .json({ success: false, message: "Phone or password incorrect!" });

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

    let customerInfo = await customer.getInfoCustomerByAccId(result[0].acc_id);

    return res.status(200).json({
      success: true,
      message: "Login successfully!",
      accessToken,
      refreshToken,
      data: {
        cus_id: customerInfo[0].cus_id,
        acc_id: result[0].acc_id,
        acc_phone: result[0].acc_phone,
        cus_userName: customerInfo[0].cus_userName,
        cus_email: customerInfo[0].cus_email,
        cus_gender: customerInfo[0].cus_gender,
        cus_address: customerInfo[0].cus_address,
        cus_avatar: customerInfo[0].cus_avatar,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Create a new account
const signup = async (req, res) => {
  const { username, phone, password } = req.body;
  const formatPhone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  // Check validator
  const { message, isValid } = validateSignup(req.body);
  if (!isValid) {
    return res.status(400).json({ success: false, message: message });
  }

  try {
    await customer.createAccount(username, formatPhone, password);
    res.status(200).json({
      success: true,
      message: "Account registered successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Phone number already exists, please use a different phone number.",
      error: error.message,
    });
  }
};

const updateInfoCustomer = async (req, res) => {
  const { id, username, email, gender, address } = req.body;
  try {
    const { avatar } = req.files ?? {};
    let linkAvatar = "";
    if (avatar) {
      const url = await customer.getLinkAvatarCustomer(id);
      const viewIdLength = process.env.DRIVE_VIEW.length;
      let viewIdIndex = url && url.lastIndexOf(process.env.DRIVE_VIEW);

      const avatarId = url && url.slice(viewIdIndex + viewIdLength);

      const fileId = avatarId
        ? await updateImage(avatarId, avatar)
        : await uploadImage(avatar);
      linkAvatar = getImageLink(fileId);
    }
    let result;
    if (linkAvatar != "") {
      result = await customer.updateCustomer(
        id,
        username,
        email,
        gender,
        address,
        linkAvatar
      );
    } else {
      result = await customer.updateCustomer(
        id,
        username,
        email,
        gender,
        address
      );
    }
    if (result) {
      res.status(200).json({
        success: true,
        message: "Updated successfully!",
        avatar: linkAvatar,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to update",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateAddressCustomer = async (req, res) => {
  const { id, address } = req.body;
  try {
    const result = await customer.updateAddressCustomer(id, address);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Updated successfully!",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to update",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePasswordCustomer = async (req, res) => {
  const { acc_id, password_old, password_new } = req.body;

  try {
    const result = await customer.updatePasswordAccount(
      acc_id,
      password_old,
      password_new
    );

    let message = Object.values(result[0])[0];

    res.status(201).json({
      success: true,
      message: message,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  signup,
  login,
  updateInfoCustomer,
  updatePasswordCustomer,
  updateAddressCustomer,
};
