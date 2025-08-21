package br.edu.ufop.web.investmentportfolio.repositories;

import br.edu.ufop.web.investmentportfolio.enums.InvestmentType;
import br.edu.ufop.web.investmentportfolio.models.Investment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Interface de repositório para a entidade Investment.
 */
@Repository
public interface InvestmentRepository extends JpaRepository<Investment, Long> {

    List<Investment> findByType(InvestmentType type);
}
