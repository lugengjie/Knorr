package com.example.demo.achievement.service;

import java.util.List;

import com.example.demo.achievement.entity.AchievementDTO;


public interface IAchievementService {
	//根据月份和门店统计出员工销售总额排行
    public List<AchievementDTO> getSumByStoreNameAndMonth(String storeName,String month);
    
}
