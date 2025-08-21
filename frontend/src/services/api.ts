// src/services/api.ts
import axios from 'axios';
import type { Investment, InvestmentRequest, InvestmentSummary } from '../types/Investment';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getInvestments = (type?: string): Promise<Investment[]> => {
    const params = type ? { type } : {};
    return apiClient.get('/investments', { params }).then(res => res.data);
};

export const getInvestmentById = (id: number): Promise<Investment> => {
    return apiClient.get(`/investments/${id}`).then(res => res.data);
};

export const createInvestment = (data: InvestmentRequest): Promise<Investment> => {
    return apiClient.post('/investments', data).then(res => res.data);
};

export const updateInvestment = (id: number, data: InvestmentRequest): Promise<Investment> => {
    return apiClient.put(`/investments/${id}`, data).then(res => res.data);
};

export const deleteInvestment = (id: number): Promise<void> => {
    return apiClient.delete(`/investments/${id}`);
};

export const getSummary = (): Promise<InvestmentSummary> => {
    return apiClient.get('/investments/summary').then(res => res.data);
};