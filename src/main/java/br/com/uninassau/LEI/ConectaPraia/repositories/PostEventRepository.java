package br.com.uninassau.LEI.ConectaPraia.repositories;

import br.com.uninassau.LEI.ConectaPraia.domain.PostsEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PostEventRepository extends JpaRepository<PostsEvent, UUID> {
}
