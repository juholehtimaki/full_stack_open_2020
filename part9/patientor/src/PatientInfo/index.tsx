import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient, Diagnosis } from "../types";
import { Icon, Button } from "semantic-ui-react";
import { addFetchedPatient, setDiagnosisList } from "../state";
import { Entry, NewHealthCheckEntry } from "../types";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";

const PatientInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patients, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: pantientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(addFetchedPatient(pantientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    const fetchDiagnoses = async () => {
      try {
        const { data: diagnosesFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnosesFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (patients.patients.hasOwnProperty(id)) fetchPatient();
    if (Object.keys(patients.diagnoses).length === 0) fetchDiagnoses();
  }, [dispatch, id, patients.patients, patients.diagnoses]);

  if (patients.diagnoses[0]) console.log(patients.diagnoses);
  const patient = patients.patients[id];
  if (!patient) return null;

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitEntry = async (values: NewHealthCheckEntry) => {
    const newEntry = { ...values };
    console.log(values);
    console.log("submitting");
    try {
      const { data: updatePatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        newEntry
      );
      dispatch(addFetchedPatient(updatePatient));
      closeModal();
    } catch (e) {
      setError("something went wrong:D");
    }
  };

  return (
    <div>
      <div>
        <h2>
          {patient.name}
          <Icon
            name={
              patient.gender === "male"
                ? "mars"
                : patient.gender === "female"
                ? "venus"
                : "genderless"
            }
          />
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
      <div>
        <h3>entries</h3>
        {patient.entries.map((entry: Entry, index: number) => (
          <EntryDetails entry={entry} key={index} />
        ))}
      </div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={openModal}>Add entry</Button>
    </div>
  );
};

export default PatientInfo;
