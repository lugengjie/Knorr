package com.example.demo.websocket.entity;

import java.util.ArrayList;

public class RequestDTO {
	private String event;
    private ArrayList<String> idGroup;
	public String getEvent() {
		return event;
	}
	public void setEvent(String event) {
		this.event = event;
	}
	public ArrayList<String> getIdGroup() {
		return idGroup;
	}
	public void setIdGroup(ArrayList<String> idGroup) {
		this.idGroup = idGroup;
	}
    
}
