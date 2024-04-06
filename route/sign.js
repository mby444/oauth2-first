import { Router } from "express";

export const signRoute = Router();

signRoute.get("/signup", (req, res) => {
  res.render("signup");
});
signRoute.get("/login", (req, res) => {
  res.render("login");
});
