// src/types/Investment.ts

// Representa um ativo de investimento recebido da API
export interface Investment {
    id: number;
    type: string;
    symbol: string;
    quantity: number;
    purchasePrice: number;
    purchaseDate: string;
    totalValue: number;
}

// Representa os dados enviados para criar ou atualizar um ativo
export interface InvestmentRequest {
    type: string;
    symbol: string;
    quantity: number;
    purchasePrice: number;
    purchaseDate: string;
}

// Representa o resumo da carteira
export interface InvestmentSummary {
    totalInvested: number;
    totalByType: { [key: string]: number };
    assetCount: number;
}