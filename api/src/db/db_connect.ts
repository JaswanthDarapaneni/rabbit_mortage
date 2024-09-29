import mongoose from "mongoose";

export const connectDB = async () => {
  const dbUri = process.env.DB_URI || "";  
  await mongoose
    .connect(dbUri, {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    })
    .then(() => {
      console.log("db_ connected");
    })
    .catch((err) => console.log(err));
};
