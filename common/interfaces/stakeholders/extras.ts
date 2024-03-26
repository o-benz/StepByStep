enum FollowUpType {
    Appointment = "Appointment",
    Meeting = "Meeting",
    Checkpoint = "Checkpoint",
}

enum CommunicationMeans {
    Email = "Email",
    Phone = "Phone",
    InPerson = "In Person",
}

enum ResourceType {
    Activity = "Activity",
    Video = "Video",
    Document = "Document",
}

interface CommunityService {
    organizationName: string;
    contactPerson: string;
    phone: string;
    email: string;
    missionStatement: string; 
}

// Goals here

interface FollowUp {
    title: string; // Titre
    followUpDate: Date; // Date de rappel
    type: FollowUpType; // Type: Appointment / Meeting / Checkpoint
    notes: string; // Notes
    communicationMeans: CommunicationMeans; // Moyen de communication: Email / Phone / In Person
}

// Chronological notes here

interface Resource {
    title: string; // Title
    description: string; // Description
    type: ResourceType; // Type with options: Activity, Video, Document
    link: string; // Link to the resource
    issues: string[]; // Array of related issues or challenges
}

interface Intervention {
    title: string;
    description: string;
}
  
  