package com.example.demo;

import java.io.FileNotFoundException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;

import com.example.demo.email.entity.Email;
import com.example.demo.email.entity.EmailStatus;
import com.example.demo.email.service.IEmailService;
import com.example.demo.employee.domain.Employee;
import com.example.demo.employee.service.IEmployeeService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EmailTest {
	
	@Autowired
	private IEmailService emailService;
	
	@Autowired
	private IEmployeeService employeeService;
	
	@Test
	public void save() {
//		Employee e=employeeService.findById(4L).get();
//		for (int i = 0; i < 2; i++) {
//			Email email=new Email();
//			email.setEmailFrom("@163.com"+i);
//			email.setEmailStatus(EmailStatus.SEND);
//			email.setSendTime(new Date());
//			email.setEmployee(e);
//			emailService.save(email);
//		}
	}
	
}
