package br.com.uninassau.LEI.ConectaPraia.repositories;

import br.com.uninassau.LEI.ConectaPraia.domain.PostsService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PostServiceRepository extends JpaRepository<PostsService, UUID> {
}
