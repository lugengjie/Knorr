package com.example.demo.employee.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.employee.domain.Employee;


@Repository
public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long>,JpaSpecificationExecutor<Employee>{
	
	@Query("from Employee e where e.employeeNumber = ?1")
	public Employee findByEmployeeNumber(String employeeNumber);
	
	@Query("from Employee e where e.employeeNumber = ?1 and e.password = ?2")
	public Employee checkPassword(String employeeNumber,String password);
	
	@Query("from Employee e where e.employeeName = ?1")
	public Employee findByEmployeeName(String employeeName);

	@Query("from Employee e where e.localStore.storeName = ?1 and e.post = ?2")
	public Employee findByStoreNameandPost(String storeName,String post);


}
