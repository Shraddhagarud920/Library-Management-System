package com.example.book.filter;

import com.example.book.service.JwtService;
import com.example.book.service.MyUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final MyUserDetailsService userDetailsService;

    public JwtAuthFilter(JwtService jwtService, MyUserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // ✅ Skip login/register APIs
        String path = request.getServletPath();
        if (path.startsWith("/api/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        // ✅ Get Authorization header
        String authHeader = request.getHeader("Authorization");

        String token = null;
        String username = null;

        // ✅ Extract token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);

            try {
                username = jwtService.extractUsername(token);
            } catch (Exception e) {
                System.out.println("Error extracting username from token");
            }
        }

        // ✅ Validate token and set authentication
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            System.out.println("TOKEN: " + token);
            System.out.println("USERNAME FROM TOKEN: " + username);

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            System.out.println("USERNAME FROM DB: " + userDetails.getUsername());

            boolean isValid = jwtService.validateToken(token, userDetails);
            System.out.println("IS TOKEN VALID: " + isValid);

            if (isValid) {

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(authToken);

                System.out.println("✅ Authentication set successfully");
            } else {
                System.out.println("❌ Token validation failed");
            }
        }

        // ✅ Continue filter chain
        filterChain.doFilter(request, response);
    }
}