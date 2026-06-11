package br.com.uninassau.LEI.ConectaPraia.repositories;

import br.com.uninassau.LEI.ConectaPraia.domain.ServiceProvider;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ServiceProviderRepository extends JpaRepository<ServiceProvider, UUID> {
}
