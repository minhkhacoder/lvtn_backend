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
  return new Promise(async (resolve, reject) => {
    try {
      let fileName = image.name;
      const fileMetadata = {
        name: fileName,
        mimeType: image.mimetype,
        title: image.name,
      };
      const media = {
        mimeType: image.mimetype,
        body: fs.createReadStream(image.tempFilePath),
      };
      await drive.files
        .create({
          resource: fileMetadata,
          media: media,
          fields: "id",
        })
        .then((file) => {
          if (!file || !file.data || !file.data.id) {
            console.error("Error: Failed to upload file");
            return;
          }
          console.log(`File ID: ${file.data.id}`);
          resolve(file.data.id);
        })
        .catch((err) => {
          console.error(`Error: ${err.message}`);
        });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  uploadImage,
};
