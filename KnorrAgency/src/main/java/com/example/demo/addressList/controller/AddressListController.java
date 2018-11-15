package com.example.demo.addressList.controller;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.addressList.service.IAddressListService;
import com.example.demo.employee.domain.Employee;
import com.example.demo.employee.domain.EmployeeDTO;
import com.example.demo.employee.domain.EmployeeQueryDTO;
import com.example.demo.employee.service.EmployeeService;
import com.example.demo.employee.service.IEmployeeService;
import com.example.demo.employee.util.ExtjsPageRequest;
import com.example.demo.log.config.SystemControllerLog;

@RestController
@RequestMapping("/addressList")
public class AddressListController {
	
	@Autowired
	IAddressListService addressListService;
	@Autowired
	IEmployeeService employeeService;
	private static final Logger log = LoggerFactory.getLogger(AddressListController.class);
	@GetMapping
	@SystemControllerLog(description="查看通讯录")
	public Page<EmployeeDTO> getAddressList(EmployeeQueryDTO employeeQueryDTO,
			HttpSession session,ExtjsPageRequest pageable){
		String number=(String) session.getAttribute("employeeNumber");
		if(number!=null) {
			return addressListService.addressListFindAll(EmployeeQueryDTO.getWhereClause(employeeQueryDTO), pageable.getPageable(), number);
		}
		return null;
	}
	@RequestMapping("/upStatus")
	@SystemControllerLog(description="在线")
	public void changeStatus1(@RequestParam(name="userId") Long userId) {
		if(userId!=null) {
		   Employee employeeTmp=employeeService.findById(userId).get();
		   employeeTmp.setStatus("在线");
		   employeeService.save(employeeTmp);		  
		}
	}
	@RequestMapping("/downStatus")
	@SystemControllerLog(description="离线")
	public void changeStatus2(@RequestParam(name="userId") Long userId) {
		if(userId!=null) {
			 Employee employeeTmp=employeeService.findById(userId).get();
			 employeeTmp.setStatus("离线");
			 employeeService.save(employeeTmp);

		}
	}
}
