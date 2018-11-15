package com.example.demo.addressList.service;

import javax.servlet.http.HttpSession;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.example.demo.employee.domain.Employee;
import com.example.demo.employee.domain.EmployeeDTO;

public interface IAddressListService {
	
	public Page<EmployeeDTO> addressListFindAll(Specification<Employee> spec, Pageable pageable,String number);
	
}
