package com.example.demo.employee.domain;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.example.demo.store.domain.Store;


@Entity
@Table(name="t_employee")
public class Employee implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	private String password;
	private Long id;
	private String employeeName;
	private Store localStore;
	private String email;
	private String employeeNumber;
	private String picture;
	private String quotation;
	//权限id
	private String post;
	private String status;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	@Column(nullable=false,unique=false)
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	
	@Column(nullable=false,unique=false)
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	@ManyToOne(cascade={CascadeType.ALL})
	@JoinColumn(name="store_id")
	public Store getLocalStore() {
		return localStore;
	}
	public void setLocalStore(Store localStore) {
		this.localStore = localStore;
	}
	
	//@Column(nullable=false,unique=true)
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	@Column(nullable=false,unique=true)
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
	@Column(nullable=true,unique=false)
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public String getQuotation() {
		return quotation;
	}
	public void setQuotation(String quotation) {
		this.quotation = quotation;
	}
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "Employee [password=" + password + ", id=" + id + ", employeeName=" + employeeName + ", localStore="
				+ localStore + ", email=" + email + ", employeeNumber=" + employeeNumber + ", picture=" + picture
				+ ", quotation=" + quotation + ", post=" + post + "]";
	}
	
}
