package br.com.uninassau.LEI.ConectaPraia.repositories;

import br.com.uninassau.LEI.ConectaPraia.domain.Entrepreneur;
import br.com.uninassau.LEI.ConectaPraia.domain.PostsEvent;
import br.com.uninassau.LEI.ConectaPraia.domain.Tourist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface PostEventRepository extends JpaRepository<PostsEvent, UUID> {

    List<PostsEvent> findAllByEntrepreneurOrderByCreatedAtDesc(Entrepreneur entrepreneur);

    @Query("SELECT p FROM PostsEvent p ORDER BY p.createdAt DESC")
    List<PostsEvent> findAllOrderByCreatedAtDesc();

}
