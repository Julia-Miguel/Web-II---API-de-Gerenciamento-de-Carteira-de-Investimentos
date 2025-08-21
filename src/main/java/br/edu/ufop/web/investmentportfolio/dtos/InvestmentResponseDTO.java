public class InvestmentResponseDTO {
    
}
package br.edu.ufop.web.investmentportfolio.dtos;

import br.edu.ufop.web.investmentportfolio.enums.InvestmentType;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class InvestmentResponseDTO {
    private Integer id;
    private InvestmentType type;
    private String symbol;
    private Integer quantity;
    private BigDecimal purchasePrice;
    private LocalDate purchaseDate;
    private BigDecimal totalValue;
}
