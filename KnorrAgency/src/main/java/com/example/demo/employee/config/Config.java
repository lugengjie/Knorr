package com.example.demo.employee.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootConfiguration
public class Config extends WebMvcConfigurerAdapter{

	@Autowired
	private EmployeeConfig employeeConfig;
	@Autowired
	private EmployeeConfig2 employeeConfig2;
	@Autowired
	private StoreConfig storeConfig;
	@Autowired
	private AttenceConfig attenceConfig;
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		/*registry.addInterceptor(employeeConfig2).addPathPatterns("/**")
			.excludePathPatterns("/index.html")
			.excludePathPatterns("/login");*/
		registry.addInterceptor(storeConfig).addPathPatterns("/store/**").excludePathPatterns("/store/getStoreName2");
		registry.addInterceptor(employeeConfig).addPathPatterns("/employee/**");
		registry.addInterceptor(attenceConfig).addPathPatterns("/attence/getAllAttence");
	}

}
