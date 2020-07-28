import express from "express";
import diagnoseService from "../services/diagnoseService";
const router = express.Router();

router.get("/", (_req, res) => {
  console.log("fetched");
  res.json(diagnoseService.getEntries());
});

router.post("/", (_req, res) => {
  res.send("saving new diagnose");
});

export default router;
