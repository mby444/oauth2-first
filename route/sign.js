import { Router } from "express";

export const signRoute = Router();

// signRoute.get("/signup", (req, res) => {
//   res.render("signup");
// });
// signRoute.get("/login", (req, res) => {
//   res.render("login");
// });
signRoute.get("/", (req, res) => {
  const targetPath = req.query.target_path || "";
  res.render("signin", { targetPath });
});
