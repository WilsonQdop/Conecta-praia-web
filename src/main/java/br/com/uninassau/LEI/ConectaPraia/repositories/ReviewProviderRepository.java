package br.com.uninassau.LEI.ConectaPraia.repositories;

import br.com.uninassau.LEI.ConectaPraia.domain.ReviewProvider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ReviewProviderRepository extends BaseReviewRepository<ReviewProvider> {
    List<ReviewProvider> findByServiceProviderId(UUID serviceProviderId);
}
