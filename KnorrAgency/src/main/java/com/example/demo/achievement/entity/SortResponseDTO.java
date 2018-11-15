package com.example.demo.achievement.entity;

public class SortResponseDTO {
	private int rank;
	private String employeeName;
	private String word;
	private String picture;
	
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public int getRank() {
		return rank;
	}
	public String getEmployeeName() {
		return employeeName;
	}
	public String getWord() {
		return word;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public void setWord(String word) {
		this.word = word;
	}
	
	
}
