import mongoose, { mongo } from "mongoose";

const otpSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  otp: {
    type: String,
    require: true,
  },
  expiredAt: {
    type: Date,
    index: { expires: 0 },
  },
});

const otpDB = mongoose.model("Otp", otpSchema);
export default otpDB;
