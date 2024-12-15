export interface Message {
    id: string
    message: string;
    datetime: string;
}

export type MessageWithoutId = Omit<Message, 'id'>