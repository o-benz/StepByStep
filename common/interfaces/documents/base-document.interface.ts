export type DocumentId = string;

export interface BaseDocument {
    id: DocumentId;
    createdAt: Date;
    updatedAt: Date;
}