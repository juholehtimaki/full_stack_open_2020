import React from "react";

import { Entry } from "../types";

import { HealthCheckEntry } from "./HealthCheckEntry";
import { OccupationalHealthcareEntry } from "./OccupationalHealthcareEntry";
import { HospitalEntry } from "./HospitalEntry";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    default:
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(entry)}`
      );
  }
};

export default EntryDetails;
