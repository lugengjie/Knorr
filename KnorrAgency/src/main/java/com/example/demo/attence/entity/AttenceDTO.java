package com.example.demo.attence.entity;

import java.util.Date;

import com.example.demo.activiti.entity.ProcessStatus;
import com.fasterxml.jackson.annotation.JsonFormat;

public class AttenceDTO {
	
	/**------------业务数据--------------**/
	//业务数据字段
	private Long id;
	
	private String employeeName;
	
	private String location;
	
	private String storeName;
	
	private Date workinTime;
	
	private Date workoutTime;
	
	private Date day;
	
	private AttenceStatus attenceStatus;
	
	private ProcessStatus processStatus;//申诉状态
	
	private String appealreason;  //申诉原因
	
	/**------------流程数据--------------**/
	/*任务*/
    private String taskId;
    
    private String taskName;
    
    private Date   taskCreateTime;
    
    private String assignee;
    
    private String taskDefinitionKey;
    
    /*流程实例*/
    private String processInstanceId;
    
    /*流程图定义*/
    private String processDefinitionId;
    
    private boolean suspended;
    
    private int version;
    
    private String deptLeaderBackReason;
    
    private String hrBackReason;

	public Long getId() {
		return id;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public String getLocation() {
		return location;
	}
	
	public String getStoreName() {
		return storeName;
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

	public ProcessStatus getProcessStatus() {
		return processStatus;
	}

	public String getAppealreason() {
		return appealreason;
	}

	public String getTaskId() {
		return taskId;
	}

	public String getTaskName() {
		return taskName;
	}
	
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getTaskCreateTime() {
		return taskCreateTime;
	}

	public String getAssignee() {
		return assignee;
	}

	public String getTaskDefinitionKey() {
		return taskDefinitionKey;
	}

	public String getProcessInstanceId() {
		return processInstanceId;
	}

	public String getProcessDefinitionId() {
		return processDefinitionId;
	}

	public boolean isSuspended() {
		return suspended;
	}

	public int getVersion() {
		return version;
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

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	
	public void setStoreName(String storeName) {
		this.storeName = storeName;
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

	public void setProcessStatus(ProcessStatus processStatus) {
		this.processStatus = processStatus;
	}

	public void setAppealreason(String appealreason) {
		this.appealreason = appealreason;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public void setTaskName(String taskName) {
		this.taskName = taskName;
	}

	public void setTaskCreateTime(Date taskCreateTime) {
		this.taskCreateTime = taskCreateTime;
	}

	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}

	public void setTaskDefinitionKey(String taskDefinitionKey) {
		this.taskDefinitionKey = taskDefinitionKey;
	}

	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}

	public void setProcessDefinitionId(String processDefinitionId) {
		this.processDefinitionId = processDefinitionId;
	}

	public void setSuspended(boolean suspended) {
		this.suspended = suspended;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public void setDeptLeaderBackReason(String deptLeaderBackReason) {
		this.deptLeaderBackReason = deptLeaderBackReason;
	}

	public void setHrBackReason(String hrBackReason) {
		this.hrBackReason = hrBackReason;
	}
	
}
