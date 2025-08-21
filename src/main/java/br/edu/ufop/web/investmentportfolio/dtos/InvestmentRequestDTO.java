package br.edu.ufop.web.investmentportfolio.dtos;

import br.edu.ufop.web.investmentportfolio.enums.InvestmentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InvestmentRequestDTO {

    @NotNull(message = "O tipo do ativo não pode ser nulo.")
    private InvestmentType type;

    @NotBlank(message = "O símbolo do ativo não pode ser vazio.")
    private String symbol;

    @NotNull(message = "A quantidade não pode ser nula.")
    @Positive(message = "A quantidade deve ser um número positivo.")
    private Integer quantity;

    @NotNull(message = "O preço de compra não pode ser nulo.")
    @Positive(message = "O preço de compra deve ser positivo.")
    private BigDecimal purchasePrice;

    @NotNull(message = "A data de compra não pode ser nula.")
    @PastOrPresent(message = "A data de compra não pode ser no futuro.")
    private LocalDate purchaseDate;
}