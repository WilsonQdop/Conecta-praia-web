package br.com.uninassau.LEI.ConectaPraia.utils;

import br.com.uninassau.LEI.ConectaPraia.domain.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
public class AuthUtil {

    public User getUserLoggedIn() {
        return (User) Objects.requireNonNull(SecurityContextHolder.getContext()
                        .getAuthentication())
                .getPrincipal();
    }
}
