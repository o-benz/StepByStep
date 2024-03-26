import { InterventionPlan, FollowUpType, NoteType, RessourceType, CommunicationType, ReasonOfContact } from "@common/interfaces/documents/intervention-plan.interface";
import { PersonRole } from "@common/interfaces/stakeholders/persons";
import { Term } from "@common/enums/term.enum";
import { Status } from "@common/enums/status.enum";
import { HealthFactor } from "@common/enums/health-factor.enum";
import { Issue } from "@common/enums/issue.enum";


const plan1: InterventionPlan = {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    resident: '2',
    isFirstVisit: false,
    planStart: new Date(),
    startOfStay: new Date(new Date().setDate(new Date().getDate() - 7)),
    endOfStay: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    caregivers: ["1"],
    treatmentTeam: [{
        role: PersonRole.Doctor,
        name: "XYZ",
        address: "1234 Sherbrooke Est"
    }],
    objectives: [
        {
            title: "Améliorer les habitudes de consommation",
            description: "Maintenir routine de consommation en utilisant les services adaptés : arriver à ne consommer que la médication prescrite (méthadone, dilaudid)",
            term: Term.Medium,
            status: Status.Paused,
            means: "Utiliser les services toxicos  et respecter la routine établie (en moyenne 4 injections par jour)",
            healthFactor: [HealthFactor.Physical, HealthFactor.Economic, HealthFactor.Physical],
        },
        {
            title: "Améliorer la santé physique",
            description: "Eviter les infections et les maladies en adoptant des habitudes saines",
            term: Term.Short,
            status: Status.InProgress,
            means: "Se laver les mains régulièrement, éviter les contacts avec les personnes malades, prendre les médicaments prescrits",
            healthFactor: [ HealthFactor.Physical],
        }
    ],
    followUps: [
        {
            title: "Rencontre de suivi",
            reminderDate: new Date(new Date().setDate(new Date().getDate() + 2)),
            type: FollowUpType.Checkpoint,
            notes: "Evaluer la progression",
            communicationType: CommunicationType.InPerson,
        },
        {
            title: "Rendez-vous médical",
            reminderDate: new Date(new Date().setDate(new Date().getDate() + 5)),
            type: FollowUpType.Appointment,
            notes: "Rencontre avec le docteur XYZ",
            communicationType: CommunicationType.InPerson,
        }
    ],
    notes: [
        {
            title: "Rencontre",
            type: NoteType.Crisis,
            date: new Date(),
            details: "Tentons de réveiller Mme à plusieurs reprises, jeudi 14 mars, pour lui proposer un rendez-vous à la clinique médicale. Mme finalement refuse. La coordonnatrice, vient aussi lui proposer ce rendez-vous, simple d’accès, parler avec un médecin de ses symptômes (tels que mentionné depuis début février qui a des résultats de test ou analyse à lui communiquer. Mme refuse toujours de se lever. Nous lui reflétons que, c’est effectivement son choix, mais aussi que dans ce cas de figure, elle ne pourra pas demander un accompagnement pour se rendre et attendre aux urgences",
            observations: "Intervention mise en place Écoute active",
            employeeId: "1",
            reasonOfContact: ReasonOfContact.Appointment,
            motives: "Mme ne veut pas pour le moment",
            interventions: [],
            objectives: [],
        },
        {
            title: "Rendez-vous médical",
            type: NoteType.Appointment,
            date: new Date(),
            details: "Rencontre avec le docteur XYZ",
            observations: "Intervention mise en place Écoute active",
            employeeId: "1",
            reasonOfContact: ReasonOfContact.Appointment,
            motives: "Mme ne veut pas pour le moment",
            interventions: [],
            objectives: [],
        }
    ],
    ressources: [
        {
            title: "Site de l’association Cactus",
            description: "Information sur l’association",
            link: "https://cactusmontreal.org/",
            type: RessourceType.Document,
            relatedIssues: [Issue.Addiction],
        },
        {
            title: "Site de l’association Spectre de rue",
            description: "Information sur l’association",
            link: "https://spectrederue.ca/",
            type: RessourceType.Document,
            relatedIssues: [Issue.Addiction],
        }
    ],
    interventions: [
        {
            title: "Appel",
            date: new Date(),
            employeeId: "1",
            description: "Appel pour prendre des nouvelles",
            objectives: [
                {
                    title: "Améliorer les habitudes de consommation",
                    description: "Maintenir routine de consommation en utilisant les services adaptés : arriver à ne consommer que la médication prescrite (méthadone, dilaudid)",
                    term: Term.Medium,
                    status: Status.Paused,
                    means: "Utiliser les services toxicos  et respecter la routine établie (en moyenne 4 injections par jour)",
                    healthFactor: [HealthFactor.Physical, HealthFactor.Economic, HealthFactor.Physical],
                }
            ]
        }
    ]
};

export const PLANS = [plan1]