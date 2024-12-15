import express from "express";
import fileDb from "../fileDb";
import {MessageWithoutId} from "../types";

const messagesRouter = express.Router();

messagesRouter.get("/", async (req, res) => {
    await fileDb.init();
    const msg = await fileDb.getMessage();
    res.send(msg.reverse().slice(0, 5))
});

messagesRouter.post("/", async (req, res) => {
    const date = new Date();
    const msg: MessageWithoutId = {
        message: req.body.message,
        datetime: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
    }

    await fileDb.addMessage(msg)
    res.send(msg)
});


export default messagesRouter;