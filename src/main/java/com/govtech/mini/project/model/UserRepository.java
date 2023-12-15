package com.govtech.mini.project.model;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
	
	User findByEmail(String email);
	
	Optional<User> findOneByEmailAndPassword(String email, String password);
}
