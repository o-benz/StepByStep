export const TO_CAREGIVERS = "caregivers";
export const TO_RESIDENTS = "residents";

export interface Message {
  senderId: string;
  senderName: string;
  channel: string;
  content: string;
  timestamp?: number;
}
