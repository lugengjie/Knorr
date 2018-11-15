package com.example.demo.achievement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.log.config.SystemControllerLog;


@Controller
public class TestController {  
	@SystemControllerLog(description="测试")
	@RequestMapping("/a")
	public String toIndex(Model model) {
		model.addAttribute("hello","sdfsa");
		return "qwer";
	}
}
