package com.example.demo.addressList.service;

import java.util.ArrayList;
import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.example.demo.employee.domain.Employee;
import com.example.demo.employee.domain.EmployeeDTO;
import com.example.demo.employee.repository.EmployeeRepository;
import com.example.demo.employee.util.BeanUtils;

@Service
@Transactional
public class AddressListService implements IAddressListService{
	
	@Autowired
	EmployeeRepository employeeRepository;

	public Page<EmployeeDTO> addressListFindAll(Specification<Employee> spec, Pageable pageable,String number){
		Page<Employee> list=employeeRepository.findAll(spec,pageable);
		List<EmployeeDTO> dtoList=new ArrayList<EmployeeDTO>();
		for(Employee entity:list.getContent()) {
			if(!entity.getEmployeeNumber().equals(number)) {
				System.out.println(entity);
	
			   EmployeeDTO dto=new EmployeeDTO();
			   if(entity.getLocalStore()!=null) {
				   BeanUtils.copyProperties(entity.getLocalStore(), dto);
			   }
			   BeanUtils.copyProperties(entity,dto);
			   dtoList.add(dto);
			}
		}
		return new PageImpl<EmployeeDTO>(dtoList, pageable, list.getTotalElements()-1);
	
		
	}
	
}
