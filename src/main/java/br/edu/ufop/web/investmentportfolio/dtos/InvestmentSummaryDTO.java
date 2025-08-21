package br.edu.ufop.web.investmentportfolio.dtos;

import br.edu.ufop.web.investmentportfolio.enums.InvestmentType;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;

@Data
public class InvestmentSummaryDTO {
    private BigDecimal totalInvested;
    private Map<InvestmentType, BigDecimal> totalByType;
    private long assetCount;
}