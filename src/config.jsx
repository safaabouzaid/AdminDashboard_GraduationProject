
  


const isLocal = window.location.hostname === 'localhost';

const config = {
  API_BASE_URL: isLocal ? 'http://127.0.0.1:8000/' : 'https://5e5b-169-150-196-103.ngrok-free.app/',

  CLOUDINARY_UPLOAD_PRESET: 'forsa-_unsigned_upload', 
  CLOUDINARY_CLOUD_NAME: 'doerwhivd',
};

export default config;
