// src/pages/Summary.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSummary } from '../services/api';
import type { InvestmentSummary } from '../types/Investment';
import '../App.css';

const Summary: React.FC = () => {
    const [summary, setSummary] = useState<InvestmentSummary | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getSummary()
            .then(setSummary)
            .catch(err => {
                console.error("Erro ao buscar resumo:", err);
                alert('Erro ao carregar resumo da carteira!');
            })
            .finally(() => setIsLoading(false));
    }, []);

    const formatCurrency = (value: number) => 
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

    if (isLoading) {
        return (
            <div className="form-container">
                <div className="text-center">Carregando...</div>
            </div>
        );
    }

    if (!summary) {
        return (
            <div className="form-container">
                <div className="text-center">Erro ao carregar resumo da carteira</div>
                <div className="d-flex justify-content-center mt-3">
                    <Link to="/" className="btn btn-secondary">Voltar</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="form-container">
                <h1>Resumo da Carteira</h1>
                
                <div className="row mt-4">
                    <div className="col-md-6 mb-3">
                        <div className="card text-center h-100">
                            <div className="card-body">
                                <h5 className="card-title">Total Investido</h5>
                                <p className="card-text fs-4 fw-bold text-primary">
                                    {formatCurrency(summary.totalInvested)}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <div className="card text-center h-100">
                            <div className="card-body">
                                <h5 className="card-title">Total de Ativos</h5>
                                <p className="card-text fs-4 fw-bold text-success">
                                    {summary.assetCount}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-4">
                    <h5>Distribuição por Tipo</h5>
                    <div className="table-container">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Valor Investido</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(summary.totalByType).map(([type, total]) => (
                                    <tr key={type}>
                                        <td>{type}</td>
                                        <td className="fw-bold">{formatCurrency(total)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="d-flex justify-content-center gap-2 mt-4">
                    <Link to="/investments" className="btn btn-primary">
                        Ver Ativos
                    </Link>
                    <Link to="/" className="btn btn-secondary">
                        Voltar
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Summary;