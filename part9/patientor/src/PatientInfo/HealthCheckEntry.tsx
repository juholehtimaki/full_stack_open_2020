import React from "react";
import { HealthCheckEntry as Healthcheck } from "../types";
import { Container, Icon } from "semantic-ui-react";
import "./entry.scss";

export const HealthCheckEntry: React.FC<{ entry: Healthcheck }> = ({
  entry,
}) => {
  return (
    <Container className="entry-container">
      <h2>
        {entry.date}
        <Icon name="eye" />
      </h2>
      <p>{entry.description}</p>
      <p>Healthcheck rating: {entry.healthCheckRating}</p>
    </Container>
  );
};
