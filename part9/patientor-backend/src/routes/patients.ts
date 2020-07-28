import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry } from "../utils";
const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getPatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findPatient(req.params.id);
  if (!patient) res.status(404).send("Patient not found.");
  res.json(patient);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.post("/:id/entries", (req, res) => {
  const patient = patientService.findPatient(req.params.id);
  if (!patient) {
    res.status(404).send("Patient not found.");
    return;
  }
  try {
    const newEntry = req.body;
    const patientWithNewEntry = patientService.addEntry(patient, newEntry);
    res.json(patientWithNewEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
