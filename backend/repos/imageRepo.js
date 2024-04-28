// Imports
const { v2: cloudinary } = require('cloudinary');
const CustomError = require('../utilities/customError');
      
// Cloudinary config
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

module.exports = {
  async uploadNewImage(base64Img, ownerId) {
    const res = await cloudinary.uploader.upload(base64Img, {
      public_id: ownerId,
      resource_type: "image",
      folder: "HealThyBody/users",
      sign_url: true,
      type: "authenticated"
    })

    return res.secure_url;
  },

  async deleteOldImage(userId) {
    const res = await cloudinary.api.delete_resources_by_prefix(`HealThyBody/users/${userId}`);

    return res;
  }
}