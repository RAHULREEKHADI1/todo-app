import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const generateTokenAndSaveInCookies = async (userId, res) => {
  try {
    // Generate JWT
    const token = jwt.sign(
      { userId }, 
      process.env.JWT_SECRET_KEY, 
      { expiresIn: "10d" }
    );

    // Set cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
      path: "/",
      domain: process.env.COOKIE_DOMAIN // Optional for cross-domain cookies
    });

    // Store token reference in DB
    await User.findByIdAndUpdate(userId, { token });
    
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};
