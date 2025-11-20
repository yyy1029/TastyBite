package com.example.onlinefood.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

public class JwtTokenValidator extends OncePerRequestFilter {


    @Override//set a custom filter jwt=json web token
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        //get the Authorization field in the request header
        String jwt= request.getHeader(JwtConstant.JWT_HEADER);
        
       //Bearer token 
       //This is the format of a jwt token. Cut off the first seven bits to get the valid part of the token.
       // Once you have the token, determine if it conforms to the format.
        if(jwt!=null) {
            jwt = jwt.substring(7);

            // parsing jwt tokens
            try {

                //Create an HMAC type key (symmetric encryption key) and use it to parse the JWT token
                SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

                //stored in claims after successful parsing
                Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

                // Get email and authorities from the parsed token, i.e. username and role
                //These are added when the token is generated
                String email = String.valueOf(claims.get("email"));

                // Here you get the roles that can be accessed ROLE_CUSTOMER or ROLE_MANAGER
                String authorities = String.valueOf((claims.get("authorities")));

                // Convert the role information into a list of permissions that Spring Security can recognise.
                //Here the string MANAGER is converted to a verifiable role String ---> GrantedAuthority
                List<GrantedAuthority> auth = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

                // email password role
                // Build a UsernamePasswordAuthenticationToken object to represent the user's authentication information.
                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auth);


                // Set the constructed Authentication object into the context of Spring Security
                // So that subsequent authentication and authorisation processes can use that authentication information
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception e) {
                throw new BadCredentialsException("Invalid Token");
            }

        }

        filterChain.doFilter(request,response);

    }

}
