import { Attachment } from './Attachment';


export type Message = IncomingMessage | OutgoingMessage;

export type IncomingMessage = {
  type: 'incoming';
  // Required
  attachments: Array<Attachment>;
  conversationId: string;
  id: string;
  received_at: number;
  sent_at: number;
  timestamp: number;

  // Optional
  body?: string;
  decrypted_at?: number;
  errors?: Array<any>;
  flags?: number;
  source?: string;
  sourceDevice?: number;
} & Message4

export type OutgoingMessage = {
  type: 'outgoing';

  // Required
  attachments: Array<Attachment>;
  conversationId: string;
  delivered: number;
  delivered_to: Array<string>;
  destination: string; // PhoneNumber
  expirationStartTimestamp: number;
  id: string;
  received_at: number;
  sent: boolean;
  sent_at: number;
  sent_to: Array<string>; // Array<PhoneNumber>
  synced: boolean;
  timestamp: number;

  // Optional
  body?: string;
  expires_at?: number;
  expireTimer?: number;
  recipients?: Array<string>; // Array<PhoneNumber>
} & Message4

interface Message4 {
  numAttachments?: number;
  numVisualMediaAttachments?: number;
  numFileAttachments?: number;
}
