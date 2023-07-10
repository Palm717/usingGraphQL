import express from "express";
import { config } from "dotenv";
config();

import { graphqlHTTP } from "express-graphql";
import colors from "colors";
import connectDB from "./config/db.js";
import schema from "./schema/schema.js";
import cors from "cors";

const PORT = process.env.ALT_PORT || 5000;

const app = express();

//database connection
connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
