package com.example.demo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.demo.attence.entity.Attence;
import com.example.demo.attence.service.IAttenceService;
import com.example.demo.contract.util.ContractUtil;

@RunWith(SpringRunner.class)
@SpringBootTest
public class attenceTest {
	
	@Autowired
	private IAttenceService attenceService;
	
	@Test
	public void test() {
		List<Attence> attenceList=new ArrayList<Attence>();
		Date dmonth=ContractUtil.toDate("一月");
		attenceList=attenceService.findByMonth(dmonth, "admin");
		System.out.println(attenceList);
	}

}
