package br.edu.ufop.web.investmentportfolio.repositories;

import br.edu.ufop.web.investmentportfolio.enums.InvestmentType;
import br.edu.ufop.web.investmentportfolio.models.Investment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InvestmentRepository extends JpaRepository<Investment, Integer> { // Alterado de Long para Integer

    List<Investment> findByType(InvestmentType type);
}