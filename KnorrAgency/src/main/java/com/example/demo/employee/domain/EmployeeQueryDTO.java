package com.example.demo.employee.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import com.example.demo.store.domain.Store;


//用来放employee的查询条件
public class EmployeeQueryDTO {
	
	private String employeeName;
	private String storeName;
	private String storeNumber;
	private String storeArea;
	private String employeeNumber;
	private String post;
	private String status;
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
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
	public String getStoreNumber() {
		return storeNumber;
	}
	public void setStoreNumber(String storeNumber) {
		this.storeNumber = storeNumber;
	}
	public String getStoreArea() {
		return storeArea;
	}
	public void setStoreArea(String storeArea) {
		this.storeArea = storeArea;
	}
	public String getEmployeeNumber() {
		return employeeNumber;
	}
	public void setEmployeeNumber(String employeeNumber) {
		this.employeeNumber = employeeNumber;
	}
	public String getPost() {
		return post;
	}
	public void setPost(String post) {
		this.post = post;
	}
	
	@SuppressWarnings({ "serial"})
	public static Specification<Employee> getWhereClause(final EmployeeQueryDTO employeeQueryDTO) {
		return new Specification<Employee>() {
			@Override
			public Predicate toPredicate(Root<Employee> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
			
				List<Predicate> predicate = new ArrayList<>();
				
				/*if (null!=employeeQueryDTO.getEmployeeNumber()) {
					predicate.add(criteriaBuilder.equal(root.get("employeeNumber").as(String.class),
							employeeQueryDTO.getEmployeeNumber()));
				}*/
				
				if (StringUtils.isNotBlank(employeeQueryDTO.getEmployeeName())) {
					predicate.add(criteriaBuilder.like(root.get("employeeName").as(String.class),
							"%"+employeeQueryDTO.getEmployeeName()+"%"));
				}
				if (StringUtils.isNotBlank(employeeQueryDTO.getStatus())) {
					predicate.add(criteriaBuilder.like(root.get("status").as(String.class),
							"%"+employeeQueryDTO.getStatus()+"%"));
				}
				if (StringUtils.isNotBlank(employeeQueryDTO.getEmployeeNumber())) {
					predicate.add(criteriaBuilder.like(root.get("employeeNumber").as(String.class),
							"%"+employeeQueryDTO.getEmployeeNumber()+"%"));
				}
				if (StringUtils.isNotBlank(employeeQueryDTO.getPost())) {
					predicate.add(criteriaBuilder.like(root.get("post").as(String.class),
							"%"+employeeQueryDTO.getPost()+"%"));
				}
				
				//关联两张表的查询
				//Employee中有localStore属性，类型为Store。
				//在root.join("localStore",JoinType.LEFT)之后，Employee与Store关联了
				//join就指向localStore对象，join.get("storeArea")就可以获取localStore中的storeArea属性
				Join<Store, Employee> join=root.join("localStore",JoinType.LEFT);
				if (StringUtils.isNotBlank(employeeQueryDTO.getStoreArea())) {
					//这里必须在join.get("storeArea")后面加上.as(String.class)
					//注意这里是join.get("storeArea").as(String.class)，不是root.get("storeArea").as(String.class)
					//踩过坑，记住
					predicate.add(criteriaBuilder.like(join.get("storeArea").as(String.class),
							"%"+employeeQueryDTO.getStoreArea()+"%"));
				}
				if (StringUtils.isNotBlank(employeeQueryDTO.getStoreName())) {
					predicate.add(criteriaBuilder.like(join.get("storeName").as(String.class),
							"%"+employeeQueryDTO.getStoreName()+"%"));
				}
				if (StringUtils.isNotBlank(employeeQueryDTO.getStoreNumber())) {
					predicate.add(criteriaBuilder.like(join.get("storeNumber").as(String.class),
							employeeQueryDTO.getStoreNumber()));
				}
				
				
				Predicate[] pre = new Predicate[predicate.size()];
				return query.where(predicate.toArray(pre)).getRestriction();
				
			}
		};
	}
	
}
