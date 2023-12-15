package com.govtech.mini.project.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SessionRepository extends JpaRepository<Session, Long> {
	Session findByTitle(String title);

    //List<Session> findAllByUserId(String id);
}
