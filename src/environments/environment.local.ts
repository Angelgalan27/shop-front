export const environment = {
  production: false,
  API_BASE_PATH: 'http://192.168.1.43:8090/api/front-admin',
  //API_BASE_PATH: 'http://90.94.196.210:8090/api/front-admin',
  //API_BASE_PATH: 'http://localhost:8090/api/front-admin',
  GRANT_TYPE: {
    PASSWORD: 'password',
    REFRESH_TOKEN: 'refresh_token'
  },
  API: {
   USER: '/user',
   ROL: '/rol',
   CATEGORY: '/category',
   SUPPLIER: '/supplier',
   PRODUCT: '/product',
   ATTRIBUTETYPE: '/attributetype'
  }
};
