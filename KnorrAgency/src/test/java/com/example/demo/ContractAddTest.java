package com.example.demo;

import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.demo.activiti.entity.ProcessStatus;
import com.example.demo.contract.entity.Contract;
import com.example.demo.contract.service.IContractService;
import com.example.demo.contract.util.ContractUtil;
import com.example.demo.employee.domain.Employee;
import com.example.demo.employee.service.EmployeeService;
import com.example.demo.employee.service.IEmployeeService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ContractAddTest {
	@Autowired
	IContractService contractService;
	@Autowired
	IEmployeeService employeeService;
	@Test
	public void addData() throws ParseException {
		/*Employee employee=employeeService.findById(14L).get();*/
		SimpleDateFormat dateTmp = new SimpleDateFormat("yyyy-MM-dd");
		for(int i=1;i<=12;i++) {
			Contract contract=new Contract();
			String contractNumber=ContractUtil.getContractNumber("出售合同");
			contract.setContractNumber(contractNumber);
			contract.setContractType("出售合同");
			contract.setCustomerName("小明");
			/*contract.setEmployee(employee);*/
			contract.setStartTime(dateTmp.parse("2018-"+i+"-08"));
			contract.setEndTime(dateTmp.parse("2020-09-08"));
			contract.setHouseName("东方巴黎");
			contract.setTotal((int)(1+Math.random()*(24-1+1)));
			contract.setProcessStatus(ProcessStatus.NEW);
			contractService.save(contract);
		}
	}
	

}
