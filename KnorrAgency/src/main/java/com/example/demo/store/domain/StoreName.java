package com.example.demo.store.domain;

import java.util.List;

public class StoreName {

	
	private String storeName;

	public String getStoreName() {
		return this.storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}
	
	@Override
	public String toString() {
		return "StoreName [StoreName=" + storeName + "]";
	}		
}
