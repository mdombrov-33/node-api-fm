import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file. Prisma by default is able to look for database url.

import app from "./server";

app.listen(3000, () => {
  console.log("Running on port 3000");
});
