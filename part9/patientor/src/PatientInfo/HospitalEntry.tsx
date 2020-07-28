import React from "react";
import { HospitalEntry as Hospital } from "../types";
import { Container, Icon } from "semantic-ui-react";
import "./entry.scss";

export const HospitalEntry: React.FC<{ entry: Hospital }> = ({ entry }) => {
  return (
    <Container className="entry-container">
      <h2>
        {entry.date} <Icon name="hospital" />
      </h2>
      <p>{entry.description}</p>
      <p>End result: {entry.discharge.criteria}</p>
    </Container>
  );
};
