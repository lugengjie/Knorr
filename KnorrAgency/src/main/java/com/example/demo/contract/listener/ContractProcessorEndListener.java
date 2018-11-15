package com.example.demo.contract.listener;

import org.activiti.engine.RuntimeService;
import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;
import org.activiti.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.activiti.entity.ProcessStatus;
import com.example.demo.contract.entity.Contract;
import com.example.demo.contract.service.IContractService;


@Component
@Transactional
public class ContractProcessorEndListener implements TaskListener{
	
	private static final long serialVersionUID = -8360605214753688651L;

	@Autowired
    private IContractService contractService;

    @Autowired
    private RuntimeService runtimeService;
    
    public void notify(DelegateTask delegateTask) {
    	
        String processInstanceId = delegateTask.getProcessInstanceId();
        ProcessInstance processInstance = runtimeService.createProcessInstanceQuery().processInstanceId(processInstanceId).singleResult();
        Contract contract = contractService.findById(new Long(processInstance.getBusinessKey())).get();

        contract.setProcessStatus(ProcessStatus.COMPLETE);
        //leaveService.save(leave);
    }
}

