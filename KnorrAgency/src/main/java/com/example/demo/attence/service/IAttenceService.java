package com.example.demo.attence.service;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.example.demo.attence.entity.Attence;
import com.example.demo.attence.entity.AttenceDTO;

public interface IAttenceService {
	
	/*考勤业务*/
	public void save(Attence attence);
	
	public void deleteById(Long id);
	
	public void deleteAll(Long[] ids);
	
	public Optional<Attence> findById(Long id);
	
	public Page<AttenceDTO> findAll(Specification<Attence> spec, Pageable pageable);
	
	public int findAttence(String employeeName);
	
	public List<Attence> findByEmployeeName(Specification<Attence> spec);
	
	//按月份和部门查出该部门某月的考勤情况
	public List<Attence> findByMonthAndStoreName(Date month,String storeName);
	
	//查出某员工某月的考勤情况
	public List<Attence> findByMonth(Date month,String employeeName);
	
	
	/*申诉业务*/
	//1.启动流程
	public void startWorkflow(String userId,Long attenceId, Map<String, Object> variables);
	
	//2.查询流程任务
	public Page<AttenceDTO> findTodoTasks(String userId, Pageable pageable);
	
	//3.签收流程任务
	public void claim(String taskId,String userId);
	
	//4.完成流程任务
	public void complete(String taskId, Map<String, Object> variables); 

}
