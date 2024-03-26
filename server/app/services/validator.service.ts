import { Objective } from "@common/interfaces/documents/objective.interface";
import { InterventionPlan } from "@common/interfaces/documents/intervention-plan.interface";
import { MedicalStaff } from "@common/interfaces/stakeholders/persons";

export class TypeValidator {
    static isValidObjctive(object: any): object is Objective {
        return 'title' in object && typeof object.title === 'string' &&
               'description' in object && typeof object.description === 'string' &&
               'term' in object &&
               'status' in object &&
               (!('means' in object) || ('means' in object && typeof object.means === 'string')) &&
               'healthFactor' in object && Array.isArray(object.healthFactor);
    }

    static isValidMedicalStaff(object: any): object is MedicalStaff {
        const hasAtLeastOneContact = ('phoneNumber' in object && typeof object.phoneNumber === 'string') ||
                                     ('email' in object && typeof object.email === 'string');
        return 'name' in object && typeof object.name === 'string' &&
               'phoneNumber' in object && typeof object.phoneNumber === 'string' &&
               'email' in object && typeof object.email === 'string' &&
               'address' in object && typeof object.address === 'string';
    }

    static isValidInterventionPlan(object: any): object is InterventionPlan {
        return 'createdAt' in object && typeof object.createdAt === 'string' &&
               'updatedAt' in object && typeof object.updatedAt === 'string' &&
               'resident' in object &&
               'isFirstVisit' in object && typeof object.isFirstVisit === 'boolean'&&
               'planStart' in object && typeof object.planStart === 'string' &&
               'startOfStay' in object && typeof object.startOfStay === 'string' &&
               'endOfStay' in object && typeof object.endOfStay === 'string' &&
               'caregivers' in object && Array.isArray(object.caregivers) &&
               'treatmentTeam' in object && Array.isArray(object.treatmentTeam) &&
               'objectives' in object && object.objectives.every((objective: any) => TypeValidator.isValidObjctive(objective));
    }
}