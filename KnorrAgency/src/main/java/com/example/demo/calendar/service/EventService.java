package com.example.demo.calendar.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.example.demo.calendar.entity.Event;
import com.example.demo.calendar.repository.EventRepository;

@Service
@Transactional
public class EventService implements IEventService {
	
	@Autowired
	private EventRepository eventRepository;

	@Override
	public void save(Event event) {
		eventRepository.save(event);
	}

	@Override
	public void deleteById(Long id) {
		eventRepository.deleteById(id);
	}

	@Override
	public void deleteAll(Long[] ids) {
		
		List<Long> idLists = new ArrayList<Long>(Arrays.asList(ids));
		
		List<Event> eventLists=(List<Event>) eventRepository.findAllById(idLists);
		
		if(eventLists!=null) {
			eventRepository.deleteAll(eventLists);
		}
	}

	@Override
	public Optional<Event> findById(Long id) {
		return eventRepository.findById(id);
	}

	@Override
	public Page<Event> findAll(Specification<Event> spec, Pageable pageable) {
		return eventRepository.findAll(spec, pageable);
	}

	@Override
	public List<Event> findAll() {
		return (List<Event>) eventRepository.findAll();
	}

}
