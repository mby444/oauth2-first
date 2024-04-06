import jwt from "jsonwebtoken";
import { jwtSecret } from "../constant/index.js";
import { getUser } from "../database/tool/user.js";
import { getFBUser } from "../database/tool/fb-user.js";

export const auth = async (req, res, next) => {
  try {
    const providerOpt = {
      google: getUser,
      facebook: getFBUser,
      "": () => {
        throw new Error("Invalid provider");
      },
    };
    const { token } = req.cookies;
    if (!token) throw new Error("User is not logged");
    const userData = jwt.verify(token, jwtSecret);
    const signProvider = userData.provider;
    const { name, email, createdAt, updatedAt } = await providerOpt[
      signProvider
    ](userData.email);
    if (!email) throw new Error("User is not logged");
    req.user = { name, email, createdAt, updatedAt };
    next();
  } catch (err) {
    res.redirect(`/signin?target_path=${req.originalUrl || ""}`);
  }
};
