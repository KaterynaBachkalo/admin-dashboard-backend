const app = require("./app");

import serverConfig from "./configs";
import mongoose from "mongoose";

mongoose
  .connect(serverConfig.mongoUrl)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((er: any) => {
    console.log(er.message);
    process.exit(1);
  });

module.exports = app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
