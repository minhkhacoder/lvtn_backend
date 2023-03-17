/** @format */
const { google } = require("googleapis");
const fs = require("fs");

const GOOGLE_DRIVE_CLIENT_ID = process.env.GOOGLE_DRIVE_CLIENT_ID;
const GOOGLE_DRIVE_CLIENT_SECRET = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
const GOOGLE_DRIVE_REDIRECT_URI = process.env.GOOGLE_DRIVE_REDIRECT_URI;
const GOOGLE_DRIVE_REFRESH_TOKEN = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_DRIVE_CLIENT_ID,
  GOOGLE_DRIVE_CLIENT_SECRET,
  GOOGLE_DRIVE_REDIRECT_URI
);

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

oauth2Client.setCredentials({ refresh_token: GOOGLE_DRIVE_REFRESH_TOKEN });
const setFilePublic = async (fileId) => {
  try {
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
  } catch (error) {
    console.error(error);
  }
};
const uploadImage = async (image) => {
  try {
    let fileName = image.name
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");
    const fileMetadata = {
      name: fileName,
      mimeType: image.mimetype,
      title: fileName,
      visibility: "public",
    };
    const media = {
      mimeType: image.mimetype,
      body: fs.createReadStream(image.tempFilePath),
    };
    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });
    if (!file || !file.data || !file.data.id) {
      throw new Error("Failed to upload file");
    }
    await setFilePublic(file.data.id);
    return file.data.id;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getImageLink = (fileId) => {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
};

const updateImage = async (fileId, image) => {
  try {
    let fileName = image.name
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");
    const fileMetadata = {
      name: fileName,
      mimeType: image.mimetype,
      title: fileName,
      visibility: "public",
    };
    const media = {
      mimeType: image.mimetype,
      body: fs.createReadStream(image.tempFilePath),
    };
    const file = await drive.files.update({
      fileId: fileId,
      resource: fileMetadata,
      media: media,
      fields: "id",
    });
    if (!file || !file.data || !file.data.id) {
      throw new Error("Failed to update file");
    }
    await setFilePublic(file.data.id);
    return file.data.id;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteImageInDrive = async (url) => {
  const fileId = url.split("=")[1];
  try {
    await drive.files.delete({
      fileId: fileId,
    });
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

const uploadAndGetMultiImage = async (images) => {
  const imagePromises = Object.values(images).map(async (image) => {
    const fileId = await uploadImage(image);
    const fileImage = fileId ? getImageLink(fileId) : undefined;
    return { name: image.name, url: fileImage };
  });
  return await Promise.all(imagePromises);
};

module.exports = {
  uploadImage,
  getImageLink,
  updateImage,
  deleteImageInDrive,
  uploadAndGetMultiImage,
};
