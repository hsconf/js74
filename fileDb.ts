import { promises as fs } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';
import { Message, MessageWithoutId } from './types';

const path = './messages/';
const messages: Message[] = [];

const fileDb = {
    init: async (): Promise<void> => {
        try {
            const files = await fs.readdir(path);

            for (const file of files) {
                const filePath = join(path, file);
                const msg = await fs.readFile(filePath, 'utf-8');
                messages.push(JSON.parse(msg));
            }

        } catch (e) {
            console.error(e);

        }
    },

    getMessage: async (): Promise<Message[]> => {
        return messages;
    },

    addMessage: async (item: MessageWithoutId): Promise<Message> => {
        try {
            const id = randomUUID();
            const msg: Message = {
                id,
                ...item,
            };

            const date = new Date();
            const fileName = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}.json`;
            const filePath = join(path, fileName);

            await fs.writeFile(filePath, JSON.stringify(msg));

            messages.push(msg);

            return msg;
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
};

export default fileDb;
