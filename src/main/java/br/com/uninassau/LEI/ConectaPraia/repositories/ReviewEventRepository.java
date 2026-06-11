package br.com.uninassau.LEI.ConectaPraia.repositories;

import br.com.uninassau.LEI.ConectaPraia.domain.ReviewEvent;
import br.com.uninassau.LEI.ConectaPraia.domain.ReviewServices;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ReviewEventRepository extends BaseReviewRepository<ReviewEvent> {
    List<ReviewEvent> findByPostsEventId(UUID postsEventId);
}
