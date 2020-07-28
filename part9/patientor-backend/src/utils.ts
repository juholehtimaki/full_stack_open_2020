import { NewPatientEntry, Gender, NewBaseEntry } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [],
  };
  return newEntry;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !String(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseName = (name: any): string => {
  if (!name || !isString(name))
    throw new Error("Incorrect or missing name: " + name);
  return name;
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};
const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn))
    throw new Error("Incorrect or missing ssn: " + ssn);
  return ssn;
};

const parseGender = (gender: any): string => {
  if (!gender || !isGender(gender))
    throw new Error("Incorrect or missing gender: " + gender);
  return gender;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation))
    throw new Error("Incorrect or missing occupation: " + occupation);
  return occupation;
};

const toNewEntry = (object: any): NewBaseEntry => {
  const newEntry: NewBaseEntry = {
    type: parseType(object.type),
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: object.diagnosisCodes,
  };
  return newEntry;
};

const parseType = (type: any): string => {
  if (
    !type &&
    (type === "HealthCheck" ||
      type === "OccupationalHealthcare" ||
      type === "Hospital")
  )
    throw new Error("Incorrect or missing type: " + type);
  return type;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description))
    throw new Error("Incorrect or missing description: " + description);
  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist))
    throw new Error("Incorrect or missing specialist: " + specialist);
  return specialist;
};

export { toNewPatientEntry, toNewEntry };
