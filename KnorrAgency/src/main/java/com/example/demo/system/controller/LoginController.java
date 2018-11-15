package com.example.demo.system.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import org.activiti.engine.IdentityService;
import org.activiti.engine.identity.Group;
import org.activiti.engine.identity.User;
import org.apache.commons.lang3.ArrayUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.common.controller.ExtAjaxResponse;
import com.example.demo.common.controller.SessionUtil;
import com.example.demo.common.utils.MD5;
import com.example.demo.log.config.SystemControllerLog;

import com.example.demo.employee.domain.Employee;
import com.example.demo.employee.repository.EmployeeRepository;



@RestController
public class LoginController {
	
	private static final Logger log = LoggerFactory.getLogger(LoginController.class);
	
	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
    private IdentityService identityService;
    /**
       * 登录系统
     **/
    @SystemControllerLog(description="登录系统")
	@RequestMapping(value="/login")
	public @ResponseBody ExtAjaxResponse logon(@RequestParam("userName") String userName, @RequestParam("password") String password, HttpSession session) {
		Employee employee=employeeRepository.findByEmployeeNumber(userName);
	
		if(employee==null || !employee.getPassword().equals(MD5.getMD5(password))) {
			return new ExtAjaxResponse(false,"登录失败!帐号或者密码有误!请重新登录!");
		}else {
			// 查看用户是否存在
			User user = identityService.createUserQuery().userId(userName).singleResult();

            SessionUtil.setUser(session, user);
	  
	        //读取角色Group
            List<Group> groupList = identityService.createGroupQuery().groupMember(user.getId()).list();

            SessionUtil.setGroupList(session, groupList);
            //有用，误删
            SessionUtil.setEmployeeNumber(session, employee.getEmployeeNumber());
            SessionUtil.setPost(session, employee.getPost());
            
//            session.setAttribute("id", employee.getId());
            
            String[] groupNames = new String[groupList.size()];
            for (int i = 0; i < groupNames.length; i++) {
                groupNames[i] = groupList.get(i).getName();
            }
            SessionUtil.setGroupNames(session, ArrayUtils.toString(groupNames));//"groupNames"  : "admin,hrManager"
            
            Map<String,String> map=new HashMap<String, String>();
            map.put("userName", userName);
            map.put("picture", employee.getPicture());
            map.put("msg", "登录成功!");
            map.put("userId",employee.getId().toString());
            //map.put("loginUserImage", "imgUrl");
            return new ExtAjaxResponse(true,map);
        }
    }
    /**
     * 退出登录
     */
    @SystemControllerLog(description="退出登录")
    @RequestMapping(value = "/logout")
    public @ResponseBody ExtAjaxResponse logout(HttpSession session) 
    {
    	try {
    		SessionUtil.removeAttribute(session);
    		session.removeAttribute("id");
        	return new ExtAjaxResponse(true,"登出成功!");
		} catch (Exception e) {
			return new ExtAjaxResponse(false,"登出失败!");

		}
	}
	
}
