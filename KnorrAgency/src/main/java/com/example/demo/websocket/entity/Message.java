package com.example.demo.websocket.entity;

import java.util.ArrayList;

public class Message {
	private String event;
    private String userId;
    private ArrayList<String> group;
    
	public String getEvent() {
		return event;
	}
	public String getUserId() {
		return userId;
	}
	
	public ArrayList<String> getGroup() {
		return group;
	}
	
	public void setEvent(String event) {
		this.event = event;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public void setGroup(ArrayList<String> group) {
		this.group = group;
	}
	@Override
	public String toString() {
		return "BuildRoom [event=" + event + ", userId=" + userId + ", group=" + group + "]";
	}

}
