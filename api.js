const axios = require('axios')

const dotenv = require('dotenv');
dotenv.config();

const api = axios.create({
  baseURL: process.env.BASE_URL,
  headers:{
    'Content-Type': 'multipart/form-data',
    "VtexIdclientAutCookie": process.env.AUT_COOKIE,
  }
})


module.exports = api