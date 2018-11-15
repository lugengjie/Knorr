package com.example.demo.log.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.log.entity.Log;

@Repository
public interface LogRepository extends PagingAndSortingRepository<Log, Long>,JpaSpecificationExecutor<Log>{

}
