// src/pages/InvestmentForm.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getInvestmentById, createInvestment, updateInvestment } from '../services/api';
import type { InvestmentRequest } from '../types/Investment';
import '../App.css';

const InvestmentForm: React.FC = () => {
    const [formData, setFormData] = useState<InvestmentRequest>({
        type: 'ACAO',
        symbol: '',
        quantity: 0,
        purchasePrice: 0,
        purchaseDate: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditing = Boolean(id);

    useEffect(() => {
        if (isEditing) {
            getInvestmentById(Number(id))
                .then(data => {
                    setFormData({
                        type: data.type,
                        symbol: data.symbol,
                        quantity: data.quantity,
                        purchasePrice: data.purchasePrice,
                        purchaseDate: data.purchaseDate
                    });
                })
                .catch(error => {
                    console.error('Erro ao carregar ativo:', error);
                    alert('Ativo não encontrado!');
                    navigate('/investments');
                })
                .finally(() => {
                    setIsLoadingData(false);
                });
        } else {
            setIsLoadingData(false);
        }
    }, [id, isEditing, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const dataToSubmit = {
                ...formData,
                quantity: Number(formData.quantity),
                purchasePrice: Number(formData.purchasePrice)
            };

            if (isEditing) {
                await updateInvestment(Number(id), dataToSubmit);
                alert('Ativo atualizado com sucesso!');
            } else {
                await createInvestment(dataToSubmit);
                alert('Ativo adicionado com sucesso!');
            }
            navigate('/investments');
        } catch (error) {
            alert('Erro ao salvar ativo!');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoadingData) {
        return (
            <div className="form-container">
                <div className="text-center">Carregando...</div>
            </div>
        );
    }

    return (
        <div className="form-container">
            <h1>{isEditing ? 'Editar Ativo' : 'Adicionar Novo Ativo'}</h1>
            
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="symbol" className="form-label">Símbolo / Ticker</label>
                        <input
                            type="text"
                            id="symbol"
                            name="symbol"
                            className="form-control"
                            value={formData.symbol}
                            onChange={handleChange}
                            required
                            placeholder="Ex: PETR4, BTCUSD"
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <label htmlFor="type" className="form-label">Tipo</label>
                        <select
                            id="type"
                            name="type"
                            className="form-control"
                            value={formData.type}
                            onChange={handleChange}
                            disabled={isLoading}
                        >
                            <option value="ACAO">Ação</option>
                            <option value="CRIPTO">Cripto</option>
                            <option value="FUNDO">Fundo</option>
                            <option value="RENDA_FIXA">Renda Fixa</option>
                            <option value="OUTRO">Outro</option>
                        </select>
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <label htmlFor="quantity" className="form-label">Quantidade</label>
                        <input 
                            type="number" 
                            id="quantity" 
                            name="quantity" 
                            className="form-control" 
                            value={formData.quantity} 
                            onChange={handleChange} 
                            required
                            min="0"
                            step="any"
                            placeholder="0"
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <label htmlFor="purchasePrice" className="form-label">Preço de Compra (R$)</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            id="purchasePrice" 
                            name="purchasePrice" 
                            className="form-control" 
                            value={formData.purchasePrice} 
                            onChange={handleChange} 
                            required
                            min="0"
                            placeholder="0.00"
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="col-12 mb-3">
                        <label htmlFor="purchaseDate" className="form-label">Data da Compra</label>
                        <input 
                            type="date" 
                            id="purchaseDate" 
                            name="purchaseDate" 
                            className="form-control" 
                            value={formData.purchaseDate} 
                            onChange={handleChange} 
                            required
                            disabled={isLoading}
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-start gap-2 mt-4">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Salvando...' : isEditing ? 'Salvar Alterações' : 'Adicionar Ativo'}
                    </button>
                    
                    <Link to="/investments" className="btn btn-secondary">
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default InvestmentForm;