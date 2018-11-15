package com.example.demo.leave.entity;

import com.example.demo.activiti.entity.ProcessStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "t_leave")
public class Leave  implements Serializable {

    private static final long serialVersionUID = 1L;
    //业务数据字段
    private Long id;
    private Date startTime;
    private Date endTime;
    private Date realityStartTime;
    private Date realityEndTime;
    private Date applyTime;
    private String leaveType;
    private String reason;
    
    private ProcessStatus processStatus;//流程状态
    //工作流程数据字段
    private String userId;//启动流程的用户ID
    //流程实例Id：用于关联流程引擎相关数据没有启动流程之前为""
    private String processInstanceId;
    
    private String depReason;
    private String hrReason;
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
    
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getStartTime() {
		return startTime;
	}
    
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getEndTime() {
		return endTime;
	}

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getRealityStartTime() {
		return realityStartTime;
	}

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getRealityEndTime() {
		return realityEndTime;
	}
    
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getApplyTime() {
		return applyTime;
	}
	public String getLeaveType() {
		return leaveType;
	}
	public String getReason() {
		return reason;
	}
	
	@Enumerated(EnumType.STRING)
	public ProcessStatus getProcessStatus() {
		return processStatus;
	}
	public String getUserId() {
		return userId;
	}
	public String getProcessInstanceId() {
		return processInstanceId;
	}
	
	public String getDepReason() {
		return depReason;
	}

	public String getHrReason() {
		return hrReason;
	}

	public void setId(Long id) {
		this.id = id;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public void setRealityStartTime(Date realityStartTime) {
		this.realityStartTime = realityStartTime;
	}
	public void setRealityEndTime(Date realityEndTime) {
		this.realityEndTime = realityEndTime;
	}
	public void setApplyTime(Date applyTime) {
		this.applyTime = applyTime;
	}
	public void setLeaveType(String leaveType) {
		this.leaveType = leaveType;
	}
	public void setReason(String reason) {
		this.reason = reason;
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

	public void setDepReason(String depReason) {
		this.depReason = depReason;
	}

	public void setHrReason(String hrReason) {
		this.hrReason = hrReason;
	}
	
}


