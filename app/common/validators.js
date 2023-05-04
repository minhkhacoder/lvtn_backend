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

exports.validateAddProduct = (data, images) => {
  const {
    cat_id,
    bra_id,
    seller_id,
    prod_id,
    pro_name,
    pro_desc,
    pro_material,
    pro_price,
    pro_quantity,
  } = data;

  let message = "";

  if (!images) {
    message = "No product image was uploaded.";
  } else {
    if (!pro_desc) {
      message = "Please provide a description for the product.";
    } else if (pro_desc.trim().length < 10 || pro_desc.trim().length > 1000) {
      message =
        "Product description must be between 10 and 1000 characters long.";
    }

    if (!pro_quantity) {
      message = "Please provide the product's quantity.";
    } else if (isNaN(pro_quantity) || pro_quantity < 0 || pro_quantity > 1000) {
      message = "Product quantity must be a positive number less than 1,000.";
    }

    if (!pro_price) {
      message = "Please provide the product's price.";
    } else if (isNaN(pro_price) || pro_price < 0 || pro_price > 5000) {
      message = "Product price must be a positive number less than 5000.";
    }

    if (!prod_id) {
      message = "Please provide the product's producer.";
    }

    if (!pro_material) {
      message = "Please provide the product's material.";
    }

    if (!bra_id) {
      errors.bra_id = "Please select a brand.";
    }

    if (!cat_id) {
      message = "Please select a category.";
    }

    if (!pro_name) {
      message = "Please provide a product name.";
    } else if (pro_name.trim().length < 3 || pro_name.trim().length > 120) {
      message = "Product name must be between 3 and 120 characters long.";
    }
  }

  return {
    message,
    isValid: !message,
  };
};

exports.validateSale = (data) => {
  const { name, dateStart, dateEnd, pro_id, ps_value } = data;
  let message = "";

  if (!ps_value || isNaN(ps_value) || ps_value < 0 || ps_value > 100) {
    message = "Please provide a valid percentage value between 0 and 100.";
  }

  if (!pro_id || pro_id.trim().length === 0) {
    message = "Please select a promotional product.";
  }

  if (Date.parse(dateStart) > Date.parse(dateEnd)) {
    message = "Start date must be before end date.";
  }

  if (!dateEnd || !Date.parse(dateEnd)) {
    message = "Please provide a valid end date.";
  }

  if (!dateStart || !Date.parse(dateStart)) {
    message = "Please provide a valid start date.";
  }

  if (!name || name.trim().length === 0) {
    message = "Please provide a valid sale name";
  }

  return {
    message,
    isValid: !message,
  };
};
