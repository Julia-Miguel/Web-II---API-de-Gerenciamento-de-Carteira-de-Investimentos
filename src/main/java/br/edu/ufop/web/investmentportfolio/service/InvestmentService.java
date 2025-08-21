package br.edu.ufop.web.investmentportfolio.service;

import br.edu.ufop.web.investmentportfolio.dtos.InvestmentRequestDTO;
import br.edu.ufop.web.investmentportfolio.dtos.InvestmentResponseDTO;
import br.edu.ufop.web.investmentportfolio.dtos.InvestmentSummaryDTO;
import br.edu.ufop.web.investmentportfolio.enums.InvestmentType;
import br.edu.ufop.web.investmentportfolio.exceptions.ResourceNotFoundException;
import br.edu.ufop.web.investmentportfolio.models.Investment;
import br.edu.ufop.web.investmentportfolio.repositories.InvestmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvestmentService {

    private final InvestmentRepository repository;

    @Transactional
    public InvestmentResponseDTO create(InvestmentRequestDTO requestDTO) {
        Investment model = new Investment();
        // Copia as propriedades do DTO para o Modelo
        BeanUtils.copyProperties(requestDTO, model);
        
        repository.save(model);
        
        return toResponseDTO(model);
    }

    @Transactional(readOnly = true)
    public List<InvestmentResponseDTO> findAll(Optional<InvestmentType> type) {
        List<Investment> models = type.isPresent() ? repository.findByType(type.get()) : repository.findAll();
        return models.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public InvestmentResponseDTO findById(Integer id) {
        Investment model = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ativo com ID " + id + " não encontrado."));
        return toResponseDTO(model);
    }

    @Transactional
    public InvestmentResponseDTO update(Integer id, InvestmentRequestDTO requestDTO) {
        Investment model = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ativo com ID " + id + " não encontrado para atualização."));
        
        BeanUtils.copyProperties(requestDTO, model);
        repository.save(model);
        
        return toResponseDTO(model);
    }

    @Transactional
    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Ativo com ID " + id + " não encontrado para exclusão.");
        }
        repository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public InvestmentSummaryDTO getSummary() {
        List<Investment> investments = repository.findAll();

        BigDecimal totalInvested = investments.stream()
                .map(inv -> inv.getPurchasePrice().multiply(BigDecimal.valueOf(inv.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<InvestmentType, BigDecimal> totalByType = investments.stream()
                .collect(Collectors.groupingBy(
                        Investment::getType,
                        Collectors.mapping(
                                inv -> inv.getPurchasePrice().multiply(BigDecimal.valueOf(inv.getQuantity())),
                                Collectors.reducing(BigDecimal.ZERO, BigDecimal::add)
                        )
                ));
        
        InvestmentSummaryDTO summaryDTO = new InvestmentSummaryDTO();
        summaryDTO.setTotalInvested(totalInvested);
        summaryDTO.setTotalByType(totalByType);
        summaryDTO.setAssetCount(investments.size());
        
        return summaryDTO;
    }

    // --- MÉTODOS PRIVADOS DE CONVERSÃO ---

    private InvestmentResponseDTO toResponseDTO(Investment model) {
        InvestmentResponseDTO responseDTO = new InvestmentResponseDTO();
        BeanUtils.copyProperties(model, responseDTO);
        
        // Calcula o valor total
        BigDecimal totalValue = model.getPurchasePrice().multiply(BigDecimal.valueOf(model.getQuantity()));
        responseDTO.setTotalValue(totalValue);
        
        return responseDTO;
    }
}
