import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("Db Connected Successfully"))
      .catch((error) => console.error(`Error Occured While Connecting from Db ${error}`));
  } catch (error) {
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error",
        error: error.message
      });
  }
};

export default connectDB;
