package com.example.demo.achievement.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;


import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.achievement.entity.AchievementDTO;
import com.example.demo.achievement.entity.AnalyseResponseDTO;
import com.example.demo.achievement.entity.RequestDTO;
import com.example.demo.achievement.entity.SortResponseDTO;
import com.example.demo.achievement.service.IAchievementService;
import com.example.demo.common.beans.BeanUtils;
import com.example.demo.log.config.SystemControllerLog;
import com.example.demo.store.domain.StoreName;
import com.example.demo.store.service.IStoreService;

@RestController
@RequestMapping("/achievement")
public class AchievementController {
	@Autowired
	private IAchievementService achievementService;
	@Autowired
	private IStoreService storeService;
	
	@SystemControllerLog(description="查询销售员月销售额")
    @GetMapping
	public List<AchievementDTO> findByMonthAndArea(RequestDTO requestDTO) {
		if(requestDTO.getArea()==null||requestDTO.getMonth()==null) {
			List<StoreName> storeNames=storeService.findAllStoreName();
			if(!storeNames.isEmpty()) {
			   requestDTO.setMonth("一月");
			   requestDTO.setArea(storeNames.get(0).getStoreName());
			}else {
				return null;
			}
		}
        return  achievementService.getSumByStoreNameAndMonth(requestDTO.getArea(),requestDTO.getMonth());	
	}
	
	@SystemControllerLog(description="findAllStore")
	@GetMapping("/findAllStore")
	public List<StoreName> findAllStore() {
		return storeService.findAllStoreName();
	}
	
	@SystemControllerLog(description="数据分析")
	@GetMapping("/analyse")
	public List<AnalyseResponseDTO> dataAnalyse(RequestDTO requestDTO) {
		if(requestDTO.getArea()==null||requestDTO.getMonth()==null) {
			List<StoreName> storeNames=storeService.findAllStoreName();
			if(!storeNames.isEmpty()) {
				   requestDTO.setMonth("一月");
				   requestDTO.setArea(storeNames.get(0).getStoreName());
				}else{
				   return null;
			}
		}
		List<AnalyseResponseDTO> listTmp=new ArrayList<AnalyseResponseDTO>();
		AnalyseResponseDTO dto=new AnalyseResponseDTO();
		
		List<AchievementDTO> tmps=achievementService.getSumByStoreNameAndMonth(requestDTO.getArea(),requestDTO.getMonth());
		if(!tmps.isEmpty()) {
			dto.setPicture(tmps.get(0).getPicture());
			dto.setPeopleNum(tmps.size());
			dto.setWinner(tmps.get(0).getEmployeeName());
			double total = 0;
			for(AchievementDTO tmp:tmps) {
				total+=tmp.getTotal();
			}
			dto.setTotal(total);
			if(requestDTO.getMonth().equals("一月")) {
				dto.setRate(0);
			}else {
				List<String> monthList = new ArrayList<String>(Arrays.asList("一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"));
				int monthIndex=monthList.indexOf(requestDTO.getMonth());
				String monthName=monthList.get(monthIndex-1);
				List<AchievementDTO> lastMonth=achievementService.getSumByStoreNameAndMonth(requestDTO.getArea(),monthName);
				double lastTotal=0;
				for(AchievementDTO tmp:lastMonth) {
					lastTotal+=tmp.getTotal();
				}
				if(lastTotal==0) {
					dto.setRate(0);
				}else {
					double rate=(total-lastTotal)/lastTotal;
					BigDecimal bd = new BigDecimal(rate); 
					Double d = bd.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue(); 
					dto.setRate(d);
				}
			}
			listTmp.add(dto);
		}
		return listTmp;		
	}
	@SystemControllerLog(description="业绩排行")
	@GetMapping("/sort")
	public List<SortResponseDTO> dataSort(RequestDTO requestDTO) {
		List<SortResponseDTO> queue=new ArrayList<SortResponseDTO>();
		if(requestDTO.getArea()==null||requestDTO.getMonth()==null) {
			List<StoreName> storeNames=storeService.findAllStoreName();
			if(!storeNames.isEmpty()) {
				   requestDTO.setMonth("一月");
				   requestDTO.setArea(storeNames.get(0).getStoreName());
				}else{
				   return null;
			}
		}	
		List<AchievementDTO> tmps=achievementService.getSumByStoreNameAndMonth(requestDTO.getArea(),requestDTO.getMonth());
		for(int i=0;i<tmps.size()&&i<4;i++) {
			SortResponseDTO sortResponseDTO=new SortResponseDTO();
			sortResponseDTO.setRank(i+1);
			sortResponseDTO.setEmployeeName(tmps.get(i).getEmployeeName());
			sortResponseDTO.setWord(tmps.get(i).getQuotation());
			sortResponseDTO.setPicture(tmps.get(i).getPicture());
			queue.add(sortResponseDTO);
		}
		return queue;
	}
	

}
