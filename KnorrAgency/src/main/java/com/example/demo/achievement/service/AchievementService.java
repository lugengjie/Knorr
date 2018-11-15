package com.example.demo.achievement.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.achievement.entity.AchievementDTO;
import com.example.demo.achievement.repository.AchievementrRepository;
import com.example.demo.common.beans.BeanUtils;
import com.example.demo.employee.domain.Employee;


@Service
@Transactional
public class AchievementService implements IAchievementService{
	@Autowired
	private AchievementrRepository achievementrRepository;
	 public List<AchievementDTO> getSumByStoreNameAndMonth(String storeName,String month){
		 List<String> monthList = new ArrayList<String>(Arrays.asList("一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"));
		 int monthIndex=monthList.indexOf(month)+1;
		 List<Object> employeeList=achievementrRepository.getEmployeeByStoreNameAndMonth(storeName, monthIndex);
		 List<Object> sumList=achievementrRepository.getSumByStoreNameAndMonth(storeName,monthIndex);
		 List<AchievementDTO> achievementDTOs=new ArrayList<AchievementDTO>();
		 for(int i=0;i<employeeList.size();i++) {
			 AchievementDTO dtoTmp=new AchievementDTO();
			 BeanUtils.copyProperties((Employee)employeeList.get(i),dtoTmp);
			 dtoTmp.setTotal((double)sumList.get(i));
			 achievementDTOs.add(dtoTmp);
		 }
		 return achievementDTOs;
	 }
	
}
