import express from "express";

const messagesRouter = express.Router();

messagesRouter.get("/", (req, res) => {
    res.status(200).send("Messages page loaded");
});

messagesRouter.post("/", (req, res) => {
    res.status(200).send("Messages page loaded");
});


export default messagesRouter;