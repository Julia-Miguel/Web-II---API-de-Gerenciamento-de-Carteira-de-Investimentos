package br.edu.ufop.web.investmentportfolio.controllers;

import br.edu.ufop.web.investmentportfolio.dtos.InvestmentRequestDTO;
import br.edu.ufop.web.investmentportfolio.dtos.InvestmentResponseDTO;
import br.edu.ufop.web.investmentportfolio.dtos.InvestmentSummaryDTO;
import br.edu.ufop.web.investmentportfolio.enums.InvestmentType;
import br.edu.ufop.web.investmentportfolio.service.InvestmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/investments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class InvestmentController {

    private final InvestmentService service;

    @PostMapping
    public ResponseEntity<InvestmentResponseDTO> create(@Valid @RequestBody InvestmentRequestDTO requestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.create(requestDTO));
    }

    @GetMapping
    public ResponseEntity<List<InvestmentResponseDTO>> findAll(@RequestParam(required = false) Optional<InvestmentType> type) {
        return ResponseEntity.ok(service.findAll(type));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvestmentResponseDTO> findById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvestmentResponseDTO> update(@PathVariable Integer id, @Valid @RequestBody InvestmentRequestDTO requestDTO) {
        return ResponseEntity.ok(service.update(id, requestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/summary")
    public ResponseEntity<InvestmentSummaryDTO> getSummary() {
        return ResponseEntity.ok(service.getSummary());
    }
}