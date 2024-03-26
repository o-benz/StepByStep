import { BaseDocument } from './base-document.interface';
import { Objective } from './objective.interface';
import { UserId } from '../stakeholders/users';
import { MedicalStaff } from '../stakeholders/persons'

export interface InterventionPlan extends BaseDocument {
    resident: UserId;
    isFirstVisit: boolean;
    planStart: Date;
    startOfStay: Date;
    endOfStay: Date;
    caregivers: UserId[];
    treatmentTeam: MedicalStaff[];
    objectives: Objective[];
    followUps: FollowUp[];
    notes: Note[];
    ressources: Ressource[];
    interventions: Intervention[];
}

export enum FollowUpType {
    Checkpoint = 'checkpoint',
    Meeting = 'meeting',
    Appointment = 'appointment',
}

export enum CommunicationType {
    Phone = 'phone',
    Email = 'email',
    InPerson = 'in-person',
}

export interface FollowUp {
    title: string;
    reminderDate: Date;
    type: FollowUpType;
    notes: string;
    communicationType: CommunicationType;
}

export enum ReasonOfContact {
    Action = 'action',
    Information = 'information',
    Request = 'request',
    Appointment = 'appointment',
}

export enum NoteType {
    Crisis = 'crisis',
    Appointment = 'appointment',
    Request = 'request',
}

export interface Note {
    title: string;
    type: NoteType; 
    date: Date;
    details: string;
    observations: string;
    employeeId: UserId;
    reasonOfContact: ReasonOfContact;
    motives: string;
    interventions: Intervention[];
    objectives: Objective[];
}

export enum RessourceType {
    Activity = 'activity',
    Video = 'video',
    Document = 'document',
}

export interface Ressource {
    title: string;
    description: string;
    type: RessourceType;
    link: string;
    relatedIssues: string[];
}

export interface Intervention {
    title: string;
    description: string;
    date: Date;
    employeeId: UserId;
    objectives: Objective[];
}
