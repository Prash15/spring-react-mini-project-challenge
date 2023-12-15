package com.govtech.mini.project.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class LoginMessage {

	private String message;
	private Boolean status;
	
	public LoginMessage(String string, boolean b) {
		// TODO Auto-generated constructor stub
        this.message = message;
        this.status = status;
	}
	

}
