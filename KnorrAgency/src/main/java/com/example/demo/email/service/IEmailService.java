package com.example.demo.email.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.example.demo.email.entity.Email;
import com.example.demo.email.entity.EmailDTO;

public interface IEmailService {
	
	public void save(Email email);
	
	public void delete(Long id);
	
	public void deleteAll(Long[] ids);
	
	public Email findOne(Long id);
	
	public Page<EmailDTO> findAll(Specification<Email> spec, Pageable pageable);
}
