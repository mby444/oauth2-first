import { Router } from "express";
import { google } from "googleapis";
import jwt from "jsonwebtoken";
import { oauth2Client, authorizationUrl } from "../config/oauth2.js";
import { getUser, saveUser, updateUser } from "../database/tool/user.js";
import { jwtSecret } from "../constant/index.js";
import "../config/dotenv.js";

export const oauth2Route = Router();

oauth2Route.get("/", (req, res) => {
  const { target_path: targetPath = "" } = req.query;
  res.cookie("sign_target_path", targetPath);
  res.redirect(authorizationUrl);
});

oauth2Route.get("/callback", async (req, res) => {
  try {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(String(code));
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const { data } = await oauth2.userinfo.get();
    if (!(data.name && data.email)) throw new Error("Error");
    const userFromDB = await getUser(data.email);
    const cookieOpts = { maxAge: 1000 * 60 * 60 * 4 };
    const userData = {
      name: data.name,
      email: data.email,
      provider: "google",
      createdAt: Date(),
      updatedAt: Date(),
    };
    const updatedData = {
      updatedAt: Date(),
    };
    const jwtToken = jwt.sign(userData, jwtSecret, { expiresIn: "2h" });

    userFromDB
      ? await updateUser(data.email, updatedData)
      : await saveUser(userData);

    const ridirectPath = req.cookies.sign_target_path || "/";
    res.cookie("sign_target_path", "", { maxAge: 0 });
    res.cookie("token", jwtToken, cookieOpts);
    res.redirect(ridirectPath);
  } catch (err) {
    res.render("error", { message: err.message });
  }
});
