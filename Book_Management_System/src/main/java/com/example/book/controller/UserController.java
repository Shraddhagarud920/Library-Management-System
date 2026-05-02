package com.example.book.controller;

import com.example.book.dto.AuthRequest;
import com.example.book.model.User;
import com.example.book.repository.UserRepository;
import com.example.book.service.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Connects to your React frontend
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // Using Constructor Injection (Best for Job Interviews!)
    public UserController(UserRepository userRepository, 
                          PasswordEncoder passwordEncoder, 
                          JwtService jwtService, 
                          AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        // 1. Hash the password so it's not plain text in the DB
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // 2. Save the user to MySQL
        userRepository.save(user);
        
        return "User Registered Successfully!";
    }

    @PostMapping("/login")
    public String login(@RequestBody AuthRequest authRequest) {
        // 1. Ask AuthenticationManager to verify the username and password
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    authRequest.getUserName(), 
                    authRequest.getPassword()
                )
        );

        // 2. If the user is valid, generate a JWT Token
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(authRequest.getUserName());
        } else {
            return "Login Failed: Invalid Credentials";
        }
    }
}