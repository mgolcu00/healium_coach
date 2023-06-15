// src/controllers/session.controller.js
const express = require('express');
const sessionService = require('./session.service');
const authMiddleware = require('../../middleware/auth.middleware');
const router = express.Router();

router.post('/create', authMiddleware.authenticateToken, async (req, res) => {
    try {
        const { hostId, name } = req.body;
        const session = await sessionService.createSession(hostId, name);
        res.json(session);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

router.post('/createFully', authMiddleware.authenticateToken, async (req, res) => {
    try {
        const { hostId, participantId, name,date } = req.body;
        const session = await sessionService.createFully(hostId, participantId, name,date);
        res.json(session);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

router.get('/:id', authMiddleware.authenticateToken, async (req, res) => {
    try {
        const session = await sessionService.getSessionById(req.params.id);
        res.json(session);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

router.get('/host/:hostId', authMiddleware.authenticateToken, async (req, res) => {
    try {
        const sessions = await sessionService.getSessionByHostId(req.params.hostId);
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

router.get('/participant/:participantId', authMiddleware.authenticateToken, async (req, res) => {
    try {
        const sessions = await sessionService.getSessionByParticipantId(req.params.participantId);
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

router.put('/:id', authMiddleware.authenticateToken, async (req, res) => {
    try {
        const session = await sessionService.updateSession(req.params.id, req.body);
        res.json(session);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

router.delete('/:id', authMiddleware.authenticateToken, async (req, res) => {
    try {
        const session = await sessionService.deleteSession(req.params.id);
        res.json(session);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

router.get('/', authMiddleware.authenticateToken, async (req, res) => {
    try {
        const sessions = await sessionService.getAllSessions();
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

router.post('/:id/join', authMiddleware.authenticateToken, async (req, res) => {
    try {
        const { participantId } = req.body;
        const session = await sessionService.joinSession(req.params.id, participantId);
        res.json(session);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;
