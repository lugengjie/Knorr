package com.example.demo.log.config;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.PARAMETER, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
public @interface SystemControllerLog {
	
	/**
     * 描述业务操作 例:Xxx管理-执行Xxx操作
     * @return
     */
    String description() default "";

}
