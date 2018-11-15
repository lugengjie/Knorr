package com.example.demo.store.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.example.demo.employee.domain.Employee;

@Entity
@Table(name="t_store")
public class Store implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	private Long id;
	private String storeName;
	private String storeNumber;
	private String storeArea;
	private Store fatherStore;
	private List<Store> storeList=new ArrayList<>();
	private List<Employee> employeeList=new ArrayList<>();
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	@Column(nullable=false,unique=true)
	public String getStoreName() {
		return storeName;
	}
	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}
	@Column(nullable=false,unique=true)
	public String getStoreNumber() {
		return storeNumber;
	}
	public void setStoreNumber(String storeNumber) {
		this.storeNumber = storeNumber;
	}
	@Column(nullable=false,unique=false)
	public String getStoreArea() {
		return storeArea;
	}
	public void setStoreArea(String storeArea) {
		this.storeArea = storeArea;
	}
	
	@ManyToOne(cascade={CascadeType.ALL})
	@JoinColumn(name="fatherStore_id")
	public Store getFatherStore() {
		return fatherStore;
	}
	public void setFatherStore(Store fatherStore) {
		this.fatherStore = fatherStore;
	}
	
	@OneToMany(cascade=CascadeType.ALL,mappedBy="fatherStore")
	public List<Store> getStoreList() {
		return storeList;
	}
	public void setStoreList(List<Store> storeList) {
		this.storeList = storeList;
	}
	
	@OneToMany(cascade=CascadeType.ALL,mappedBy="localStore")
	public List<Employee> getEmployeeList() {
		return employeeList;
	}
	public void setEmployeeList(List<Employee> employeeList) {
		this.employeeList = employeeList;
	}
	
}
