import patients from "../../data/patients";

import { Patient, PublicPatient, NewPatientEntry, Entry } from "../types";

const getEntries = (): PublicPatient[] => {
  return patients;
};

const getPatients = (): PublicPatient[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = Math.floor(Math.random() * 1000);
  const newPatientEntry = {
    id: id.toString(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findPatient = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

const addEntry = (patient: Patient, newEntry: any): Patient => {
  const id = Math.floor(Math.random() * 1000);
  const entryWithID: Entry = { ...newEntry, id: id.toString() };
  for (let p of patients) {
    if (patient.id === p.id) p.entries = p.entries.concat(entryWithID);
  }
  return patient;
};

export default {
  getEntries,
  addPatient,
  getPatients,
  findPatient,
  addEntry,
};
