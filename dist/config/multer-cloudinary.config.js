"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerCloudinaryStorage = void 0;
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const cloudinary_config_1 = require("./cloudinary.config");
exports.multerCloudinaryStorage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_config_1.default,
    params() {
        return {
            folder: 'products',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
            transformation: [{ width: 800, height: 800, crop: 'limit' }],
        };
    },
});
//# sourceMappingURL=multer-cloudinary.config.js.map