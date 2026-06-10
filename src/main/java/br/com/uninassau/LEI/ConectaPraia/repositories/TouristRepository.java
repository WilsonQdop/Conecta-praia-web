package br.com.uninassau.LEI.ConectaPraia.repositories;

import br.com.uninassau.LEI.ConectaPraia.domain.Tourist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TouristRepository extends JpaRepository<Tourist, UUID> {
}
