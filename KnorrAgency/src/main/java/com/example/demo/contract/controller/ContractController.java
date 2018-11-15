package com.example.demo.contract.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.activiti.engine.RuntimeService;
import org.apache.poi.POIXMLTextExtractor;
import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.extractor.WordExtractor;
import org.apache.poi.hwpf.usermodel.Range;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.activiti.entity.ProcessStatus;
import com.example.demo.activiti.util.WorkflowVariable;
import com.example.demo.common.beans.BeanUtils;
import com.example.demo.common.controller.ExtAjaxResponse;
import com.example.demo.common.controller.ExtjsPageRequest;
import com.example.demo.common.controller.SessionUtil;
import com.example.demo.contract.entity.Contract;
import com.example.demo.contract.entity.ContractDTO;
import com.example.demo.contract.entity.ContractQueryDTO;
import com.example.demo.contract.service.IContractService;
import com.example.demo.contract.util.ContractUtil;
import com.example.demo.employee.domain.Employee;
import com.example.demo.employee.service.IEmployeeService;
import com.example.demo.log.config.SystemControllerLog;

@RestController
@RequestMapping("/contract")
public class ContractController {
	
	@Autowired
	private IContractService contractService;
	
	@Autowired
	private IEmployeeService employeeService;
	
	@Autowired
	private RuntimeService runtimeService;
	
	/*----------------------------------------------系统业务--------------------------------------------*/
	/*save*/
	@SystemControllerLog(description="保存合同信息")
	@PostMapping
	public ExtAjaxResponse saveOne(HttpSession session,@RequestBody Contract contract) {
		try {
			String userId = SessionUtil.getUserName(session);
			String contractNumber=ContractUtil.getContractNumber(contract.getContractType());
			if(userId!=null) {
				contract.setUserId(userId);
				contract.setProcessStatus(ProcessStatus.NEW);
				Employee employee=employeeService.EmployeeName(userId);
				contract.setEmployee(employee);
				contract.setContractNumber(contractNumber);
				contractService.save(contract);
    		}
			return new ExtAjaxResponse(true,"保存成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(false,"保存失败！");
		}
		
	}
	
	/*update*/
	@SystemControllerLog(description="更新合同信息")
	@PutMapping(value="{id}")  
	public ExtAjaxResponse update(@PathVariable("id") Long Id,@RequestBody Contract dto) {
		
		try {
			Contract entity = contractService.findById(Id).get();
			if(entity!=null) {
				BeanUtils.copyProperties(dto, entity);//使用自定义的BeanUtils
				contractService.save(entity);
			}
			return new ExtAjaxResponse(true,"更新成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(true,"更新失败！");
		}
	}
	
	/*delete one*/
	@SystemControllerLog(description="删除一条合同信息")
	@DeleteMapping(value="{id}")    
	public ExtAjaxResponse deleteById(@PathVariable("id") Long id) {
		
		try {
			Optional<Contract> contract=contractService.findById(id);
			if(contract.get()!=null) {
				contract.get().setEmployee(null);
				contractService.deleteById(id);
			}
			return new ExtAjaxResponse(true,"删除成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(false,"无该合同信息,删除失败！");
		}
		
	}
	
	/*delete rows*/
	@SystemControllerLog(description="删除多条合同信息")
	@PostMapping("/deletes")
	public ExtAjaxResponse deleteRows(@RequestParam(name="ids") Long[] ids) {
		
		try {
			if(ids!=null) {
				for (int i = 0; i < ids.length; i++) {
					Contract contract=contractService.findById(ids[i]).get();
					contract.setEmployee(null);
					contractService.deleteById(ids[i]);
				}
			}
			return new ExtAjaxResponse(true,"批量删除成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(false,"批量删除失败！");
		}
		
	}
	
	
	
	/*search one*/
	@SystemControllerLog(description="查看合同信息")
	@GetMapping(value="{id}")  
	public Contract findById(@PathVariable("id") Long id){
		return contractService.findById(id).get();
		
	}
	
	/*动态查询*/
	@SystemControllerLog(description="查看合同信息")
	@GetMapping 
	public Page<ContractDTO> getPage(HttpSession session,ContractQueryDTO contractQueryDTO,ExtjsPageRequest pageRequest) {
		
		String userId = SessionUtil.getUserName(session);  //通过session查找userId
		if(userId!=null) {
			Employee employee=employeeService.EmployeeName(userId);
			contractQueryDTO.setEmployeeName(employee.getEmployeeName());
		}
		return contractService.findAll(ContractQueryDTO.getWhereClause(contractQueryDTO), pageRequest.getPageable());
		
	}
	
	/*上传word文档*/
	@SystemControllerLog(description="上传合同信息")
	@PostMapping("/uploadWord")
    public @ResponseBody ExtAjaxResponse uploadWord(@RequestParam(value = "file", required = true) MultipartFile file) {
		// 获取上传的文件名
        String fileName = file.getOriginalFilename();
        System.out.println("fileName:"+fileName);
        String buffer="";
        try {
        	
        	if (fileName.endsWith(".doc")) {
    			InputStream is = file.getInputStream();
    			WordExtractor doc = new WordExtractor(is);
    			buffer = doc.getText();
    			doc.close();
    			Contract c=contractService.readWord(buffer);
    			if(c!=null) {
    				System.out.println("yes");
    				c.setProcessStatus(ProcessStatus.NEW);
    				contractService.save(c);
    			}
    			
    		} else if (fileName.endsWith("docx")) {
    			InputStream is = file.getInputStream();
                XWPFDocument docx = new XWPFDocument(is);
    			POIXMLTextExtractor extractor = new XWPFWordExtractor(docx);
    			buffer = extractor.getText();
    			extractor.close();
    			Contract c=contractService.readWord(buffer);
    			if(c!=null) {
    				c.setProcessStatus(ProcessStatus.NEW);
    				contractService.save(c);
    			}
    		} else {
    			System.out.println("此文件不是word文件！");
    		}
        	 return new ExtAjaxResponse(true,"上传成功!");
		} catch (Exception e) {
			 return new ExtAjaxResponse(false,"上传失败!");
		}
		
	}
	
	@SystemControllerLog(description="下载合同信息")
	@RequestMapping("/downloadWord")
    public void downloadWord(@RequestParam("id")Long id,HttpServletRequest request, HttpServletResponse response)throws IOException{
		
		Contract contract=contractService.findById(id).get();
		
		String tmpFile = "classpath:template.doc";
		FileInputStream tempFileInputStream = new FileInputStream(ResourceUtils.getFile(tmpFile));
		
		Map<String, String> datas = new HashMap<String, String>();
	    datas.put("contractNumber", contract.getContractNumber());
	    datas.put("startTime", contract.getStartTime().toString());
	    datas.put("endTime", contract.getEndTime().toString());
	    datas.put("houseName", contract.getHouseName());
	    datas.put("customerName", contract.getCustomerName());
	    datas.put("employeeName", contract.getEmployee().getEmployeeName());
	    datas.put("total", String.valueOf(contract.getTotal()));
	    if(contract.getProcessStatus()==ProcessStatus.NEW) {
	    	datas.put("processStatus", "未通过审核");
	    }
	    if(contract.getProcessStatus()==ProcessStatus.COMPLETE) {
	    	datas.put("processStatus", "已通过审核");
	    }
		@SuppressWarnings("resource")
		HWPFDocument document = new HWPFDocument(tempFileInputStream);
	    // 读取文本内容
	    Range bodyRange = document.getRange();
	    // 替换内容
	    for (Map.Entry<String, String> entry : datas.entrySet()) {
	        bodyRange.replaceText("${" + entry.getKey() + "}", entry.getValue());
	    }
	    
	    //下载后的文件名
	    String fileName="KnorrContract"+contract.getContractNumber()+".doc";
	    fileName = new String(fileName.getBytes("ISO8859-1"),"UTF-8");
	    
	    response.setHeader("Content-disposition", "attachment;filename="+fileName);
        response.flushBuffer();
        document.write(response.getOutputStream());
	}
	
	
	
	/*下载合同模板*/
	@SystemControllerLog(description="下载合同模板")
	@RequestMapping("/downloadTemplate")
    public void downloadTemplate(HttpServletRequest request, HttpServletResponse response)throws IOException
    {  
		String fileName="ContractTemplate.doc";
		//获取用户下载的文件名称
		fileName = new String(fileName.getBytes("ISO8859-1"),"UTF-8");
		//获取文件上传路径
		String basePath = request.getSession().getServletContext().getRealPath("/upload/");
		//获取一个文件流
		InputStream in = new FileInputStream(new File(basePath, fileName));
		//进行中文处理
		fileName = URLEncoder.encode(fileName, "UTF-8");
		//设置下载的响应头
		response.setHeader("content-disposition", "attachment;fileName="+fileName);
		//获取response字节流
		OutputStream out = response.getOutputStream();
		byte[] b = new byte[1024];
		int len = -1;
		while ((len = in.read(b)) != -1) {
			out.write(b, 0, len);
		}
		//关闭
		out.close();
		in.close();
	   
    }
	
	
	/*-------------------------------------流程引擎web层------------------------------------------*/
	/**
	 * 启动流程
	 * @param leaveId	请假信息Id
	 * @param session	通过会话获取登录用户(请假人)
	 * @return
	 */
	@SystemControllerLog(description="启动合同审批流程")
	@RequestMapping(value = "/start")
    public @ResponseBody ExtAjaxResponse start(@RequestParam(name="id") Long contractId,HttpSession session) {
    	try {
    		String userId = SessionUtil.getUserName(session);
    		Employee employee=employeeService.EmployeeName(userId);
    		Map<String, Object> variables = new HashMap<String, Object>();
    		
    		Employee deptLeader=employeeService.findByStoreNameandPost(employee.getLocalStore().getStoreName(), "财务经理");
    		variables.put("deptLeader", deptLeader.getEmployeeNumber());
    		
    		Employee manLeader=employeeService.findByStoreNameandPost(employee.getLocalStore().getStoreName(), "经理");
    		variables.put("manLeader", manLeader.getEmployeeNumber());
    		
    		variables.put("applyUserId", userId);
    		contractService.startWorkflow(userId,contractId, variables);
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
    		Contract contract=contractService.findById(id).get();
    		String processInstanceId=contract.getProcessInstanceId();
    		contract.setProcessStatus(ProcessStatus.CANCEL);
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
	@SystemControllerLog(description="查询待处理合同审批任务")
	@RequestMapping(value = "/tasks")
    public @ResponseBody Page<ContractDTO> findTodoTasks(HttpSession session,ExtjsPageRequest pageable) {
		Page<ContractDTO> page = new PageImpl<ContractDTO>(new ArrayList<ContractDTO>(), pageable.getPageable(), 0);
    	try {
    		page = contractService.findTodoTasks(SessionUtil.getUserName(session), pageable.getPageable());
	    } catch (Exception e) {
	    	e.printStackTrace();
	    }
    	return page;
    }
	
	/**
     * 签收任务
     */
	@SystemControllerLog(description="签收合同审批任务")
    @RequestMapping(value = "claim/{id}")
    public @ResponseBody ExtAjaxResponse claim(@PathVariable("id") String taskId, HttpSession session) {
    	try{
    		contractService.claim(taskId, SessionUtil.getUserName(session));
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
	@SystemControllerLog(description="完成合同审批任务")
    @RequestMapping(value = "complete/{id}")
    public @ResponseBody ExtAjaxResponse complete(@PathVariable("id") String taskId, WorkflowVariable var) {
    	try{
    		Map<String, Object> variables = var.getVariableMap();
    		contractService.complete(taskId, variables);
	    	return new ExtAjaxResponse(true,"审批成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"审批失败!");
	    }
    }
	
	
}
