package com.example.demo.notice.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.notice.entity.Notice;

@Repository
public interface NoticeRepository extends PagingAndSortingRepository<Notice, Long>,JpaSpecificationExecutor<Notice> {

}
