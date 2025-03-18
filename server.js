const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const app = express();

var corsOptions = {
  origin: "*",

};

console.log("inside server.js file")
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", require("./routes/routes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/customer", require("./routes/customerRoutes"));
app.use("/api/sales", require("./routes/salesRoutes"));
app.use("/api/advance", require("./routes/advanceRoutes"));
app.use("/api/customized", require("./routes/customizedOrdersRoutes"));
app.use("/api/schemes", require("./routes/schemeForCustomersRoutes"));
app.use(errorHandler);

const port = process.env.PORT || 9001;
app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
