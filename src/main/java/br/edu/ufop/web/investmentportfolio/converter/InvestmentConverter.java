package br.edu.ufop.web.investmentportfolio.converter;

import br.edu.ufop.web.investmentportfolio.domain.InvestmentDomain;
import br.edu.ufop.web.investmentportfolio.dtos.InvestmentRequestDTO;
import br.edu.ufop.web.investmentportfolio.dtos.InvestmentResponseDTO;
import br.edu.ufop.web.investmentportfolio.models.Investment;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class InvestmentConverter {

    // Converte de DTO de requisição para Domínio
    public static InvestmentDomain toDomain(InvestmentRequestDTO dto) {
        return InvestmentDomain.builder()
                .type(dto.getType())
                .symbol(dto.getSymbol())
                .quantity(dto.getQuantity())
                .purchasePrice(dto.getPurchasePrice())
                .purchaseDate(dto.getPurchaseDate())
                .build();
    }

    // Converte de Domínio para Model (Entidade JPA)
    public static Investment toModel(InvestmentDomain domain) {
        return new Investment(
                domain.getId(),
                domain.getType(),
                domain.getSymbol(),
                domain.getQuantity(),
                domain.getPurchasePrice(),
                domain.getPurchaseDate()
        );
    }
    
    // Converte de Model (Entidade JPA) para DTO de resposta
    public static InvestmentResponseDTO toResponseDTO(Investment model) {
        InvestmentResponseDTO responseDTO = new InvestmentResponseDTO();
        responseDTO.setId(model.getId());
        responseDTO.setType(model.getType());
        responseDTO.setSymbol(model.getSymbol());
        responseDTO.setQuantity(model.getQuantity());
        responseDTO.setPurchasePrice(model.getPurchasePrice());
        responseDTO.setPurchaseDate(model.getPurchaseDate());

        // A lógica de cálculo pode ficar aqui ou no próprio DTO
        BigDecimal totalValue = model.getPurchasePrice().multiply(BigDecimal.valueOf(model.getQuantity()));
        responseDTO.setTotalValue(totalValue);

        return responseDTO;
    }
}