import { Router } from "express";
import { auth } from "../middleware/auth.js";

export const route = Router();

route.get("/", (req, res) => {
  res.render("index");
});

route.get("/user", auth, (req, res) => {
  res.json(req.user);
});

route.get("*", (req, res) => {
  res.sendStatus(404);
});
