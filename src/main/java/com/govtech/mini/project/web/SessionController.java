package com.govtech.mini.project.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import com.govtech.mini.project.model.Session;
import com.govtech.mini.project.model.SessionRepository;
import com.govtech.mini.project.model.User;
import com.govtech.mini.project.model.UserRepository;

import jakarta.validation.Valid;

import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
class SessionController {

	private final Logger log = LoggerFactory.getLogger(SessionController.class);
	private SessionRepository sessionRepository;
	private UserRepository userRepository;

	public SessionController(SessionRepository sessionRepository, UserRepository userRepository) {
		this.sessionRepository = sessionRepository;
		this.userRepository = userRepository;
	}

	/*
	 * @GetMapping("/groups") Collection<Group> groups(Principal principal) { return
	 * groupRepository.findAllByUserId(principal.getName()); }
	 */

	@GetMapping("/sessions")
	Collection<Session> sessions() {
		return sessionRepository.findAll();
	}

	@GetMapping("/session/{id}")
	ResponseEntity<?> getSession(@PathVariable Long id) {
		Optional<Session> session = sessionRepository.findById(id);
		return session.map(response -> ResponseEntity.ok().body(response))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	/*
	 * @PostMapping("/session") ResponseEntity<Session>
	 * createSession(@Valid @RequestBody Session session,
	 * 
	 * @AuthenticationPrincipal OAuth2User principal) throws URISyntaxException {
	 * log.info("Request to create session: {}", session); Map<String, Object>
	 * details = principal.getAttributes(); String userId =
	 * details.get("sub").toString();
	 * 
	 * // check to see if user already exists Optional<User> user =
	 * userRepository.findById(userId);
	 * 
	 * session.setAttendees(user.orElse(new User(userId,
	 * details.get("name").toString(), details.get("email").toString())));
	 * 
	 * 
	 * Session result = sessionRepository.save(session); return
	 * ResponseEntity.created(new URI("/api/session/" + result.getId()))
	 * .body(result); }
	 */

	@PutMapping("/session/{id}")
	ResponseEntity<Session> updateSession(@Valid @RequestBody Session session) {
		log.info("Request to update session: {}", session);
		Session result = sessionRepository.save(session);
		return ResponseEntity.ok().body(result);
	}

	@DeleteMapping("/session/{id}")
	public ResponseEntity<?> deleteSession(@PathVariable Long id) {
		log.info("Request to delete session: {}", id);
		sessionRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
