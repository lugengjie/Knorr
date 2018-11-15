package com.example.demo.employee.service;

import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.example.demo.employee.domain.Employee;
import com.example.demo.employee.domain.EmployeeDTO;
import com.example.demo.employee.util.ExtAjaxResponse;

public interface IEmployeeService {
	
	public Employee save(Employee entity);
	public Optional<Employee> findById(Long id);
	public boolean existsById(Long id);
	public long count();
	//public Page<Employee> findAll(Specification<Employee> spec, Pageable pageable);
	//public Employee update(Employee entity);
	public Page<EmployeeDTO> findAll(Specification<Employee> spec, Pageable pageable, HttpSession session);
	public void deleteAll(Long[] ids);
	public ExtAjaxResponse saveEmployee(EmployeeDTO employeeDTO);
	public ExtAjaxResponse updateById(Long id,EmployeeDTO employeeDTO);
	public ExtAjaxResponse deleteById(Long id,HttpSession session);
	public boolean checkPassword(String employeeNumber, String password);
	public Employee EmployeeNumber(String employeeNumber);
	public Employee EmployeeName(String employeeName);
	public Employee findByStoreNameandPost(String storeName,String post);
}
