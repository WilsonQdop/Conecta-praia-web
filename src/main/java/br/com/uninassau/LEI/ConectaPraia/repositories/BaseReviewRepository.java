package br.com.uninassau.LEI.ConectaPraia.repositories;

import br.com.uninassau.LEI.ConectaPraia.domain.BaseReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;
import java.util.UUID;

@NoRepositoryBean
public interface BaseReviewRepository<T extends BaseReview> extends JpaRepository<T, UUID> {
    // Aqui você pode colocar métodos que funcionam para todas as avaliações
    List<T> findByTouristId(UUID touristId);
}
