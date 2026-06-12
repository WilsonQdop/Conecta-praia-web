package br.com.uninassau.LEI.ConectaPraia.repositories;

import br.com.uninassau.LEI.ConectaPraia.domain.Entrepreneur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface EntrepreneurRepository extends JpaRepository<Entrepreneur, UUID> {


}
