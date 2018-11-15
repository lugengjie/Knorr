package com.example.demo.log.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

public class LogQueryDTO {
	
	private String employeeName;
	
	private String storeName;
	
	private Date startTime;
	
	private Date endTime;

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
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
	
	@SuppressWarnings({ "serial"})
	public static Specification<Log> getWhereClause(final LogQueryDTO logQueryDTO) {
		return new Specification<Log>() {
			@Override
			public Predicate toPredicate(Root<Log> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
			
				List<Predicate> predicate = new ArrayList<>();
			
				if(StringUtils.isNoneBlank(logQueryDTO.getEmployeeName())) {
					predicate.add(criteriaBuilder.like(root.get("employee").get("employeeName").as(String.class),
							"%" + logQueryDTO.getEmployeeName() + "%"));
				}
				if(StringUtils.isNoneBlank(logQueryDTO.getStoreName())) {
					predicate.add(criteriaBuilder.like(root.get("employee").get("localStore").get("storeName").as(String.class),
							"%" + logQueryDTO.getStoreName() + "%"));
				}
				if (null!=logQueryDTO.getStartTime()) {
					predicate.add(criteriaBuilder.greaterThanOrEqualTo(root.get("operateDate").as(Date.class),
							logQueryDTO.getStartTime()));
				}
				if (null!=logQueryDTO.getEndTime()) {
					predicate.add(criteriaBuilder.lessThanOrEqualTo(root.get("operateDate").as(Date.class),
							logQueryDTO.getEndTime()));
				}
				//predicate.add(criteriaBuilder.equal(root.get("id").as(Integer.class), userQueryDTO.getId()));
				Predicate[] pre = new Predicate[predicate.size()];
				return query.where(predicate.toArray(pre)).getRestriction();
			}
		};
	}

}
