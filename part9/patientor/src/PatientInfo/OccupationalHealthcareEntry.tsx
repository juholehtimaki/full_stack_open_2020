import React from "react";
import { OccupationalHealthCareEntry } from "../types";
import { Container, Icon } from "semantic-ui-react";
import "./entry.scss";

export const OccupationalHealthcareEntry: React.FC<{
  entry: OccupationalHealthCareEntry;
}> = ({ entry }) => {
  return (
    <Container className="entry-container">
      <h2>
        {entry.date} {entry.employerName}
        <Icon name="doctor" />
      </h2>
      <p>{entry.description}</p>
    </Container>
  );
};
