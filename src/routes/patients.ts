import express, { Request, Response, NextFunction } from 'express';
import PatientService from "../services/patientService";
import {newPatientSchema} from '../utils';
import { z } from 'zod';
import { PatientEntry, NewPatientEntry } from '../types';
import patientService from '../services/patientService';

const router = express.Router();

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    newPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.get('/', (_req, res) => {
  res.send(PatientService.getPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(PatientService.getPatient(id));
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<PatientEntry>) => {
  const addedEntry = patientService.addPatient(req.body);
  res.json(addedEntry);
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const addedEntry = patientService.addEntries(id, req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;