// api.js
import axios from 'axios';

const API_URL = "http://localhost:5000"; // Your server URL

const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

export const setToken = (token) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};


export const signup = async (name, email, password) => {
    const response = await apiClient.post('/auth/register', { name, email, password });
    return response.data;
};

export const login = async (email, password) => {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
};

export const createSession = async (hostId, name, token) => {
    const response = await apiClient.post('/session/create', { hostId, name }, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
};

export const createFully = async (hostId, date,participantId, name, token) => {
    const response = await apiClient.post('/session/createFully', { hostId, participantId, date,name }, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
};

export const getAllSessions = async (token) => {
    const response = await apiClient.get('/session', { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
};

// More API calls go here...
// api.js (devamı)

export const getSessionById = async (id, token) => {
    const response = await apiClient.get(`/session/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
};

export const getSessionByHostId = async (hostId, token) => {
    const response = await apiClient.get(`/session/host/${hostId}`, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
};

export const getSessionByParticipantId = async (participantId, token) => {
    const response = await apiClient.get(`/session/participant/${participantId}`, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
};

export const updateSession = async (id, updatedSession, token) => {
    const response = await apiClient.put(`/session/${id}`, updatedSession, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
};

export const deleteSession = async (id, token) => {
    const response = await apiClient.delete(`/session/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
};

export const joinSession = async (id, participantId, token) => {
    const response = await apiClient.post(`/session/${id}/join`, { participantId }, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
};

