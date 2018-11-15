package com.example.demo.calendar.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.calendar.entity.Event;

@Repository
public interface EventRepository extends PagingAndSortingRepository<Event, Long>,JpaSpecificationExecutor<Event>{

}
