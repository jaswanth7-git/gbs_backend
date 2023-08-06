const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const app = express();

var corsOptions = {
  origin: "http://localhost:9000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", require("./routes/routes"));
app.use("/api/categories", require("./routes/categoryRoutes"));

app.use(errorHandler);

const port = process.env.PORT || 9001;
app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
