import DotEnv from 'dotenv';
DotEnv.config();

export const server_options = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || "localhost",
};

export const cors_options = {
  allow_origin: process.env.ALLOW_ORIGIN || "*",
  allow_headers: process.env.ALLOW_HEADERS || "*",
  allow_methods: process.env.ALLOW_METHODS || "OPTIONS, GET, POST, PUT, DELETE",
  request_method: process.env.REQUEST_METHOD || "*",
};