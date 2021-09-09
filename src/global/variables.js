// export const API_BASE = 'http://10.0.2.2:3001';
export const API_BASE = process.env.NODE_ENV==='PRODUCTION'?process.env.SERVER_DOMAIN:'http://localhost:3001';