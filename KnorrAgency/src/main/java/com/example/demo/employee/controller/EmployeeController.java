package com.example.demo.employee.controller;

import java.util.Date;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.employee.domain.EmployeeDTO;
import com.example.demo.employee.domain.EmployeeQueryDTO;
import com.example.demo.employee.service.IEmployeeService;
import com.example.demo.employee.util.ExtAjaxResponse;
import com.example.demo.employee.util.ExtjsPageRequest;
import com.example.demo.log.config.SystemControllerLog;


@RestController
@RequestMapping("/employee")
public class EmployeeController {
	
	
	private static final Logger log = LoggerFactory.getLogger(EmployeeController.class);

	
	@Autowired
	private IEmployeeService employeeService;
	
	//查询个人信息
	@SystemControllerLog(description="查询个人信息")
	@GetMapping(value="/getPerson")
	public EmployeeDTO getPerson(HttpSession session) {
		
		return null;
	}
	
	//多条件动态查询employee
	@SystemControllerLog(description="查询员工信息")
	@GetMapping
	public Page<EmployeeDTO> findAll(EmployeeQueryDTO employeeQueryDTO,HttpSession session,ExtjsPageRequest pageable)
	{
		String en=(String) session.getAttribute("employeeNumber");
		String post=(String) session.getAttribute("post");
		//判断session中employeeNumber和post是否都为空，是就返回null，不为空就执行
		if(StringUtils.isNotBlank(en) && StringUtils.isNotBlank(post)) {
			//判断是否是admin
			if(session.getAttribute("post").equals("admin")) {
				//查询条件中有employeeNumber且与session中employeeNumber相等，返回null
				if(StringUtils.isNotBlank(employeeQueryDTO.getEmployeeNumber()) && employeeQueryDTO.getEmployeeNumber().equals(en)) {
					return null;
				}
				pageable.setLimit(10);
				Page<EmployeeDTO> page;
				page = employeeService.findAll(EmployeeQueryDTO.getWhereClause(employeeQueryDTO), pageable.getPageable(),session);
				return page;
			}else {
				//查询条件中有employeeNumber且与session中employeeNumber相等，返回null
				if(StringUtils.isNotBlank(employeeQueryDTO.getEmployeeNumber()) && employeeQueryDTO.getEmployeeNumber().equals(en)) {
					return null;
				}
				//查询条件中有post为admin的返回null
				if(StringUtils.isNotBlank(employeeQueryDTO.getPost()) && employeeQueryDTO.equals("admin")) {
					return null;
				}
				pageable.setLimit(10);
				Page<EmployeeDTO> page;
				page = employeeService.findAll(EmployeeQueryDTO.getWhereClause(employeeQueryDTO), pageable.getPageable(),session);
				return page;
			}
		}
		else return null;
	}
	
	//  /employee/1
	//删除一个employee数据，通过id
	@SystemControllerLog(description="删除员工信息")
	@DeleteMapping(value="{id}")
	public ExtAjaxResponse deleteById(@PathVariable("id") Long id,HttpSession session) 
	{
		return employeeService.deleteById(id,session);
	}
	
	//插入一条employee数据
	@SystemControllerLog(description="保存员工信息")
	@RequestMapping(method=RequestMethod.POST)
	public ExtAjaxResponse saveEmployee(@RequestBody EmployeeDTO employeeDTO,HttpSession session) {
		String post=(String) session.getAttribute("post");
		if(StringUtils.isNotBlank(post)) {
			if(employeeDTO.getPost().equals("admin") && (!post.equals("admin"))) {
				return new ExtAjaxResponse(false,"添加失败！");
			}else
				return employeeService.saveEmployee(employeeDTO);
		}else return new ExtAjaxResponse(false,"添加失败！");
	}
	//修改一条employee数据
	@SystemControllerLog(description="修改员工信息")
	@RequestMapping(value="{id}",method=RequestMethod.PUT)
	public ExtAjaxResponse updateById(@PathVariable("id") Long id,@RequestBody EmployeeDTO employeeDTO,HttpSession session) {
		String post=(String) session.getAttribute("post");
		if(StringUtils.isNotBlank(employeeDTO.getPost())) {
			if(employeeDTO.getPost().equals("admin") && (!post.equals("admin"))) {
				return new ExtAjaxResponse(true,"更新失败！");
			}else
				return employeeService.updateById(id, employeeDTO);
		}
		else
			return employeeService.updateById(id, employeeDTO);
	}
	
	/*@DeleteMapping("/deletes")
	public ExtAjaxResponse deleteRows(@RequestParam(name="ids") Long[] ids) 
	{
		try {
			if(ids!=null) {
				employeeService.deleteAll(ids);
			}
			return new ExtAjaxResponse(true,"批量删除成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(true,"批量删除失败！");
		}
	}*/
}
