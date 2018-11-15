package com.example.demo.leave.listener;

import org.activiti.engine.IdentityService;
import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.ExecutionListener;

public class SetMailInfo implements ExecutionListener {
	
	private static final long serialVersionUID = 1L;
	
	IdentityService identityService;
	@Override
	public void notify(DelegateExecution execution) {
		
		String applyUserId = (String) execution.getVariable("applyUserId");
		execution.setVariableLocal("name", applyUserId);
		// User user = identityService.createUserQuery().userId(applyUserId).singleResult();
		
	}

}

