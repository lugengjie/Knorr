package com.example.demo.attence.listener;

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

@Component
@Transactional
public class ComfirEndProcessor implements TaskListener 
{
	private static final long serialVersionUID = -8360605214753688651L;

	@Autowired
    private IAttenceService attenceService;
	
    @Autowired
    private RuntimeService runtimeService;
    
    public void notify(DelegateTask delegateTask) {
    	
        String processInstanceId = delegateTask.getProcessInstanceId();
        ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();
        Attence attence = attenceService.findById(new Long(processInstance.getBusinessKey())).get();

        attence.setProcessStatus(ProcessStatus.COMPLETE);
        attence.setAttenceStatus(AttenceStatus.NORMAL);
        attenceService.save(attence);
       
    }
}
