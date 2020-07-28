import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField } from "./FormField";
import { NewHealthCheckEntry } from "../types";

export type EntryFormValues = NewHealthCheckEntry;

interface Props {
  onSubmit: (values: NewHealthCheckEntry) => void;
  onCancel: () => void;
}

const HealthRating: any[] = [
  { value: 0, label: "Healthy" },
  { value: 1, label: "LowRisk" },
  { value: 2, label: "HighRisk" },
  { value: 3, label: "CriticalRisk" },
];

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        date: "",
        specialist: "",
        description: "",
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date || !isDate(values.date)) {
          errors.date = "SUBMIT DATE IN CORRECT FORM";
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="specialist"
              placeholder="specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <SelectField
              label="health reating"
              name="healthCheckRating"
              options={HealthRating}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
