package br.com.uninassau.LEI.ConectaPraia.repositories;

import br.com.uninassau.LEI.ConectaPraia.domain.Entrepreneur;
import br.com.uninassau.LEI.ConectaPraia.domain.PostsService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface PostServiceRepository extends JpaRepository<PostsService, UUID> {
    List<PostsService> findAllByEntrepreneurOrderByCreatedAtDesc(Entrepreneur entrepreneur);

    @Query("SELECT p FROM PostsService p ORDER BY p.createdAt DESC")
    List<PostsService> findAllOrderByCreatedAtDesc();

    @Query("SELECT p FROM PostsService p WHERE LOWER(p.location) LIKE LOWER(CONCAT('%', :location, '%')) ORDER BY p.createdAt DESC")
    List<PostsService> findByLocationContainingIgnoreCaseOrderByCreatedAtDesc(@Param("location") String location);
}
