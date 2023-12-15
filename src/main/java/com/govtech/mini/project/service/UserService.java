package com.govtech.mini.project.service;

import com.govtech.mini.project.model.LoginDto;
import com.govtech.mini.project.model.LoginMessage;
import com.govtech.mini.project.model.User;

public interface UserService {
    String addUser(User user);
    LoginMessage loginUser(LoginDto loginDto);
}
