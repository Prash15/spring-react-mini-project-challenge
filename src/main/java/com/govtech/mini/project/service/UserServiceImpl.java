package com.govtech.mini.project.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.govtech.mini.project.model.LoginDto;
import com.govtech.mini.project.model.LoginMessage;
import com.govtech.mini.project.model.User;
import com.govtech.mini.project.model.UserRepository;

@Service
public class UserServiceImpl implements UserService {


    @Autowired
    private UserRepository userRepository;
    
	/*
	 * @Autowired private PasswordEncoder passwordEncoder;
	 */
	
	@Override
	public String addUser(User user) {
		// TODO Auto-generated method stub
		User newUser = new User(
                user.getId(),
                user.getName(),
                user.getEmail(),
               //this.passwordEncoder.encode(user.getPassword())
               user.getPassword()
        );
		userRepository.save(newUser);
        return newUser.getName();
	}

	@Override
	public LoginMessage loginUser(LoginDto loginDto) {
		// TODO Auto-generated method stub
		String msg = "";
        User loggedinUser = userRepository.findByEmail(loginDto.getEmail());
        if (loggedinUser != null) {
            String password = loginDto.getPassword();
            String encodedPassword = loggedinUser.getPassword();
            //Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            Boolean isPwdRight = true;
            if (isPwdRight) {
                Optional<User> user = userRepository.findOneByEmailAndPassword(loginDto.getEmail(), encodedPassword);
                if (user.isPresent()) {
                    return new LoginMessage("Login Success", true);
                } else {
                    return new LoginMessage("Login Failed", false);
                }
            } else {
                return new LoginMessage("password Not Match", false);
            }
        }else {
            return new LoginMessage("Email not exits", false);
        }
	}

}
