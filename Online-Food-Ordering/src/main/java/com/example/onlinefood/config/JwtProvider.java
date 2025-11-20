package com.example.onlinefood.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;

@Service
public class JwtProvider {

    // An HMAC key is generated for JWT signature authentication
    private SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

    // Generate a JWT token based on authentication information
    public String generateToken(Authentication auth){

        Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();

        // Converts the GrantedAuthority object to a ", "delimited string
        String roles = populateAuthorities(authorities);

        // Generate a jwt token with the following information
        String jwt = Jwts.builder().setIssuedAt(new Date())//Issue time
                .setExpiration((new Date((new Date().getTime()+8640000))))//Expiry time 24h
                .claim("email", auth.getName())//user name
                .claim("authorities",roles)//user role
                .signWith(key) // Use the key to sign the jwt token
                .compact(); // Generate the final jwt string

        return jwt;
    }


    // Get the user's permission information from the Authentication object and convert it to a comma-separated string
    private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
        Set<String> auths = new HashSet<>();

        // Take out GrantedAuthority and turn it into a string separated by "," because jwt is ultimately a token of type string
        for(GrantedAuthority authority: authorities){
            auths.add(authority.getAuthority());
        }

        return String.join(",",auths);
    }


    public String getEmailFromJwtToken(String jwt){
        jwt = jwt.substring(7);
        Claims claims = Jwts.parserBuilder().
                setSigningKey(key).
                build().
                parseClaimsJws(jwt).
                getBody();

            return String.valueOf(claims.get("email"));
    }

}
