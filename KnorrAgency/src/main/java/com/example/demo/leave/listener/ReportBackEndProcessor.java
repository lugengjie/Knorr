package com.example.demo.leave.listener;

import org.activiti.engine.RuntimeService;
import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;
import org.activiti.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.activiti.entity.ProcessStatus;
import com.example.demo.attence.entity.Attence;
import com.example.demo.attence.entity.AttenceStatus;
import com.example.demo.attence.service.IAttenceService;
import com.example.demo.attence.utils.AttenceUtil;
import com.example.demo.employee.domain.Employee;
import com.example.demo.employee.service.IEmployeeService;
import com.example.demo.leave.entity.Leave;
import com.example.demo.leave.service.ILeaveService;

import java.util.Date;
import java.util.List;

/**
 * 销假后处理器
 * <p>设置销假时间</p>
 * <p>使用Spring代理，可以注入Bean，管理事物</p>
 * bean  id=reportBackEndProcessor
 */
@Component
@Transactional
public class ReportBackEndProcessor implements TaskListener 
{
	private static final long serialVersionUID = -8360605214753688651L;

	@Autowired
    private ILeaveService leaveService;
	
	@Autowired
    private IAttenceService attenceService;
	
	@Autowired
    private IEmployeeService employeeService;

    @Autowired
    private RuntimeService runtimeService;
    
    public void notify(DelegateTask delegateTask) {
    	
        String processInstanceId = delegateTask.getProcessInstanceId();
        ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();
        Leave leave = leaveService.findOne(new Long(processInstance.getBusinessKey()));

        Object realityStartTime = delegateTask.getVariable("realityStartTime");
        leave.setRealityStartTime((Date) realityStartTime);
        Object realityEndTime = delegateTask.getVariable("realityEndTime");
        leave.setRealityEndTime((Date) realityEndTime);
        leave.setProcessStatus(ProcessStatus.COMPLETE);
        
        
        
        String userId=leave.getUserId();
        Date dBegin=(Date) realityStartTime;
        Date dEnd=(Date) realityEndTime;
        List<Date> dList=AttenceUtil.findDates(dBegin, dEnd);
        for(Date date:dList) {
        	Attence attence=new Attence();
        	Employee e=employeeService.EmployeeName(userId);
        	if(e!=null) {
        		attence.setEmployee(e);
        	}
			attence.setLocation("广东省东莞市");
			attence.setWorkinTime(date);
			attence.setWorkoutTime(date);
			attence.setDay(AttenceUtil.getDateByYMD(date));
			attence.setAttenceStatus(AttenceStatus.LEAVE);
			attenceService.save(attence);
		}
        //leaveService.save(leave);
    }
}

