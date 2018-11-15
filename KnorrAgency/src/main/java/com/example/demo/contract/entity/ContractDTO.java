package com.example.demo.contract.entity;

import java.util.Date;

import com.example.demo.activiti.entity.ProcessStatus;
import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * @author kinghou
 *
 */
public class ContractDTO {
	
	/**------------业务数据--------------**/
	//业务数据字段
	private Long id;
	
	private String userId;
	
	private String contractNumber;     //合同号
	
	private String customerName;       //客户姓名
	
	private String houseName;          //房源名称
	
	private String employeeName;      //房产经纪人姓名
	
	private Date startTime;          //签约时间
	
	private Date endTime;             //失效时间
	
	private Date day;
	
	private String contractType;     //合同类型
	
	private double total;           //金额
	
	private String storeName;           //地方
	
	private String quotation;
	
	private ProcessStatus processStatus;//流程状态
	
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
    
    private String depreason;
    
    private String manreason;
    
    
    
	public ContractDTO() {
		
	}

	public Long getId() {
		return id;
	}
	
	public String getUserId() {
		return userId;
	}

	public String getContractNumber() {
		return contractNumber;
	}

	public String getCustomerName() {
		return customerName;
	}

	public String getHouseName() {
		return houseName;
	}

	public String getEmployeeName() {
		return employeeName;
	}
	
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getStartTime() {
		return startTime;
	}
	
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getEndTime() {
		return endTime;
	}
	
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getDay() {
		return day;
	}

	public String getContractType() {
		return contractType;
	}

	public double getTotal() {
		return total;
	}

	public String getStoreName() {
		return storeName;
	}

	public ProcessStatus getProcessStatus() {
		return processStatus;
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
	
	public String getQuotation() {
		return quotation;
	}

	public boolean isSuspended() {
		return suspended;
	}

	public int getVersion() {
		return version;
	}
	
	public String getDepreason() {
		return depreason;
	}

	public String getManreason() {
		return manreason;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public void setUserId(String userId) {
		this.userId = userId;
	}

	public void setContractNumber(String contractNumber) {
		this.contractNumber = contractNumber;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public void setHouseName(String houseName) {
		this.houseName = houseName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	
	
	public void setDay(Date day) {
		this.day = day;
	}

	public void setContractType(String contractType) {
		this.contractType = contractType;
	}

	public void setTotal(double total) {
		this.total = total;
	}
	
	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public void setProcessStatus(ProcessStatus processStatus) {
		this.processStatus = processStatus;
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

	public void setDepreason(String depreason) {
		this.depreason = depreason;
	}

	public void setManreason(String manreason) {
		this.manreason = manreason;
	}
	
	public void setQuotation(String quotation) {
		this.quotation = quotation;
	}

	@Override
	public String toString() {
		return "ContractDTO [employeeName=" + employeeName + ", total=" + total + ", storeName=" + storeName + "]";
	}

}
