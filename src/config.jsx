
  


const isLocal = window.location.hostname === 'localhost';

const config = {
  API_BASE_URL: isLocal ? 'http://127.0.0.1:8000/' : 'https://5b59-89-39-107-197.ngrok-free.app/',
};

export default config;
