package com.example.demo.email.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

public class EmailQueryDTO {
	
	private String employeeName;
	
	private String emailFrom;
	
	private String emailTo;
	
	private Date startTime;
	
	private Date endTime;
	
	private int emailStatus;
	
	private int inboxStatus;
	
	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getEmailFrom() {
		return emailFrom;
	}

	public void setEmailFrom(String emailFrom) {
		this.emailFrom = emailFrom;
	}
	
	public String getEmailTo() {
		return emailTo;
	}

	public void setEmailTo(String emailTo) {
		this.emailTo = emailTo;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public int getEmailStatus() {
		return emailStatus;
	}

	public void setEmailStatus(int emailStatus) {
		this.emailStatus = emailStatus;
	}
	
	public int getInboxStatus() {
		return inboxStatus;
	}

	public void setInboxStatus(int inboxStatus) {
		this.inboxStatus = inboxStatus;
	}

	@SuppressWarnings({ "serial"})
	public static Specification<Email> getWhereClause(final EmailQueryDTO emailQueryDTO) {
		return new Specification<Email>() {
			@Override
			public Predicate toPredicate(Root<Email> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
			
				List<Predicate> predicate = new ArrayList<>();
			
				if(StringUtils.isNoneBlank(emailQueryDTO.getEmployeeName())) {
					predicate.add(criteriaBuilder.like(root.get("employee").get("employeeName").as(String.class),
							"%" + emailQueryDTO.getEmployeeName() + "%"));
				}
				if(StringUtils.isNoneBlank(emailQueryDTO.getEmailFrom())) {
					predicate.add(criteriaBuilder.like(root.get("emailFrom").as(String.class),
							"%" + emailQueryDTO.getEmailFrom() + "%"));
				}
				if(StringUtils.isNoneBlank(emailQueryDTO.getEmailTo())) {
					predicate.add(criteriaBuilder.like(root.get("emailTo").as(String.class),
							"%" + emailQueryDTO.getEmailTo() + "%"));
				}
				if (null!=emailQueryDTO.getStartTime()) {
					predicate.add(criteriaBuilder.greaterThanOrEqualTo(root.get("sendTime").as(Date.class),
							emailQueryDTO.getStartTime()));
				}
				if (null!=emailQueryDTO.getEndTime()) {
					predicate.add(criteriaBuilder.lessThanOrEqualTo(root.get("sendTime").as(Date.class),
							emailQueryDTO.getEndTime()));
				}
				predicate.add(criteriaBuilder.equal(root.get("inboxStatus").as(Integer.class),
						emailQueryDTO.getInboxStatus()));
				predicate.add(criteriaBuilder.equal(root.get("emailStatus").as(Integer.class),
						emailQueryDTO.getEmailStatus()));
				//predicate.add(criteriaBuilder.equal(root.get("id").as(Integer.class), userQueryDTO.getId()));
				Predicate[] pre = new Predicate[predicate.size()];
				return query.where(predicate.toArray(pre)).getRestriction();
			}
		};
	}
}
