package com.example.demo.calendar.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.example.demo.calendar.entity.Event;

public interface IEventService {
	
    public void save(Event event);
	
	public void deleteById(Long id);
	
	public void deleteAll(Long[] ids);
	
	public Optional<Event> findById(Long id);
	
	public List<Event> findAll();
	
	public Page<Event> findAll(Specification<Event> spec, Pageable pageable);

}
