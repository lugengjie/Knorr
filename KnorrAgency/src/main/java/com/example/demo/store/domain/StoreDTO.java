package com.example.demo.store.domain;

//将store封装好发送到前端
public class StoreDTO {
	private Long id;
	private String storeName;
	private String storeNumber;
	private String storeArea;
	private String fatherStoreName;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	public String getFatherStoreName() {
		return fatherStoreName;
	}
	public void setFatherStoreName(String fatherStoreName) {
		this.fatherStoreName = fatherStoreName;
	}
	
	
}
