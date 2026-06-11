package br.com.uninassau.LEI.ConectaPraia.repositories;

import br.com.uninassau.LEI.ConectaPraia.domain.ReviewEntrepreneur;
import br.com.uninassau.LEI.ConectaPraia.domain.ReviewProvider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ReviewEntrepreneurRepository extends BaseReviewRepository<ReviewEntrepreneur> {
    List<ReviewEntrepreneur> findByEntrepreneurId(UUID entrepreneurId);
}
