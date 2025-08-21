package br.edu.ufop.web.investmentportfolio.models;

import br.edu.ufop.web.investmentportfolio.enums.InvestmentType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Modelo de persistência (Entidade JPA) para um ativo de investimento.
 * @Data: Gera getters, setters, toString, equals e hashCode.
 * @NoArgsConstructor: Gera um construtor sem argumentos.
 * @AllArgsConstructor: Gera um construtor com todos os campos como argumentos.
 */
@Entity
@Table(name = "investments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Investment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private InvestmentType type;

    @Column(nullable = false, length = 10)
    private String symbol;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false, precision = 19, scale = 4)
    private BigDecimal purchasePrice;

    @Column(nullable = false)
    private LocalDate purchaseDate;
}
