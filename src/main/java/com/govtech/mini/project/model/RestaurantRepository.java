package com.govtech.mini.project.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    Restaurant findByName(String name);

    List<Restaurant> findAllByUserId(String id);
}
