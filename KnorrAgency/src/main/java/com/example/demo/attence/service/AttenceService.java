package com.example.demo.attence.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.activiti.engine.runtime.ProcessInstance;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.example.demo.activiti.entity.ProcessStatus;
import com.example.demo.activiti.entity.WorkflowDTO;
import com.example.demo.activiti.service.IWorkflowService;
import com.example.demo.attence.entity.Attence;
import com.example.demo.attence.entity.AttenceDTO;
import com.example.demo.attence.entity.AttenceQueryDTO;
import com.example.demo.attence.repository.AttenceRepository;

@Service
@Transactional
public class AttenceService implements IAttenceService {
	
	@Autowired
	private AttenceRepository attenceRepository;
	
	@Autowired 
	private IWorkflowService workflowService;
	
	private String depreason=null;
	private String hrreason=null;
	
	
	/**************************************考勤业务*****************************************/
	@Override
	public void save(Attence attence) {
		attenceRepository.save(attence);
	}

	@Override
	public void deleteById(Long id) {
		attenceRepository.deleteById(id);
	}

	@Override
	public void deleteAll(Long[] ids) {
		List<Long> idLists = new ArrayList<Long>(Arrays.asList(ids));
		
		List<Attence> attenceLists=(List<Attence>) attenceRepository.findAllById(idLists);
		
		if(attenceLists!=null) {
			attenceRepository.deleteAll(attenceLists);
		}
	}

	@Override
	public Optional<Attence> findById(Long id) {
		return attenceRepository.findById(id);
	}

	@Override
	public Page<AttenceDTO> findAll(Specification<Attence> spec, Pageable pageable) {
		Page<Attence> list =  attenceRepository.findAll(spec, pageable);
		List<AttenceDTO> dtoLists = new ArrayList<AttenceDTO>();
		for (Attence entity : list.getContent()) {
			AttenceDTO dto = new AttenceDTO();
			BeanUtils.copyProperties(entity, dto);
			if(entity.getEmployee()!=null) {
				dto.setEmployeeName(entity.getEmployee().getEmployeeName());
				if(entity.getEmployee().getLocalStore()!=null) {
					dto.setStoreName(entity.getEmployee().getLocalStore().getStoreName());
				}
			}
			dtoLists.add(dto);
		}
		return new PageImpl<AttenceDTO>(dtoLists, pageable, list.getTotalElements());
	}

	@Override
	public int findAttence(String employeeName) {
		
		 /*取得当前时间的零点*/
	    Calendar todayStart = Calendar.getInstance();		
		todayStart.set(Calendar.HOUR_OF_DAY, 0);		
		todayStart.set(Calendar.MINUTE, 0);		
		todayStart.set(Calendar.SECOND, 0);
		
		/*按用户名和当天时间查该用户是否已打卡*/
		AttenceQueryDTO dto=new AttenceQueryDTO();
		dto.setEmployeeName(employeeName);
		dto.setWorkinTime(todayStart.getTime());
		List<Attence> attenceList=new ArrayList<Attence>();
		
		attenceList=attenceRepository.findAll(AttenceQueryDTO.getWhereClause(dto));
		if(attenceList!=null) {
			for(Attence attence:attenceList) {
				if(attence.getWorkoutTime()==null) {
					return 1; //已上班但未下班
				}else {
					return 2; //已经下班
				}
			}
		}else {
			return 0;  //未上班
		}
		return 0;
	}
	
	@Override
	public List<Attence> findByEmployeeName(Specification<Attence> spec) {
		return attenceRepository.findAll(spec);
	}
	
	@Override
	public List<Attence> findByMonthAndStoreName(Date month, String storeName) {
		return attenceRepository.findByMonthAndStoreName(month, storeName);
	}

	@Override
	public List<Attence> findByMonth(Date month, String employeeName) {
		return attenceRepository.findByMonth(month, employeeName);
	}
	
	/**************************************申诉业务*****************************************/
	/**
     * 开始申诉流程
     *
     * @param userId 用户ID
     * @param pageable 分页条件
     * @return
     */
	@Override
	public void startWorkflow(String userId, Long attenceId, Map<String, Object> variables) {
		//1.声明流程实例
		ProcessInstance processInstance = null;
		//2.获取创建好的申诉实例
		Attence attence=attenceRepository.findById(attenceId).get();
		if(attence!=null) {
			try {
				processInstance = workflowService.startWorkflow(userId, "appeal", attence.getId().toString(), variables);
				attence.setProcessStatus(ProcessStatus.APPROVAL);
				attence.setProcessInstanceId(processInstance.getId());
				//leave.setApplyTime(new Date());
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
	}
	
	/**
     * 查询待办任务
     *
     * @param userId 用户ID
     * @param pageable 分页条件
     * @return
     */
	@Override
	public Page<AttenceDTO> findTodoTasks(String userId, Pageable pageable) {
		List<AttenceDTO> results = null;
		List<WorkflowDTO> workflowLists = workflowService.findTodoTasks(userId);
		// 根据流程的业务ID查询实体并关联
		if(null!=workflowLists) {
			results = new ArrayList<AttenceDTO>();
			for (WorkflowDTO workflow : workflowLists) {
	        	Long businessKey = new Long(workflow.getBusinessKey());
	            if (workflow.getBusinessKey() == null) {
	                continue;
	            }
	            Optional<Attence> attenceOptional=attenceRepository.findById(businessKey);
	            if(attenceOptional!=null&&attenceOptional.isPresent()){
	            	Attence attence=attenceOptional.get();
	            	AttenceDTO attenceDTO = new AttenceDTO();
	            	BeanUtils.copyProperties(attence, attenceDTO);
	            	BeanUtils.copyProperties(workflow, attenceDTO);
	            	attenceDTO.setDeptLeaderBackReason(depreason);
	            	attenceDTO.setHrBackReason(hrreason);
	            	attenceDTO.setEmployeeName(attence.getEmployee().getEmployeeName());
	            	attenceDTO.setProcessInstanceId(attence.getProcessInstanceId());
	            	attence.setDeptLeaderBackReason(depreason);
	            	attence.setHrBackReason(hrreason);
	            	
	            	results.add(attenceDTO);
	            }
	        }
		}
		return new PageImpl<AttenceDTO> (results, pageable, null!=results?results.size():0);
	}
	
	
	/**
     * 签收流程任务
     *
     * @param taskId 任务ID
     * @param userId 签收人用户ID
     * @return
     */
	@Override
	public void claim(String taskId, String userId) {
		workflowService.claim(taskId, userId);
	}
	
	/**
     * 完成流程任务
     *
     * @param taskId 任务ID
     * @param variables 流程变量
     * @return
     */
	@Override
	public void complete(String taskId, Map<String, Object> variables) {
		//流程变量的处理
		if(variables.containsKey("confirmName")) {
			depreason=null;
			hrreason=null;
		}
		if(variables.containsKey("deptLeaderPass")&&(boolean) variables.get("deptLeaderPass")) {
			depreason="同意";
		}
		if(variables.containsKey("hrPass")&&(boolean) variables.get("hrPass")) {
			hrreason="同意";
		}
		if(variables.containsKey("deptLeaderBackReason")) {
			depreason=(String) variables.get("deptLeaderBackReason");
		}
		if(variables.containsKey("hrBackReason")) {
			hrreason=(String) variables.get("hrBackReason");
		}
		workflowService.complete(taskId, variables);
	}

}
