import { verifyToken } from "../utils/jwtToken.js";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.id).select("+role +status");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.status !== "active") {
      return res.status(403).json({ message: "Account inactive" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const protectAnalyst = (req, res, next) => {
    if (req.user.role === "viewer") {
        return res.status(403).json({ message: "Forbidden - insufficient permissions" });
    }
    next();
};

export const protectAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden - insufficient permissions" });
    }
    next();
};