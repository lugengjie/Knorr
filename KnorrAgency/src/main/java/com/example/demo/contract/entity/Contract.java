package com.example.demo.contract.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
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
@Table(name="t_contract")
public class Contract implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	//业务数据字段
	private Long id;
	
	private String contractNumber;     //合同号
	
	private String customerName;       //客户姓名
	
	private String houseName;          //房源名称
	
	private Employee employee;      //房产经纪人姓名
	
	private Date startTime;          //签约时间
	
	private Date endTime;             //失效时间
	
	private String contractType;     //合同类型
	
	private double total;           //金额
	
	private ProcessStatus processStatus;//流程状态
	
	//工作流程数据字段
    private String userId;//启动流程的用户ID
    //流程实例Id：用于关联流程引擎相关数据没有启动流程之前为""
    private String processInstanceId;
    
    private String depreason;
    
    private String manreason;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getId() {
		return id;
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
	
	@ManyToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="employee_id")
	public Employee getEmployee() {
		return employee;
	}

	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getStartTime() {
		return startTime;
	}
	
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getEndTime() {
		return endTime;
	}

	public String getContractType() {
		return contractType;
	}

	public double getTotal() {
		return total;
	}
	
	public ProcessStatus getProcessStatus() {
		return processStatus;
	}

	public String getUserId() {
		return userId;
	}

	public String getProcessInstanceId() {
		return processInstanceId;
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

	public void setContractNumber(String contractNumber) {
		this.contractNumber = contractNumber;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public void setHouseName(String houseName) {
		this.houseName = houseName;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public void setContractType(String contractType) {
		this.contractType = contractType;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public void setProcessStatus(ProcessStatus processStatus) {
		this.processStatus = processStatus;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public void setProcessInstanceId(String processInstanceId) {
		this.processInstanceId = processInstanceId;
	}
	
	public void setDepreason(String depreason) {
		this.depreason = depreason;
	}

	public void setManreason(String manreason) {
		this.manreason = manreason;
	}

	@Override
	public String toString() {
		return "Contract [id=" + id + ", contractNumber=" + contractNumber + ", customerName=" + customerName
				+ ", houseName=" + houseName + ", employee=" + employee + ", startTime=" + startTime + ", endTime="
				+ endTime + ", contractType=" + contractType + ", total=" + total + "]";
	}
	
}
