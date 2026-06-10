package br.com.uninassau.LEI.ConectaPraia.service.auth;

import br.com.uninassau.LEI.ConectaPraia.domain.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${api.security.token.secret:fallback-secret-key-123}")
    private String keySecret;

    public String generateToken(User user) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(keySecret);

            return JWT.create()
                    .withIssuer("ConectaPraia")
                    .withSubject(user.getEmail())
                    .withExpiresAt(this.GenerateExpirationDate())
                    .sign(algorithm);

        } catch (JWTCreationException j) {
            throw new RuntimeException(j);
        }
    }

    public String validateToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(keySecret);
            return JWT.require(algorithm)
                    .withIssuer("ConectaPraia")
                    .build()
                    .verify(token)
                    .getSubject();

        } catch (JWTVerificationException c) {
            return null; // Depois, posso fazer uma validão para autenticação inválida (Se num for implementada em outro lugar)
        }
    }
    private Instant GenerateExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
    }
}
