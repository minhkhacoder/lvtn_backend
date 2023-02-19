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
    return file.data.id;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getImageLink = async (fileId) => {
  try {
    const response = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink",
    });
    return response.data.webViewLink;
  } catch (error) {
    throw new Error(error.message);
  }
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
    return file.data.id;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteImageInDrive = async (url) => {
  const fileId =
    url && url.slice(32, url.length - process.env.DRIVE_SDK_URL_SUFFIX.length);
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
    const fileImage = fileId ? await getImageLink(fileId) : undefined;
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
