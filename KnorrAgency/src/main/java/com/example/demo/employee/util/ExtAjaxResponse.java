package com.example.demo.employee.util;

import java.util.Map;

public class ExtAjaxResponse {
	private boolean success= true;
	private String msg= "";
	
	private Map<String,String> map;
	
	public ExtAjaxResponse() {}
	
	public ExtAjaxResponse(boolean success) {
		this.success = success;
	}
	
	public ExtAjaxResponse(boolean success,String msg) {
		this.success = success;
		this.msg = msg;
	}
	
	public ExtAjaxResponse(boolean success,Map<String,String> map) {
		this.success = success;
		this.map = map;
	}
	
	public boolean isSuccess() {
		return success;
	}
	public String getMsg() {
		return msg;
	}	
	
	public Map<String, String> getMap() {
		return map;
	}	
}
