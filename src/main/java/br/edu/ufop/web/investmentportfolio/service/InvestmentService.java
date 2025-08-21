package br.edu.ufop.web.investmentportfolio.service;

import br.edu.ufop.web.investmentportfolio.converter.InvestmentConverter;
import br.edu.ufop.web.investmentportfolio.domain.InvestmentDomain;
import br.edu.ufop.web.investmentportfolio.domain.usecase.CreateInvestmentUseCase;
import br.edu.ufop.web.investmentportfolio.dtos.InvestmentRequestDTO;
import br.edu.ufop.web.investmentportfolio.dtos.InvestmentResponseDTO;
import br.edu.ufop.web.investmentportfolio.dtos.InvestmentSummaryDTO;
import br.edu.ufop.web.investmentportfolio.enums.InvestmentType;
import br.edu.ufop.web.investmentportfolio.exceptions.ResourceNotFoundException;
import br.edu.ufop.web.investmentportfolio.models.Investment;
import br.edu.ufop.web.investmentportfolio.repositories.InvestmentRepository;
import lombok.RequiredArgsConstructor;
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
        // 1. Converter DTO para Domínio
        InvestmentDomain domain = InvestmentConverter.toDomain(requestDTO);

        // 2. Executar regras de negócio (UseCase)
        new CreateInvestmentUseCase(domain).validate();

        // 3. Converter Domínio para Modelo e salvar
        Investment model = InvestmentConverter.toModel(domain);
        repository.save(model);

        // 4. Converter Modelo para DTO de resposta
        return InvestmentConverter.toResponseDTO(model);
    }

    @Transactional(readOnly = true)
    public List<InvestmentResponseDTO> findAll(Optional<InvestmentType> type) {
        List<Investment> models = type.isPresent() ? repository.findByType(type.get()) : repository.findAll();
        return models.stream()
                .map(InvestmentConverter::toResponseDTO) // Usando o Converter
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public InvestmentResponseDTO findById(Integer id) {
        Investment model = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ativo com ID " + id + " não encontrado."));
        return InvestmentConverter.toResponseDTO(model); // Usando o Converter
    }

    @Transactional
    public InvestmentResponseDTO update(Integer id, InvestmentRequestDTO requestDTO) {
        // Garante que o ativo existe antes de atualizar
        Investment existingModel = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ativo com ID " + id + " não encontrado para atualização."));
        
        // Converte o DTO para um objeto de domínio
        InvestmentDomain domainToUpdate = InvestmentConverter.toDomain(requestDTO);
        domainToUpdate.setId(id); // Seta o ID para garantir que é uma atualização

        // Validações de atualização poderiam estar em um UpdateInvestmentUseCase
        
        // Converte o domínio atualizado para o modelo e salva
        Investment modelToUpdate = InvestmentConverter.toModel(domainToUpdate);
        repository.save(modelToUpdate);
        
        return InvestmentConverter.toResponseDTO(modelToUpdate); // Usando o Converter
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
        summaryDTO.setAssetCount((long) investments.size());
        
        return summaryDTO;
    }
}