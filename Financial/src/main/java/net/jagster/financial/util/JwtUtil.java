package net.jagster.financial.util;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

public class JwtUtil {

    public static Jwt getJwt() {
        return (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public static String getSubject() {
        return ((Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getSubject();
    }
}
