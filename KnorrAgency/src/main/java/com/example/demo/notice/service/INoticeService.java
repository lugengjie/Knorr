package com.example.demo.notice.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.example.demo.notice.entity.Notice;

public interface INoticeService {
	public void save(Notice notice);
	public Page<Notice> findAll(Specification<Notice> spec,Pageable pageable);
}
