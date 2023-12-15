package com.govtech.mini.project.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.govtech.mini.project.model.LoginDto;
import com.govtech.mini.project.model.LoginMessage;
import com.govtech.mini.project.model.User;
import com.govtech.mini.project.service.UserService;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

	private final Logger log = LoggerFactory.getLogger(UserController.class);
    
	@Autowired
	private UserService userService;  
    
    @PostMapping(path = "/save")
    public String saveUser(@RequestBody User user)
    {
        String id = userService.addUser(user);
        return id;
    }
    @PostMapping(path = "/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginDto loginDto)
    {
        LoginMessage loginResponse = userService.loginUser(loginDto);
        return ResponseEntity.ok(loginResponse);
    }
}
