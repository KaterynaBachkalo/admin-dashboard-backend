import app from "./app";

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

export default app.listen(4000, () => {
  console.log("Server running");
});
