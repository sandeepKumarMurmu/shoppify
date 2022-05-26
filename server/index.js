require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//routes
const AuthRoutes = require("./src/routes/auth");
const productRoutes = require("./src/routes/product_route");

//executing code
const app = express();
app.use(express.json());
app.use(cors());

//listing routes
app.use("", AuthRoutes);
app.use("", productRoutes);

console.log(process.env.PORT)
//connecting variables
const URL = process.env.URL;
const PORT = process.env.PORT || 2345;

//connection
mongoose
  .connect(URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listining on port ${PORT} .............`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
