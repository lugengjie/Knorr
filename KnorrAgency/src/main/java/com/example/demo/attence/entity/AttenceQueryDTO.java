package com.example.demo.attence.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;


public class AttenceQueryDTO {
	
	private String employeeName;
	
	private String location;
	
	private String storeName;
	
	@DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss") 
	private Date workinTime;
	
	@DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss") 
	private Date workoutTime;

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}
	
	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public Date getWorkinTime() {
		return workinTime;
	}

	public void setWorkinTime(Date workinTime) {
		this.workinTime = workinTime;
	}

	public Date getWorkoutTime() {
		return workoutTime;
	}

	public void setWorkoutTime(Date workoutTime) {
		this.workoutTime = workoutTime;
	}
	
	@SuppressWarnings({ "serial"})
	public static Specification<Attence> getWhereClause(final AttenceQueryDTO attenceQueryDTO) {
		return new Specification<Attence>() {
			@Override
			public Predicate toPredicate(Root<Attence> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
			
				List<Predicate> predicate = new ArrayList<>();
				
				if(StringUtils.isNoneBlank(attenceQueryDTO.getEmployeeName())) {
					predicate.add(criteriaBuilder.like(root.get("employee").get("employeeName").as(String.class),
							"%" + attenceQueryDTO.getEmployeeName() + "%"));
				}
				if(StringUtils.isNoneBlank(attenceQueryDTO.getStoreName())) {
					predicate.add(criteriaBuilder.like(root.get("employee").get("localStore").get("storeName").as(String.class),
							"%" + attenceQueryDTO.getStoreName() + "%"));
				}
				if(StringUtils.isNoneBlank(attenceQueryDTO.getLocation())) {
					predicate.add(criteriaBuilder.like(root.get("location").as(String.class),
							"%" + attenceQueryDTO.getLocation() + "%"));
				}
				if (null!=attenceQueryDTO.getWorkinTime()) {
					predicate.add(criteriaBuilder.greaterThanOrEqualTo(root.get("workinTime").as(Date.class),
							attenceQueryDTO.getWorkinTime()));
				}
				if (null!=attenceQueryDTO.getWorkoutTime()) {
					predicate.add(criteriaBuilder.lessThanOrEqualTo(root.get("workoutTime").as(Date.class),
							attenceQueryDTO.getWorkoutTime()));
				}
				//predicate.add(criteriaBuilder.equal(root.get("id").as(Integer.class), userQueryDTO.getId()));
				Predicate[] pre = new Predicate[predicate.size()];
				return query.where(predicate.toArray(pre)).getRestriction();
			}
		};
	}
	
}
