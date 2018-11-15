package com.example.demo.employee.config;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

@Component
public class EmployeeConfig implements HandlerInterceptor{
	@Override 
	 public boolean preHandle(HttpServletRequest request, HttpServletResponse response, 
	 Object handler) throws Exception { 
		 String en=(String) request.getSession().getAttribute("employeeNumber");
		 String post=(String) request.getSession().getAttribute("post");
		 if(StringUtils.isNotBlank(post) && StringUtils.isNotBlank(en)) {
			 if(post.contains("人事经理") || post.equals("admin")) return true;
			 else return false;
		 }else
		 return false;
	 } 
	 @Override 
	 public void postHandle(HttpServletRequest request, HttpServletResponse response, 
	 Object handler, ModelAndView mv) throws Exception { 
		 
	 } 
	 @Override 
	 public void afterCompletion(HttpServletRequest request, 
	 HttpServletResponse response, Object handler, Exception ex) 
	 throws Exception { 
		
	 } 
}
