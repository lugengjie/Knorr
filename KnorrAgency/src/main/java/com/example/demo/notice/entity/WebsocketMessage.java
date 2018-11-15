package com.example.demo.notice.entity;

public class WebsocketMessage {
	private String message;
	private String time;
	
	public String getMessage() {
		return message;
	}
	public String getTime() {
		return time;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public void setTime(String time) {
		this.time = time;
	}
	@Override
	public String toString() {
		return "WebsocketMessage [message=" + message + ", time=" + time + "]";
	}
	
	
}
