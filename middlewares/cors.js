const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PATCH,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization, X-Requested-With, Accept",
};

module.exports = corsOptions;
