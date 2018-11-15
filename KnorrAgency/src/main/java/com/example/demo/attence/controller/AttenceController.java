package com.example.demo.attence.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.activiti.engine.RuntimeService;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.activiti.entity.ProcessStatus;
import com.example.demo.activiti.util.WorkflowVariable;
import com.example.demo.attence.entity.Attence;
import com.example.demo.attence.entity.AttenceDTO;
import com.example.demo.attence.entity.AttenceQueryDTO;
import com.example.demo.attence.entity.AttenceStatus;
import com.example.demo.attence.service.IAttenceService;
import com.example.demo.attence.utils.AttenceUtil;
import com.example.demo.common.controller.ExtAjaxResponse;
import com.example.demo.common.controller.ExtjsPageRequest;
import com.example.demo.common.controller.SessionUtil;
import com.example.demo.contract.util.ContractUtil;
import com.example.demo.employee.domain.Employee;
import com.example.demo.employee.service.IEmployeeService;
import com.example.demo.log.config.SystemControllerLog;

@RestController
@RequestMapping("/attence")
public class AttenceController {
	
	@Autowired
	private IAttenceService attenceService;
	
	@Autowired
	private IEmployeeService employeeService;
	
	@Autowired
	private RuntimeService runtimeService;
	
	@SystemControllerLog(description="查看所有的考勤记录")
	@RequestMapping("/getAllAttence")
	//查看所有的考勤记录
	public Page<AttenceDTO> getAllAttence(HttpSession session,AttenceQueryDTO attenceQueryDTO,ExtjsPageRequest pageRequest) {
		String userId = SessionUtil.getUserName(session);  //通过session查找userId
		Employee employee=employeeService.EmployeeNumber(userId);
		attenceQueryDTO.setStoreName(employee.getLocalStore().getStoreName());
		return attenceService.findAll(AttenceQueryDTO.getWhereClause(attenceQueryDTO),pageRequest.getPageable());
	}
	
	/*----------------------------------------------考勤业务--------------------------------------------*/
	//查看个人的考勤记录
	@SystemControllerLog(description="查看个人的考勤记录")
	@GetMapping 
	public Page<AttenceDTO> getPersonAttence(HttpSession session,AttenceQueryDTO attenceQueryDTO,ExtjsPageRequest pageRequest) {
		
		Page<AttenceDTO> page;
		String userId = SessionUtil.getUserName(session);  //通过session查找userId
		if(userId!=null) {
			Employee employee=employeeService.EmployeeNumber(userId);
			attenceQueryDTO.setEmployeeName(employee.getEmployeeName());
			page=attenceService.findAll(AttenceQueryDTO.getWhereClause(attenceQueryDTO), pageRequest.getPageable());
		}else {
			page = new PageImpl<AttenceDTO>(new ArrayList<AttenceDTO>(),pageRequest.getPageable(),0);
		}
		return page;
		
	}
	
	//上班打卡
	@SystemControllerLog(description="上班打卡")
	@PostMapping("/workIn")
	public ExtAjaxResponse workIn(HttpSession session){
		int flag;
		ExtAjaxResponse response=new ExtAjaxResponse();
		//获取打卡人姓名
		String employeeName = SessionUtil.getUserName(session);
		System.out.println(employeeName);
		flag=attenceService.findAttence(employeeName);
		try {
			if(flag==0) {   //当天未打卡才允许打卡
				Attence attence=new Attence();
				//获取打卡地点
				JSONObject json=new JSONObject();
				json=AttenceUtil.readJsonFromUrl();
				String location=((JSONObject) json.get("content")).getString("address");
				//获取打卡时间
				Date date=new Date();
				
				int work=AttenceUtil.isTimeAndLocation(date, location, true);
				if(work==-1) {
					//打卡地错误
					attence.setDay(AttenceUtil.getDateByYMD(date));
					attence.setAttenceStatus(AttenceStatus.TRIP);
					attence.setProcessStatus(ProcessStatus.NEW);
					response.setMsg("打卡成功,您今天不在公司上班哦");
					response.setSuccess(true);
				}else if(work==-2) {
					//迟到
					attence.setDay(AttenceUtil.getDateByYMD(date));
					attence.setAttenceStatus(AttenceStatus.LATER);
					attence.setProcessStatus(ProcessStatus.NEW);
					response.setMsg("打卡成功,您今天上班迟到哦");
					response.setSuccess(true);
				}else if(work==0) {
					//正常上班
					attence.setDay(AttenceUtil.getDateByYMD(date));
					attence.setAttenceStatus(AttenceStatus.NORMAL);
					attence.setProcessStatus(ProcessStatus.NEW);
					response.setMsg("打卡成功,今天要加油哦");
					response.setSuccess(true);
				}
				Employee e=employeeService.EmployeeName(employeeName);
				if(e!=null) {
					attence.setEmployee(e);
				}
				attence.setLocation(location);
				attence.setWorkinTime(date);
				attenceService.save(attence);
				return response;
			}
			else if(flag==2) {
				response.setMsg("已经辛苦工作一天了，好好休息吧");
				response.setSuccess(false);
				return response;
			}else {
				response.setMsg("打卡失败1");
				response.setSuccess(false);
				return response;
			}
		} catch (Exception e) {
			response.setMsg("打卡失败2");
			response.setSuccess(false);
			return response;
		}
	}
	
	//下班签退
	@SystemControllerLog(description="下班签退")
	@PostMapping("/workOut")
	public ExtAjaxResponse workOut(HttpSession session) {
		ExtAjaxResponse response=new ExtAjaxResponse();
		try {
			//获取打卡人姓名
			String employeeName = SessionUtil.getUserName(session);
			//获取打卡地点
			JSONObject json=new JSONObject();
			json=AttenceUtil.readJsonFromUrl();
			String location=((JSONObject) json.get("content")).getString("address");
			//获取打卡时间
			Date date=new Date();
			
			int work=AttenceUtil.isTimeAndLocation(date, location, false);
			
			AttenceQueryDTO dto=new AttenceQueryDTO();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
			String time=sdf.format(date);
			dto.setEmployeeName(employeeName);
			
			List<Attence> attenceList=new ArrayList<Attence>();
			attenceList=attenceService.findByEmployeeName(AttenceQueryDTO.getWhereClause(dto));
			for(Attence attence:attenceList) {
				if(time.equals(sdf.format(attence.getWorkinTime()))) {
					if(work==-1) {
						//打卡地错误
						attence.setAttenceStatus(AttenceStatus.TRIP);
						attence.setWorkoutTime(date);
						attenceService.save(attence);
						response.setMsg("签退成功,您今天不在公司上班哦");
						response.setSuccess(true);
					}else if(work==-3) {
						//早退
						if(AttenceStatus.LATER==attence.getAttenceStatus()) {
							attence.setAttenceStatus(AttenceStatus.EARLYandLATER);
						}else {
							attence.setAttenceStatus(AttenceStatus.EARLY);
						}
						attence.setWorkoutTime(date);
						attenceService.save(attence);
						response.setMsg("签退成功,您今天提早下班了哦");
						response.setSuccess(true);
					}else if(work==0) {
						attence.setWorkoutTime(date);
						attenceService.save(attence);
						response.setMsg("下班了，好好休息吧");
						response.setSuccess(true);
					}
				}
			}
			return response;
		} catch (Exception e) {
			return new ExtAjaxResponse(false,"签退失败");
		}
		
	}
	
	//判断是否已打卡
	@SystemControllerLog(description="考勤操作")
	@GetMapping("/isAttence")
	public ExtAjaxResponse isAttence(HttpSession session) {
		String employeeName = SessionUtil.getUserName(session);

		int flag=attenceService.findAttence(employeeName);
		if(flag==0) {
			return new ExtAjaxResponse(true,"work");  //未上班
		}else if(flag==1) {
			return new ExtAjaxResponse(true,"working"); //已上班但未下班
		}else if(flag==2) {
			return new ExtAjaxResponse(true,"out"); //已经下班
		}else {
			return new ExtAjaxResponse(false,"false");
		}	
	}
	
	@SystemControllerLog(description="判断有无该考勤列表")
	@RequestMapping("/judgeMyAttenceExcel")
	public ExtAjaxResponse judgeMyAttenceExcel(@RequestParam(name="month") String month,HttpSession session) {
		//获取打卡人姓名
		String employeeName = SessionUtil.getUserName(session);
		
		List<Attence> attenceList=new ArrayList<Attence>();
		Date dmonth=ContractUtil.toDate(month);
		attenceList=attenceService.findByMonth(dmonth, employeeName);
		if(attenceList!=null && !attenceList.isEmpty()) {
			return new ExtAjaxResponse(true,"success");
		}else {
			return new ExtAjaxResponse(false,"false");
		}
	}
	
	/*下载个人考勤表*/
	@SystemControllerLog(description="下载考勤信息")
	@RequestMapping("/downloadMyAttenceExcel")
    public void downloadMyAttenceExcel(@RequestParam(name="month") String month,HttpSession session,HttpServletRequest request, HttpServletResponse response)throws IOException
    {  
		//获取打卡人姓名
		String employeeName = SessionUtil.getUserName(session);
		
		List<Attence> attenceList=new ArrayList<Attence>();
		Date dmonth=ContractUtil.toDate(month);
		attenceList=attenceService.findByMonth(dmonth, employeeName);
		
	    //创建工作簿
		@SuppressWarnings("resource")
		XSSFWorkbook wb = new XSSFWorkbook();
		//创建一个sheet
		XSSFSheet sheet = wb.createSheet();
		
		// 创建单元格样式
		XSSFCellStyle style =  wb.createCellStyle();	
		
		//为单元格添加背景样式
		for (int i = 0; i < attenceList.size()+2; i++) { //需要6行表格
		    Row  row =	sheet.createRow(i); //创建行
			for (int j = 0; j < 5; j++) {//需要5列
				row.createCell(j).setCellStyle(style);
			}
		}
		
		//合并单元格
		sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 4));//合并单元格，cellRangAddress四个参数，第一个起始行，第二终止行，第三个起始列，第四个终止列
		
		//填入数据
		XSSFRow row = sheet.getRow(0); //获取第一行
		row.getCell(0).setCellValue(employeeName+month+"考勤情况表"); //在第一行中创建一个单元格并赋值
		XSSFRow row1 = sheet.getRow(1);//获取第二行，为每一列添加字段
		row1.getCell(0).setCellValue("员工姓名");
		row1.getCell(1).setCellValue("打卡地点");
		row1.getCell(2).setCellValue("上班时间");
		row1.getCell(3).setCellValue("下班时间");
		row1.getCell(4).setCellValue("上班状态");
		
		//从第三行开始插数据
		for (int i = 2; i < attenceList.size()+2; i++) {
			XSSFRow Row = sheet.getRow(i);
			
			Attence attence=(Attence)attenceList.get(i-2);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Row.getCell(0).setCellValue(attence.getEmployee().getEmployeeName());
			Row.getCell(1).setCellValue(attence.getLocation());
			if(attence.getWorkinTime()!=null) {
				Row.getCell(2).setCellValue(sdf.format(attence.getWorkinTime()));
			}else{
				Row.getCell(2).setCellValue("");
			}
			if(attence.getWorkoutTime()!=null) {
				Row.getCell(3).setCellValue(sdf.format(attence.getWorkoutTime()));
			}else{
				Row.getCell(3).setCellValue("");
			}
			if(attence.getAttenceStatus()==AttenceStatus.EARLY) {
				Row.getCell(4).setCellValue("早退");
			}
			if(attence.getAttenceStatus()==AttenceStatus.LATER) {
				Row.getCell(4).setCellValue("迟到");
			}
			if(attence.getAttenceStatus()==AttenceStatus.LEAVE) {
				Row.getCell(4).setCellValue("请假");
			}
			if(attence.getAttenceStatus()==AttenceStatus.NORMAL) {
				Row.getCell(4).setCellValue("正常");
			}
			if(attence.getAttenceStatus()==AttenceStatus.TRIP) {
				Row.getCell(4).setCellValue("出差");
			}
			
		}
        response.setHeader("Content-disposition", "attachment;filename=attenceList.xlsx");//默认Excel名称
        response.flushBuffer();
        wb.write(response.getOutputStream());
    }
	
	@SystemControllerLog(description="判断有无该考勤列表")
	@RequestMapping("/judgeAttenceExcel")
	public ExtAjaxResponse judgeAttenceExcel(@RequestParam(name="month") String month,@RequestParam(name="storeName") String storeName) {
		
		List<Attence> attenceList=new ArrayList<Attence>();
		Date dmonth=ContractUtil.toDate(month);
		attenceList=attenceService.findByMonthAndStoreName(dmonth, storeName);
		if(attenceList!=null && !attenceList.isEmpty()) {
			return new ExtAjaxResponse(true,"success");
		}else {
			return new ExtAjaxResponse(false,"false");
		}
	}
	
	/*下载部门考勤表*/
	@SystemControllerLog(description="下载考勤信息")
	@RequestMapping("/downloadAttenceExcel")
    public void downloadAttenceExcel(@RequestParam(name="month") String month,@RequestParam(name="storeName") String storeName,HttpServletRequest request, HttpServletResponse response)throws IOException
    {  
		List<Attence> attenceList=new ArrayList<Attence>();
		Date dmonth=ContractUtil.toDate(month);
		attenceList=attenceService.findByMonthAndStoreName(dmonth, storeName);
		
	    //创建工作簿
		@SuppressWarnings("resource")
		XSSFWorkbook wb = new XSSFWorkbook();
		//创建一个sheet
		XSSFSheet sheet = wb.createSheet();
		
		// 创建单元格样式
		XSSFCellStyle style =  wb.createCellStyle();	
		
		//为单元格添加背景样式
		for (int i = 0; i < attenceList.size()+2; i++) { //需要6行表格
		    Row  row =	sheet.createRow(i); //创建行
			for (int j = 0; j < 6; j++) {//需要6列
				row.createCell(j).setCellStyle(style);
			}
		}
		
		//合并单元格
		sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 4));//合并单元格，cellRangAddress四个参数，第一个起始行，第二终止行，第三个起始列，第四个终止列
		
		//填入数据
		XSSFRow row = sheet.getRow(0); //获取第一行
		row.getCell(0).setCellValue(storeName+month+"考勤情况表"); //在第一行中创建一个单元格并赋值
		XSSFRow row1 = sheet.getRow(1);//获取第二行，为每一列添加字段
		row1.getCell(0).setCellValue("员工姓名");
		row1.getCell(1).setCellValue("部门名");
		row1.getCell(2).setCellValue("打卡地点");
		row1.getCell(3).setCellValue("上班时间");
		row1.getCell(4).setCellValue("下班时间");
		row1.getCell(5).setCellValue("上班状态");
		
		//从第三行开始插数据
		for (int i = 2; i < attenceList.size()+2; i++) {
			XSSFRow Row = sheet.getRow(i);
			
			Attence attence=(Attence)attenceList.get(i-2);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Row.getCell(0).setCellValue(attence.getEmployee().getEmployeeName());
			Row.getCell(1).setCellValue(attence.getEmployee().getLocalStore().getStoreName());
			Row.getCell(2).setCellValue(attence.getLocation());
			if(attence.getWorkinTime()!=null) {
				Row.getCell(3).setCellValue(sdf.format(attence.getWorkinTime()));
			}else{
				Row.getCell(3).setCellValue("");
			}
			if(attence.getWorkoutTime()!=null) {
				Row.getCell(4).setCellValue(sdf.format(attence.getWorkoutTime()));
			}else{
				Row.getCell(4).setCellValue("");
			}
			if(attence.getAttenceStatus()==AttenceStatus.EARLY) {
				Row.getCell(5).setCellValue("早退");
			}
			if(attence.getAttenceStatus()==AttenceStatus.LATER) {
				Row.getCell(5).setCellValue("迟到");
			}
			if(attence.getAttenceStatus()==AttenceStatus.LEAVE) {
				Row.getCell(5).setCellValue("请假");
			}
			if(attence.getAttenceStatus()==AttenceStatus.NORMAL) {
				Row.getCell(5).setCellValue("正常");
			}
			if(attence.getAttenceStatus()==AttenceStatus.TRIP) {
				Row.getCell(5).setCellValue("出差");
			}
			
		}
        response.setHeader("Content-disposition", "attachment;filename=allAttenceList.xlsx");//默认Excel名称
        response.flushBuffer();
        wb.write(response.getOutputStream());
    }
	
	/*----------------------------------------------申诉业务--------------------------------------------*/
	/**
	 * 启动流程
	 * @param leaveId	请假信息Id
	 * @param session	通过会话获取登录用户(请假人)
	 * @return
	 */
	@SystemControllerLog(description="启动申诉业务")
	@RequestMapping(value = "/start")
    public @ResponseBody ExtAjaxResponse start(@RequestParam(name="id") Long appealId,@RequestParam(name="appealreason") String appealreason,HttpSession session) {
    	try {
    		String userId = SessionUtil.getUserName(session);
    		Employee employee=employeeService.EmployeeName(userId);
    		Attence attence=attenceService.findById(appealId).get();
    		if(attence!=null) {
    			attence.setAppealreason(appealreason);
        		attenceService.save(attence);
    		}
    		
    		Map<String, Object> variables = new HashMap<String, Object>();
    		Employee deptLeader=employeeService.findByStoreNameandPost(employee.getLocalStore().getStoreName(), "经理");
    		variables.put("deptLeader", deptLeader.getEmployeeNumber());
    		
    		Employee hr=employeeService.findByStoreNameandPost(employee.getLocalStore().getStoreName(), "人事经理");
    		variables.put("hr", hr.getEmployeeNumber());
    		
    		variables.put("applyUserId", userId);
    		attenceService.startWorkflow(userId,appealId, variables);
    		return new ExtAjaxResponse(true,"操作成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"操作失败!");
	    }
    }
	
	/**
	 * 取消流程
	 * @param leaveId	请假信息Id
	 * @param session	通过会话获取登录用户(请假人)
	 * @return
	 */
	@SystemControllerLog(description="取消合同审批流程")
	@RequestMapping(value = "/cancel")
    public @ResponseBody ExtAjaxResponse cancel(@RequestParam(name="id") Long id,HttpSession session) {
    	try {
    		Attence attence=attenceService.findById(id).get();
    		String processInstanceId=attence.getProcessInstanceId();
    		attence.setProcessStatus(ProcessStatus.CANCEL);
    		runtimeService.deleteProcessInstance(processInstanceId,"删除原因");
    		return new ExtAjaxResponse(true,"操作成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"操作失败!");
	    }
    }
	/**
	 * 查询待处理流程任务
	 * @param pageable	分页对象
	 * @param session	通过会话获取登录用户(请假人)
	 * @return
	 */
	@SystemControllerLog(description="查询待处理流程任务")
	@RequestMapping(value = "/tasks")
    public @ResponseBody Page<AttenceDTO> findTodoTasks(HttpSession session,ExtjsPageRequest pageable) {
		Page<AttenceDTO> page = new PageImpl<AttenceDTO>(new ArrayList<AttenceDTO>(), pageable.getPageable(), 0);
    	try {
    		page = attenceService.findTodoTasks(SessionUtil.getUserName(session), pageable.getPageable());
	    } catch (Exception e) {
	    	e.printStackTrace();
	    }
    	return page;
    }
	
	/**
     * 签收任务
     */
	@SystemControllerLog(description="签收申诉任务")
    @RequestMapping(value = "claim/{id}")
    public @ResponseBody ExtAjaxResponse claim(@PathVariable("id") String taskId, HttpSession session) {
    	try{
    		attenceService.claim(taskId, SessionUtil.getUserName(session));
	    	return new ExtAjaxResponse(true,"任务签收成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"任务签收失败!");
	    }
    }
    
    /**
     * 完成任务
     * @param id
     * @return
     */
	@SystemControllerLog(description="完成申诉任务")
    @RequestMapping(value = "complete/{id}")
    public @ResponseBody ExtAjaxResponse complete(@PathVariable("id") String taskId, WorkflowVariable var) {
    	try{
    		Map<String, Object> variables = var.getVariableMap();
    		attenceService.complete(taskId, variables);
	    	return new ExtAjaxResponse(true,"审批成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"审批失败!");
	    }
    }
	
}
