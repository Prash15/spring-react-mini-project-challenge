package com.govtech.mini.project.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
//import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import com.govtech.mini.project.model.Restaurant;
import com.govtech.mini.project.model.RestaurantRepository;
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
class RestaurantController {

	private final Logger log = LoggerFactory.getLogger(RestaurantController.class);
	private RestaurantRepository restaurantRepository;
	private UserRepository userRepository;

	public RestaurantController(RestaurantRepository restaurantRepository, UserRepository userRepository) {
		this.restaurantRepository = restaurantRepository;
		this.userRepository = userRepository;
	}

	/*
	 * @GetMapping("/groups") Collection<Group> groups(Principal principal) { return
	 * groupRepository.findAllByUserId(principal.getName()); }
	 */

	@GetMapping("/restaurants")
	Collection<Restaurant> restaurants() {
		return restaurantRepository.findAll();
	}

	@GetMapping("/restaurant/{id}")
	ResponseEntity<?> getRestaurant(@PathVariable Long id) {
		Optional<Restaurant> restaurant = restaurantRepository.findById(id);
		return restaurant.map(response -> ResponseEntity.ok().body(response))
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}

	/*
	 * @PostMapping("/restaurant") ResponseEntity<Restaurant>
	 * createRestaurant(@Valid @RequestBody Restaurant restaurant,
	 * 
	 * @AuthenticationPrincipal OAuth2User principal) throws URISyntaxException {
	 * log.info("Request to create restaurant: {}", restaurant); Map<String, Object>
	 * details = principal.getAttributes(); String userId =
	 * details.get("sub").toString();
	 * 
	 * // check to see if user already exists Optional<User> user =
	 * userRepository.findById(userId);
	 * 
	 * restaurant.setUser(user.orElse(new User(userId,
	 * details.get("name").toString(), details.get("email").toString())));
	 * 
	 * restaurant.setUser(user.orElse(new User(userId,
	 * details.get("name").toString(), details.get("email").toString(),
	 * "password")));
	 * 
	 * Restaurant result = restaurantRepository.save(restaurant); return
	 * ResponseEntity.created(new URI("/api/restaurant/" + result.getId()))
	 * .body(result); }
	 */

	@PutMapping("/restaurant/{id}")
	ResponseEntity<Restaurant> updateRestaurant(@Valid @RequestBody Restaurant restaurant) {
		log.info("Request to update restaurant: {}", restaurant);
		Restaurant result = restaurantRepository.save(restaurant);
		return ResponseEntity.ok().body(result);
	}

	@DeleteMapping("/restaurant/{id}")
	public ResponseEntity<?> deleteRestaurant(@PathVariable Long id) {
		log.info("Request to delete restaurant: {}", id);
		restaurantRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
