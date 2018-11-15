package com.example.demo.email.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.demo.employee.domain.Employee;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="t_email")
public class Email {
	
	private Long id;
	
	private String emailFrom;
	
	private String emailTo;
	
	private String emailSubject;
	
	private String emailContent;
	
	private Date sendTime;
	
	private Employee employee;
	
	private EmailStatus emailStatus;   //标识是发送还是草稿
	
	private EmailStatus readStatus;   //标识收件箱里是否已读
	
	private EmailStatus inboxStatus;   //用于区别已发送到收件箱
	
	private EmailStatus replyStatus;   //用于区别是否已回复
	
	private String emailAttachment;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}

	public String getEmailFrom() {
		return emailFrom;
	}

	public String getEmailTo() {
		return emailTo;
	}

	public String getEmailSubject() {
		return emailSubject;
	}

	public String getEmailContent() {
		return emailContent;
	}
	
	@JsonFormat(pattern="yyyy/MM/dd HH:mm:ss",timezone="GMT+8")
	public Date getSendTime() {
		return sendTime;
	}
	
	@ManyToOne
	@JoinColumn(name="employee_id")
	public Employee getEmployee() {
		return employee;
	}

	public EmailStatus getEmailStatus() {
		return emailStatus;
	}
	
	public EmailStatus getReadStatus() {
		return readStatus;
	}
	
	public EmailStatus getInboxStatus() {
		return inboxStatus;
	}
	
	public EmailStatus getReplyStatus() {
		return replyStatus;
	}

	public String getEmailAttachment() {
		return emailAttachment;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setEmailFrom(String emailFrom) {
		this.emailFrom = emailFrom;
	}

	public void setEmailTo(String emailTo) {
		this.emailTo = emailTo;
	}

	public void setEmailSubject(String emailSubject) {
		this.emailSubject = emailSubject;
	}

	public void setEmailContent(String emailContent) {
		this.emailContent = emailContent;
	}

	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public void setEmailStatus(EmailStatus emailStatus) {
		this.emailStatus = emailStatus;
	}
	
	public void setReadStatus(EmailStatus readStatus) {
		this.readStatus = readStatus;
	}
	
	public void setInboxStatus(EmailStatus inboxStatus) {
		this.inboxStatus = inboxStatus;
	}
	
	public void setReplyStatus(EmailStatus replyStatus) {
		this.replyStatus = replyStatus;
	}

	public void setEmailAttachment(String emailAttachment) {
		this.emailAttachment = emailAttachment;
	}
	
}
