package com.example.demo.store.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

//用来放store的查询条件
public class StoreQueryDTO {
	private String storeName;
	private String storeNumber;
	private String storeArea;
	private String fatherStoreName;
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
	public String getFatherStoreName() {
		return fatherStoreName;
	}
	public void setFatherStoreName(String fatherStoreName) {
		this.fatherStoreName = fatherStoreName;
	}
	
	@SuppressWarnings({ "serial"})
	public static Specification<Store> getWhereClause(final StoreQueryDTO storeQueryDTO) {
		return new Specification<Store>() {
			@Override
			public Predicate toPredicate(Root<Store> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
			
				List<Predicate> predicate = new ArrayList<>();
				
				/*if (StringUtils.isNotBlank(employeeQueryDTO.getEmployeeName())) {
					predicate.add(criteriaBuilder.equal(root.get("employeeNumber").as(String.class),
							employeeQueryDTO.getEmployeeNumber()));
				}*/
				
				if (StringUtils.isNotBlank(storeQueryDTO.getStoreName())) {
					predicate.add(criteriaBuilder.like(root.get("storeName").as(String.class),
							"%"+storeQueryDTO.getStoreName()+"%"));
				}
				if (StringUtils.isNotBlank(storeQueryDTO.getStoreNumber())) {
					predicate.add(criteriaBuilder.like(root.get("storeNumber").as(String.class),
							"%"+storeQueryDTO.getStoreNumber()+"%"));
				}
				if (StringUtils.isNotBlank(storeQueryDTO.getStoreArea())) {
					predicate.add(criteriaBuilder.like(root.get("storeArea").as(String.class),
							"%"+storeQueryDTO.getStoreArea()+"%"));
				}
				
				Join<Store, Store> join=root.join("fatherStore",JoinType.LEFT);
				if (StringUtils.isNotBlank(storeQueryDTO.getFatherStoreName())) {
					predicate.add(criteriaBuilder.like(join.get("storeName").as(String.class),
							"%"+storeQueryDTO.getFatherStoreName()+"%"));
				}
				
				Predicate[] pre = new Predicate[predicate.size()];
				return query.where(predicate.toArray(pre)).getRestriction();
				
			}
		};
	}
	
}
