package com.govtech.mini.project;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.govtech.mini.project.model.Restaurant;
import com.govtech.mini.project.model.RestaurantRepository;
import com.govtech.mini.project.model.Session;
import com.govtech.mini.project.model.SessionRepository;
import com.govtech.mini.project.model.User;
import com.govtech.mini.project.model.UserRepository;

import java.time.Instant;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Stream;

@Component
class Initializer implements CommandLineRunner {

    private final RestaurantRepository restaurantRepository;
    private final SessionRepository sessionRepository;
    private final UserRepository userRepository;

    public Initializer(RestaurantRepository restaurantRepository, SessionRepository sessionRepository,
    		UserRepository userRepository) {
        this.restaurantRepository = restaurantRepository;
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... strings) {
        Stream.of("Malay Cuisine", "Chinese Restaurant", "Indian Shop",
            "English Breakfast").forEach(name ->
            restaurantRepository.save(new Restaurant(name))
        );
        userRepository.save(new User("Peter","Alan","peter@gov.com","admin"));
        userRepository.save(new User("Jane","John","jane@gov.com","admin"));
        userRepository.save(new User("Sam","Richard","sam@gov.com","admin"));
        userRepository.save(new User("Maya","Dinesh","maya@gov.com","admin"));
        userRepository.save(new User("Farhan","Hasan","farhan@gov.com","admin"));
        
        Set<User> attendees = new HashSet<>();
        attendees.add(userRepository.findByEmail("jane@gov.com"));
        attendees.add(userRepository.findByEmail("maya@gov.com"));
        
        Set<User> attendeesNew = new HashSet<>();
        attendeesNew.add(userRepository.findByEmail("peter@gov.com"));
        attendeesNew.add(userRepository.findByEmail("sam@gov.com"));
        attendeesNew.add(userRepository.findByEmail("farhan@gov.com"));
        
        Restaurant mRest = restaurantRepository.findByName("Malay Cuisine");
        Session e = Session.builder().title("Malay Food Festival")
            .description("Delicious Malay Food!")
            .date(Instant.parse("2023-12-12T17:00:00.000Z")).attendees(attendeesNew)
            .build();
        mRest.setSessions(Collections.singleton(e));
        mRest.setAddress("Jurong East");
        restaurantRepository.save(mRest);
        
        Restaurant cRest = restaurantRepository.findByName("Chinese Restaurant");
        cRest.setAddress("Bedok Mall");
        cRest.setSessions(Collections.singleton(Session.builder().title("Chilli Crab")
            .description("Chinese Food!")
            .date(Instant.parse("2023-12-13T17:00:00.000Z")).attendees(attendees)
            .build()));
        restaurantRepository.save(cRest);
        
        Restaurant iRest = restaurantRepository.findByName("Indian Shop");
        iRest.setAddress("Tekka Centre");
        iRest.setSessions(Collections.singleton(Session.builder().title("Crispy Prata")
                .description("Indian Food!")
                .date(Instant.parse("2023-12-14T17:00:00.000Z")).attendees(attendeesNew)
                .build()));
        restaurantRepository.save(iRest);
        
        Restaurant eRest = restaurantRepository.findByName("English Breakfast");
        eRest.setAddress("Raffles Place");
        eRest.setSessions(Collections.singleton(Session.builder().title("Fish and Chips")
                .description("English Food!")
                .date(Instant.parse("2023-12-15T17:00:00.000Z")).attendees(attendees)
                .build()));
        restaurantRepository.save(eRest);


        restaurantRepository.findAll().forEach(System.out::println);
        //sessionRepository.findAll().forEach(System.out::println);
        userRepository.findAll().forEach(System.out::println);
    }
}
