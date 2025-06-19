// utils/uploadToCloudinary.js
import config from "../config";

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", config.CLOUDINARY_UPLOAD_PRESET);
  formData.append("cloud_name", config.CLOUDINARY_CLOUD_NAME);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${config.CLOUDINARY_CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || "Upload failed");
  }

  return data.secure_url;
};
