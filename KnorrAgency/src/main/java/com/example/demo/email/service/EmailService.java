package com.example.demo.email.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.email.entity.Email;
import com.example.demo.email.entity.EmailDTO;
import com.example.demo.email.repository.EmailRepository;

@Service
@Transactional
public class EmailService implements IEmailService {
	
	@Autowired
	private EmailRepository emailRepository;

	@Override
	public void save(Email email) {
		emailRepository.save(email);
	}

	@Override
	public void delete(Long id) {
		emailRepository.deleteById(id);
	}

	@Override
	public void deleteAll(Long[] ids) {
		List<Long> idLists = new ArrayList<Long>(Arrays.asList(ids));
		
		List<Email> emails = (List<Email>) emailRepository.findAllById(idLists);
		if(emails!=null) {
			for(Email email:emails) {
				email.setEmployee(null);
				emailRepository.delete(email);
			}
			
		}
	}

	@Override
	public Email findOne(Long id) {
		return emailRepository.findById(id).get();
	}

	@Override
	public Page<EmailDTO> findAll(Specification<Email> spec, Pageable pageable) {
		Page<Email> list =  emailRepository.findAll(spec, pageable);
		List<EmailDTO> dtoLists = new ArrayList<EmailDTO>();
		for (Email entity : list.getContent()) {
			EmailDTO dto = new EmailDTO();
			BeanUtils.copyProperties(entity, dto);
			dto.setSendDay(entity.getSendTime());
			if(entity.getEmployee()!=null) {
				dto.setEmployeeName(entity.getEmployee().getEmployeeName());
				
			}
			dtoLists.add(dto);
		}
		return new PageImpl<EmailDTO>(dtoLists, pageable, list.getTotalElements());
	}

}
