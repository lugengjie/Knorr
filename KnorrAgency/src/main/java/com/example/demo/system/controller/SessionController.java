package com.example.demo.system.controller;

import com.example.demo.common.controller.ExtAjaxResponse;
import com.example.demo.common.controller.SessionUtil;
import com.example.demo.log.config.SystemControllerLog;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:1841")
@RestController
public class SessionController {
	
	@SystemControllerLog(description="权限限制")
    @RequestMapping(value = "/user/current")
    public ExtAjaxResponse currentUser(HttpSession session) {
        String userName = SessionUtil.getUserName(session);

        ExtAjaxResponse response = new ExtAjaxResponse();
        response.setMsg(userName);
        response.setSuccess(true);

        return response;
    }
	
	 @SystemControllerLog(description="权限限制")
    @RequestMapping(value = "/group/current")
    public ExtAjaxResponse currentGroup(HttpSession session) {
        String groupNames = SessionUtil.getGroupNames(session);

        ExtAjaxResponse response = new ExtAjaxResponse();
        response.setMsg(groupNames);
        response.setSuccess(true);

        return response;
    }

}
