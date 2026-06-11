package br.com.uninassau.LEI.ConectaPraia.repositories;

import br.com.uninassau.LEI.ConectaPraia.domain.Registered;
import br.com.uninassau.LEI.ConectaPraia.domain.Tourist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RegisteredRepository extends JpaRepository<Registered, UUID> {

    // Busca apenas os registros que SÃO DE EVENTOS (postEvent não é nulo)
    List<Registered> findByTouristAndPostEventIsNotNullOrderByRegisteredAtDesc(Tourist tourist);

    // Busca apenas os registros que SÃO DE SERVIÇOS (postService não é nulo)
    List<Registered> findByTouristAndPostServiceIsNotNullOrderByRegisteredAtDesc(Tourist tourist);

    // (Opcional) Se precisar listar de forma global para um Admin
    List<Registered> findByPostEventIsNotNullOrderByRegisteredAtDesc();
    List<Registered> findByPostServiceIsNotNullOrderByRegisteredAtDesc();
}
