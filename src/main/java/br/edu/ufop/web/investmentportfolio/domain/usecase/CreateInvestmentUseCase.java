package br.edu.ufop.web.investmentportfolio.domain.usecase;

import br.edu.ufop.web.investmentportfolio.domain.InvestmentDomain;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@AllArgsConstructor
public class CreateInvestmentUseCase {

    private final InvestmentDomain investmentDomain;

    public void validate() {
        validateRequiredFields();
        validateNumericValues();
        validatePurchaseDate();
    }

    private void validateRequiredFields() {
        if (investmentDomain.getType() == null) {
            throw new IllegalArgumentException("O tipo do ativo é obrigatório.");
        }
        if (investmentDomain.getSymbol() == null || investmentDomain.getSymbol().isBlank()) {
            throw new IllegalArgumentException("O símbolo do ativo é obrigatório.");
        }
        if (investmentDomain.getPurchasePrice() == null) {
            throw new IllegalArgumentException("O preço de compra é obrigatório.");
        }
        if (investmentDomain.getQuantity() == null) {
            throw new IllegalArgumentException("A quantidade é obrigatória.");
        }
        if (investmentDomain.getPurchaseDate() == null) {
            throw new IllegalArgumentException("A data de compra é obrigatória.");
        }
    }

    private void validateNumericValues() {
        if (investmentDomain.getQuantity() <= 0) {
            throw new IllegalArgumentException("A quantidade do ativo deve ser maior que zero.");
        }
        if (investmentDomain.getPurchasePrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("O preço de compra deve ser positivo.");
        }
    }

    private void validatePurchaseDate() {
        if (investmentDomain.getPurchaseDate().isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("A data de compra não pode ser no futuro.");
        }
    }
}