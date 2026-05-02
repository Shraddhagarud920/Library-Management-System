package com.example.book.dto;

public class AuthRequest {
    private String userName;
    private String password;

    // Default Constructor (Required by Spring)
    public AuthRequest() {
    	
    }

    // Constructor with fields
    public AuthRequest(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    // Getters and Setters (Use Right-Click -> Source -> Generate)
    public String getUserName() { 
    	return userName; 
    }
    public void setUserName(String userName) {
    	this.userName = userName;
    }
    public String getPassword() {
    	return password;
    }
    public void setPassword(String password) { 
    	this.password = password; 
    }
}
