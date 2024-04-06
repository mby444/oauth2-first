import { Router } from "express";
import jwt from "jsonwebtoken";
import {
  getFBUser,
  saveFBUser,
  updateFBUser,
} from "../database/tool/fb-user.js";
import { jwtSecret } from "../constant/index.js";
import { facebook } from "../config/fbauth.js";
import { getFBUserData } from "../tool/fbauth.js";
import "../config/dotenv.js";

export const fbAuthRoute = Router();

fbAuthRoute.get(
  "/",
  (req, res, next) => {
    const { target_path: targetPath = "" } = req.query;
    res.cookie("sign_target_path", targetPath);
    next();
  },
  facebook.authorize
);

fbAuthRoute.get("/callback", facebook.accessToken, async (req, res) => {
  try {
    const accessToken = req?.token?.token?.access_token;
    const data = await getFBUserData(accessToken);
    const name = data.first_name + " " + (data.last_name || "").trim();
    const { id, email } = data;
    if (!(id && name && email)) throw new Error("Error");
    const userFromDB = await getFBUser(email);
    const cookieOpts = { maxAge: 1000 * 60 * 60 * 4 };
    const userData = {
      name,
      email,
      provider: "facebook",
      createdAt: Date(),
      updatedAt: Date(),
    };
    const updatedData = {
      updatedAt: Date(),
    };
    const jwtToken = jwt.sign(userData, jwtSecret, { expiresIn: "2h" });

    userFromDB
      ? await updateFBUser(email, updatedData)
      : await saveFBUser(userData);

    const ridirectPath = req.cookies.sign_target_path || "/";
    res.cookie("sign_target_path", "", { maxAge: 0 });
    res.cookie("token", jwtToken, cookieOpts);
    console.log("token", jwtToken);
    res.redirect(ridirectPath);
    res.json({ data });
  } catch (err) {
    res.render("error", { message: err.message });
  }
});
