import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(new errorHandler(400, "All fields are required"));
  }
  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    res.json({ success: true, message: "Signup successful" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(new errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign(
      {
        id: validUser._id,
        isAdmin: validUser.isAdmin,
      },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc; 
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

async function sendLoginMail(email, name) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Raconteur's Blog!" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Login Successful 🎉",
      html: `
  <!-- Banner Section (Full Width) -->
  <div style="width:100%; background:#000; text-align:center;">
    <img src="https://res.cloudinary.com/dtqvb1uhi/image/upload/v1756828368/banner_qoilpp.png" 
         alt="Raconteur's Blog Banner" 
         style="width:100%;  display:block;" />
  </div>

  <!-- Main Box -->
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background: #f4f4f4;">
    
    <!-- Header Section -->
    <div style="text-align: center; padding: 20px; background: #4CAF50; color: white; border-radius: 10px 10px 0 0;">
      <h1>Welcome Back, ${name}!</h1>
    </div>
    
    <!-- Body Section -->
    <div style="background: white; padding: 20px; border-radius: 0 0 10px 10px;">
      <p style="font-size: 16px; color: #333;">
        You have <b>successfully logged in</b> to <span style="color:#4CAF50;">Raconteur's Blog</span>. 🎉
      </p>
      <p style="font-size: 14px; color: #555;">
        Start exploring new stories, share your thoughts, and enjoy reading amazing blogs.
      </p>
      
      <div style="text-align: center; margin: 20px 0;">
        <img src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png" alt="Blog Icon" width="120" />
      </div>
  
      <a href="https://your-blog-website.com" 
        style="display:inline-block; padding: 12px 25px; background:#4CAF50; color:white; text-decoration:none; border-radius:5px; font-size:16px;">
        Visit Blog
      </a>
  
      <p style="margin-top: 20px; font-size: 12px; color: #999;">
        If you didn’t log in, please ignore this email.
      </p>
    </div>
  </div>
`,
    });

    console.log("Login mail sent to:", email);
  } catch (err) {
    console.error("Error sending mail:", err);
  }
}

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;

      await sendLoginMail(email, name);

      return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });

      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;

      await sendLoginMail(email, name);

      return res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

