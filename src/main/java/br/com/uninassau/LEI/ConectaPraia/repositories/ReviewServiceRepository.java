package br.com.uninassau.LEI.ConectaPraia.repositories;

import br.com.uninassau.LEI.ConectaPraia.domain.PostsService;
import br.com.uninassau.LEI.ConectaPraia.domain.ReviewServices;
import br.com.uninassau.LEI.ConectaPraia.service.ReviewService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ReviewServiceRepository extends BaseReviewRepository<ReviewServices> {
    List<ReviewService> findByPostsServiceId(UUID postsServiceId);
}
