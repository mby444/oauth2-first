import oauth2FB from "simple-oauth2-facebook";
import "./dotenv.js";

export const facebook = oauth2FB.create({
  clientId: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_SECRET_KEY,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL,
});
