package com.example.demo.achievement.entity;

public class AchievementDTO {
	private String employeeName;
	private String quotation;
	private double total;
	private String picture;
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getQuotation() {
		return quotation;
	}
	public void setQuotation(String quotation) {
		this.quotation = quotation;
	}
	public double getTotal() {
		return total;
	}
	public void setTotal(double total) {
		this.total = total;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	@Override
	public String toString() {
		return "AchievementDTO [employeeName=" + employeeName + ", quotation=" + quotation + ", total=" + total
				+ ", picture=" + picture + "]";
	}
	
	
}
