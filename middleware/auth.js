import jwt from "jsonwebtoken";
import { jwtSecret } from "../constant/index.js";
import { getUser } from "../database/tool/user.js";

export const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("User is not logged");
    const userData = jwt.verify(token, jwtSecret);
    const { name, email, createdAt, updatedAt } = await getUser(userData.email);
    if (!email) throw new Error("User is not logged");
    req.user = { name, email, createdAt, updatedAt };
    next();
  } catch (err) {
    res.redirect("/signin");
  }
};
