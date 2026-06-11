package br.com.uninassau.LEI.ConectaPraia.infra.config;

import br.com.uninassau.LEI.ConectaPraia.domain.Admin;
import br.com.uninassau.LEI.ConectaPraia.domain.enums.Role;
import br.com.uninassau.LEI.ConectaPraia.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminSeeder implements CommandLineRunner {

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;

        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {

        if (userRepository.existsByEmail(adminEmail)) return;
        Admin admin = new Admin();
        admin.setName("WilsonAdmin");
        admin.setEmail(adminEmail);
        admin.setPassword(adminPassword);
        admin.setRole(Role.ADMIN);

        admin.setPassword(passwordEncoder.encode(adminPassword));

        userRepository.save(admin);
        System.out.println("(LOG) ADMIN CRIADA");
    }
}
