// src/services/session.service.js
const Session = require('./session.model');

class SessionService {
    async createSession(hostId, name, date) {
        const session = new Session({
            hostId,
            name,
        });
        await session.save();
        return session;
    }

    async createFully(hostId, participantId, name, date) {
        const session = new Session({
            hostId,
            participantId,
            name,
            date
        });
        await session.save();
        return session;
    }

    async getSessionById(id) {
        const session = await Session.findById(id);
        return session;
    }

    async getSessionByHostId(hostId) {
        const sessions = await Session.find({ hostId: hostId });
        return sessions;
    }

    async getSessionByParticipantId(participantId) {
        const sessions = await Session.find({ participantId: participantId });
        return sessions;
    }

    async updateSession(id, updateData) {
        const session = await Session.findByIdAndUpdate(id, updateData, { new: true });
        return session;
    }

    async deleteSession(id) {
        const session = await Session.findByIdAndDelete(id);
        return session;
    }

    async getAllSessions() {
        const sessions = await Session.find({});
        return sessions;
    }

    async joinSession(id, participantId) {
        const session = await Session.findByIdAndUpdate(id, { participantId }, { new: true });
        return session;
    }
}

module.exports = new SessionService();
