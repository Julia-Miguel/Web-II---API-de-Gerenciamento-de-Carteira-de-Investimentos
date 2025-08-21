// src/pages/InvestmentList.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getInvestments, deleteInvestment } from '../services/api';
import type { Investment } from '../types/Investment';
import '../App.css';

const InvestmentList: React.FC = () => {
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [filterType, setFilterType] = useState('');
    const [searchSymbol, setSearchSymbol] = useState('');
    const [sortField, setSortField] = useState<keyof Investment | ''>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        fetchInvestments();
    }, []);

    const fetchInvestments = async () => {
        try {
            const data = await getInvestments();
            setInvestments(data);
        } catch (error) {
            console.error("Erro ao buscar investimentos:", error);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Deseja realmente excluir este ativo?')) return;

        try {
            await deleteInvestment(id);
            alert('Ativo excluído com sucesso!');
            fetchInvestments();
        } catch (error) {
            alert('Erro ao excluir ativo!');
            console.error(error);
        }
    };

    const handleSort = (field: keyof Investment) => {
        const order = (field === sortField && sortOrder === 'asc') ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
    };

    const filteredAndSortedInvestments = useMemo(() => {
        const filtered = investments.filter(inv =>
            (filterType === '' || inv.type === filterType) &&
            inv.symbol.toLowerCase().includes(searchSymbol.toLowerCase())
        );

        if (sortField) {
            filtered.sort((a, b) => {
                const aVal = a[sortField] || '';
                const bVal = b[sortField] || '';
                if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return filtered;
    }, [investments, filterType, searchSymbol, sortField, sortOrder]);

    const getSortIcon = (field: keyof Investment) => {
        if (sortField !== field) return '⇅';
        return sortOrder === 'asc' ? '↑' : '↓';
    };

    return (
        <div className="container mt-4">
            <div className="list-container">
                <h1>Meus Ativos</h1>

                <div className="row mt-4 mb-4">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="filterType" className="form-label">
                            Buscar por símbolo
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={searchSymbol}
                            onChange={(e) => setSearchSymbol(e.target.value)}
                            placeholder="Ex: US"
                            title="Buscar por símbolo"
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="filterType" className="form-label">
                            Filtrar por tipo
                        </label>
                        <select
                            id="filterType"
                            className="form-control"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="">Todos os tipos</option>
                            <option value="ACAO">Ação</option>
                            <option value="CRIPTO">Cripto</option>
                            <option value="FUNDO">Fundo</option>
                            <option value="RENDA_FIXA">Renda Fixa</option>
                            <option value="OUTRO">Outro</option>
                        </select>
                    </div>
                    <div className="col-md-4 mb-3 d-flex align-items-end justify-content-end gap-2">
                        <Link to="/investments/new" className="btn btn-success">
                            Adicionar Ativo
                        </Link>
                        <Link to="/" className="btn btn-secondary">
                            Voltar
                        </Link>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="sortable" onClick={() => handleSort("symbol")}>
                                Símbolo {getSortIcon('symbol')}
                            </th>
                            <th className="sortable" onClick={() => handleSort("type")}>
                                Tipo {getSortIcon('type')}
                            </th>
                            <th className="sortable" onClick={() => handleSort("quantity")}>
                                Quantidade {getSortIcon('quantity')}
                            </th>
                            <th className="sortable" onClick={() => handleSort("purchasePrice")}>
                                Preço de Compra {getSortIcon('purchasePrice')}
                            </th>
                            <th className="sortable" onClick={() => handleSort("totalValue")}>
                                Valor Total {getSortIcon('totalValue')}
                            </th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedInvestments.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center">
                                    Nenhum ativo encontrado
                                </td>
                            </tr>
                        ) : (
                            filteredAndSortedInvestments.map(inv => (
                                <tr key={inv.id}>
                                    <td>{inv.symbol}</td>
                                    <td>{inv.type}</td>
                                    <td>{inv.quantity}</td>
                                    <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(inv.purchasePrice)}</td>
                                    <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(inv.totalValue)}</td>
                                    <td className="d-flex justify-content-center gap-2">
                                        <Link to={`/investments/edit/${inv.id}`} className="btn btn-primary btn-sm">
                                            Editar
                                        </Link>
                                        <button onClick={() => handleDelete(inv.id)} className="btn btn-danger btn-sm">
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InvestmentList;