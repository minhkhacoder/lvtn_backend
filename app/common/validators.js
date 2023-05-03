/** @format */

const validator = require("validator");

exports.validateSignup = (data) => {
  const { username, phone, password } = data;
  let message = "";

  // Validates the username.
  const isValidUsername = validator.matches(username, /^[a-zA-Z0-9]{5,30}$/);
  if (!isValidUsername) {
    message = "Username must be at least 5 characters long";
  }

  // Validates the phone number
  const locale = ["vi-VN", "en-US", "zh-CN"];
  if (
    !locale.some((loc) => {
      if (loc === "en-US") {
        return validator.isMobilePhone(
          phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
          loc
        );
      }
      return validator.isMobilePhone(phone, loc);
    })
  ) {
    message = "Invalid phone number";
  }

  // Validates that the password is at least 8 characters long.
  if (!validator.isLength(password, { min: 8 })) {
    message = "Password must be at least 8 characters long";
  }

  return {
    message,
    isValid: !message,
  };
};

exports.validateLogin = (data) => {
  const { phone, password } = data;
  let message = "";

  // Validates that the password is at least 8 characters long.
  if (!validator.isLength(password, { min: 8 })) {
    message = "Password must be at least 8 characters long";
  }

  // Validates the phone number
  const locale = ["vi-VN", "en-US", "zh-CN"];
  if (
    !locale.some((loc) =>
      validator.isMobilePhone(phone.replace(/\D/g, ""), loc)
    )
  ) {
    message = "Invalid phone number";
  }

  return {
    message,
    isValid: !message,
  };
};

exports.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let message = "";

  if (!emailRegex.test(email)) {
    message = "Invalid email address";
  }

  return {
    message,
    isValid: !message,
  };
};
