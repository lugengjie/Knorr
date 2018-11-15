package com.example.demo.notice.service;


import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.example.demo.notice.entity.Notice;
import com.example.demo.notice.repository.NoticeRepository;
@Service
@Transactional
public class NoticeService implements INoticeService {
	
	@Autowired
	NoticeRepository noticeRepository;
	@Override
	public void save(Notice notice) {
	   noticeRepository.save(notice);
	}

	@Override
	public Page<Notice> findAll(Specification<Notice> spec, Pageable pageable) {
	  return noticeRepository.findAll(spec, pageable);
	}
	

}
