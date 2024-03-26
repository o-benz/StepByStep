// A person is a user that will not have an account in the system
export enum PersonRole { 
    Significant = 'significant',
    Doctor = 'doctor',
    SocialWorker = 'social-worker',
    Orgnanization = 'organization',
}

export enum RelationType {
    Friend = 'friend',
    Family = 'family',
    Colleague = 'colleague',
    Other = 'other',
}

export interface BasePerson {
    name: string; // We can't split the name into first and last name because some people can be referred to by a single name like "Grandma"
    phoneNumber?: string;
    email?: string;
    address?: string;
}

export interface SignificantPerson extends BasePerson {
    role: PersonRole.Significant;
    phoneNumber: string;
    relationType: RelationType
}

export interface Doctor extends BasePerson {
    role: PersonRole.Doctor;
    address: string;
}

export interface SocialWorker extends BasePerson {
    role: PersonRole.SocialWorker;
    address: string;
}

export interface Organization extends BasePerson {
    role: PersonRole.Orgnanization;
    mission: string;
    contactPerson?: string;
}

export type MedicalStaff = Doctor | SocialWorker;
