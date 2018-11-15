package com.example.demo.attence.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.demo.activiti.entity.ProcessStatus;
import com.example.demo.employee.domain.Employee;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="t_attence")
public class Attence {
	
	private Long id;
	
	private Employee employee;
	
	private String location;
	
	private Date workinTime;
	
	private Date workoutTime;
	
	private Date day;
	
	private AttenceStatus attenceStatus;
	
	private ProcessStatus processStatus;//申诉状态
	
	private String appealreason;  //申诉原因
	//工作流程数据字段
    private String userId;//启动流程的用户ID
    //流程实例Id：用于关联流程引擎相关数据没有启动流程之前为""
    private String processInstanceId;
    
    private String deptLeaderBackReason;
    
    private String hrBackReason;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
	
	@ManyToOne
	@JoinColumn(name="employee_id")
	public Employee getEmployee() {
		return employee;
	}

	public String getLocation() {
		return location;
	}
	
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getWorkinTime() {
		return workinTime;
	}
	
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getWorkoutTime() {
		return workoutTime;
	}
	
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getDay() {
		return day;
	}

	public AttenceStatus getAttenceStatus() {
		return attenceStatus;
	}
	
	public String getUserId() {
		return userId;
	}

	public String getProcessInstanceId() {
		return processInstanceId;
	}
	
	public ProcessStatus getProcessStatus() {
		return processStatus;
	}
	
	public String getAppealreason() {
		return appealreason;
	}
	
	public String getDeptLeaderBackReason() {
		return deptLeaderBackReason;
	}

	public String getHrBackReason() {
		return hrBackReason;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public void setWorkinTime(Date workinTime) {
		this.workinTime = workinTime;
	}

	public void setWorkoutTime(Date workoutTime) {
		this.workoutTime = workoutTime;
	}
	
	public void setDay(Date day) {
		this.day = day;
	}

	public void setAttenceStatus(AttenceStatus attenceStatus) {
		this.attenceStatus = attenceStatus;
	}
	
	public void setUserId(String userId) {
		this.userId = userId;
	}

	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}
	
	public void setProcessStatus(ProcessStatus processStatus) {
		this.processStatus = processStatus;
	}
	
	public void setAppealreason(String appealreason) {
		this.appealreason = appealreason;
	}
	
	public void setDeptLeaderBackReason(String deptLeaderBackReason) {
		this.deptLeaderBackReason = deptLeaderBackReason;
	}

	public void setHrBackReason(String hrBackReason) {
		this.hrBackReason = hrBackReason;
	}

}
