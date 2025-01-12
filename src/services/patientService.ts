import patientsData from '../data/patients';
import { PatientEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';
import { EntryWithoutId } from '../types';

const patients: PatientEntry[] = patientsData;

const getPatients = (): PatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, ssn, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        ssn,
        occupation,
        entries
      }));
};

const getPatient = (id: string) => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
};

const addPatient = (
    patient: NewPatientEntry
  ): PatientEntry => {

  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: String(uuid()),
    ...patient
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntries = (patientId: string, entry: EntryWithoutId) => {
  const patient = patients.find(patient => patient.id === patientId);

  const newEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: String(uuid()),
    ...entry
  };
  patient?.entries?.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addEntries
};