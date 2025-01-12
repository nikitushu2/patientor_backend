import { z } from 'zod';
import { newPatientSchema } from './utils';

export type Diagnosis = "M24.2" | "M51.2" | "S03.5" | "J10.1" | "J06.9" | "Z57.1" | "N30.0" | "H54.7" | "J03.0" | "L60.1" | "Z74.3" | "L20" | "F43.2" | "S62.5" | "H35.29";

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  specialist: string;
  employerName: string;
  sickLeave?: SickLeave;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export interface DiagnosisEntry {
    code: string;
    name: string;
    latin?: string;
  }

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: string;
    occupation: string;
    entries?: Entry[];
}

export type NonSensitivePatient = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = z.infer<typeof newPatientSchema>;

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}