package com.example.demo.email.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.email.entity.Email;
import com.example.demo.employee.domain.Employee;

@Repository
public interface EmailRepository extends PagingAndSortingRepository<Email, Long>,JpaSpecificationExecutor<Email>{

	@Query("from Email e where e.employee = ?1")
	public List<Email> findByEmployee(Employee employee);
	
}
