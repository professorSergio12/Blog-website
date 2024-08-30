import mongoose from "mongoose";

const userSchmema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://imgs.search.brave.com/o8bDpgPcy9NJ_jxkUoCg6lFSNynwecFGT-7lQUAY3WY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzc0LzAzLzI0/LzM2MF9GXzE3NDAz/MjQ0M19GbGx5Rm9m/RlpqN0pPUFhHSmw3/NVVpRUVlSXE4QUll/Ry5qcGc",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchmema);
export default User;
