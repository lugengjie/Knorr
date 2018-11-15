package com.example.demo.email.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

import com.example.demo.common.beans.BeanUtils;
import com.example.demo.common.controller.ExtAjaxResponse;
import com.example.demo.common.controller.ExtjsPageRequest;
import com.example.demo.common.controller.SessionUtil;
import com.example.demo.email.entity.Email;
import com.example.demo.email.entity.EmailDTO;
import com.example.demo.email.entity.EmailQueryDTO;
import com.example.demo.email.entity.EmailStatus;
import com.example.demo.email.service.IEmailService;
import com.example.demo.employee.domain.Employee;
import com.example.demo.employee.service.IEmployeeService;
import com.example.demo.log.config.SystemControllerLog;

@RestController
@RequestMapping("/email")
public class EmailController {
	
	@Autowired
	private IEmailService emailService;
	
	@Autowired
	private IEmployeeService employeeService;
	
	/*findEdit*/
	@SystemControllerLog(description="查询草稿箱")
	@GetMapping 
	public Page<EmailDTO> findEdit(HttpSession session,EmailQueryDTO emailQueryDTO,ExtjsPageRequest pageRequest) {
		
		String userId = SessionUtil.getUserName(session);  //通过session查找userId
		if(userId!=null) {
			emailQueryDTO.setEmployeeName(userId);
			emailQueryDTO.setEmailStatus(0);
			emailQueryDTO.setInboxStatus(0);
		}
		return emailService.findAll(EmailQueryDTO.getWhereClause(emailQueryDTO), pageRequest.getPageable());
	}
	
	
	/*findInbox*/
	@SystemControllerLog(description="查询收件箱")
	@RequestMapping("/findInbox") 
	public Page<EmailDTO> findInbox(HttpSession session,EmailQueryDTO emailQueryDTO,ExtjsPageRequest pageRequest) {
		
		String userId = SessionUtil.getUserName(session);  //通过session查找userId
		if(userId!=null) {
			emailQueryDTO.setEmailTo(userId);
			emailQueryDTO.setEmailStatus(1);
			emailQueryDTO.setInboxStatus(2);
		}
		return emailService.findAll(EmailQueryDTO.getWhereClause(emailQueryDTO), pageRequest.getPageable());
	}
	
	/*findSend*/
	@SystemControllerLog(description="查询已发送")
	@RequestMapping("/findSend") 
	public Page<EmailDTO> findSend(HttpSession session,EmailQueryDTO emailQueryDTO,ExtjsPageRequest pageRequest) {
		
		String userId = SessionUtil.getUserName(session);  //通过session查找userId
		if(userId!=null) {
			emailQueryDTO.setEmployeeName(userId);
			emailQueryDTO.setEmailStatus(1);
			emailQueryDTO.setInboxStatus(2);
		}
		return emailService.findAll(EmailQueryDTO.getWhereClause(emailQueryDTO), pageRequest.getPageable());
	}
	
	/*save*/
	@SystemControllerLog(description="保存信息")
	@PostMapping
	public ExtAjaxResponse saveOne(HttpSession session,@RequestBody Email email) {
		
		try {
			String userId = SessionUtil.getUserName(session);
			if(userId!=null) {
				Employee employee=employeeService.EmployeeName(userId);
				email.setEmailFrom(userId);
				email.setEmployee(employee);
				email.setSendTime(new Date());
				emailService.save(email);
    		}
			return new ExtAjaxResponse(true,"保存成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(false,"保存失败！");
		}
		
	}
	/*update*/
	@SystemControllerLog(description="更新信息")
	@PutMapping(value="{id}")  
	public ExtAjaxResponse update(@PathVariable("id") Long Id,@RequestBody Email dto) {
		
		try {
			Email entity = emailService.findOne(Id);
			if(entity!=null) {
				BeanUtils.copyProperties(dto, entity);//使用自定义的BeanUtils
				entity.setSendTime(new Date());
				emailService.save(entity);
			}
			return new ExtAjaxResponse(true,"更新成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(true,"更新失败！");
		}
	}
	/*send one*/
	@SystemControllerLog(description="发送一条")
	@PostMapping("/sendOne")
	public ExtAjaxResponse sendOne(@RequestParam(name="id") Long id) {
		
		try {
			Email email=emailService.findOne(id);
			if(email!=null) {
				email.setEmailStatus(EmailStatus.SEND);
				email.setInboxStatus(EmailStatus.INBOX);
				email.setReadStatus(EmailStatus.NOREAD);
				email.setReplyStatus(EmailStatus.NOREPLY);
				email.setSendTime(new Date());
				emailService.save(email);
			}
			return new ExtAjaxResponse(true,"发送成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(false,"发送失败！");
		}
		
	}
	
	/*send More*/
	@SystemControllerLog(description="发送多条")
	@PostMapping("/sendMore")
	public ExtAjaxResponse sendMore(@RequestParam(name="ids") Long[] ids) {
		
		try {
			for (int i = 0; i < ids.length; i++) {
				Email email=emailService.findOne(ids[i]);
				if(email!=null) {
					email.setEmailStatus(EmailStatus.SEND);
					email.setInboxStatus(EmailStatus.INBOX);
					email.setReadStatus(EmailStatus.NOREAD);
					email.setReplyStatus(EmailStatus.NOREPLY);
					email.setSendTime(new Date());
					emailService.save(email);
				}
			}
			return new ExtAjaxResponse(true,"批量发送成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(false,"批量发送失败！");
		}
		
	}
	
	/*回复*/
	@SystemControllerLog(description="回复")
	@PostMapping("/reply")
	public ExtAjaxResponse reply(HttpSession session,@RequestParam(name="id") Long id,@RequestParam(name="replyEmailContent") String replyEmailContent,@RequestParam(name="replyEmailAttachment")String replyEmailAttachment) {
		String userId = SessionUtil.getUserName(session);
		try {
			Email email=emailService.findOne(id);
			email.setReplyStatus(EmailStatus.REPLY);
			if(email!=null) {
				Email reply=new Email();
				reply.setEmailFrom(userId);
				reply.setEmailTo(email.getEmailFrom());
				reply.setEmailContent(replyEmailContent);
				reply.setEmailSubject("<"+userId+">"+"<回复件>");
				reply.setEmailAttachment(replyEmailAttachment);
				reply.setSendTime(new Date());
				Employee employee=employeeService.EmployeeName(userId);
				reply.setEmployee(employee);
				reply.setEmailStatus(EmailStatus.SEND);
				reply.setInboxStatus(EmailStatus.INBOX);
				reply.setReadStatus(EmailStatus.NOREAD);
				reply.setReplyStatus(EmailStatus.NOREPLY);
				emailService.save(email);
				emailService.save(reply);
				
			}
			return new ExtAjaxResponse(true,"回复成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(false,"回复失败！");
		}
		
	}
	
	
	/*已读一条*/
	@SystemControllerLog(description="已读一条")
	@PostMapping("/readOne")
	public ExtAjaxResponse readOne(@RequestParam(name="id") Long id) {
		
		try {
			Email email=emailService.findOne(id);
			if(email!=null) {
				email.setReadStatus(EmailStatus.READ);
				emailService.save(email);
			}
			return new ExtAjaxResponse(true,"打开成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(false,"打开失败！");
		}
		
	}
	
	/*已读一条*/
	@SystemControllerLog(description="已读多条")
	@PostMapping("/readMore")
	public ExtAjaxResponse readMore(@RequestParam(name="ids") Long[] ids) {
		
		try {
			for (int i = 0; i < ids.length; i++) {
				Email email=emailService.findOne(ids[i]);
				if(email!=null) {
					email.setReadStatus(EmailStatus.READ);
					emailService.save(email);
				}
			}
			return new ExtAjaxResponse(true,"已读成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(false,"已读失败！");
		}
		
	}
	
	/*delete one*/
	@SystemControllerLog(description="删除一条信息")
	@DeleteMapping(value="{id}")    
	public ExtAjaxResponse deleteById(@PathVariable("id") Long id) {
		
		try {
			Email email=emailService.findOne(id);
			if(email!=null) {
				email.setEmployee(null);
				emailService.delete(id);
			}
			return new ExtAjaxResponse(true,"删除成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(false,"删除失败！");
		}
		
	}
	/*delete rows*/
	@SystemControllerLog(description="删除多条信息")
	@PostMapping("/deletes")
	public ExtAjaxResponse deleteRows(@RequestParam(name="ids") Long[] ids) {
		
		try {
			if(ids!=null) {
				emailService.deleteAll(ids);
			}
			return new ExtAjaxResponse(true,"批量删除成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(false,"批量删除失败！");
		}
		
	}
	
	@SystemControllerLog(description="修改")
	@RequestMapping("/update")
    public ExtAjaxResponse update(HttpSession session,Email email) {
    	try {
    		System.out.println(email.getId());
    		return new ExtAjaxResponse(true,"保存成功!");
	    } catch (Exception e) {
	    	e.printStackTrace();
	        return new ExtAjaxResponse(false,"保存失败!");
	    }
    }
	
	@SystemControllerLog(description="上传附件")
	@PostMapping("/uploadAttachment")
    @ResponseBody
    public ExtAjaxResponse uploadAttachment(@RequestParam("file") MultipartFile file, HttpServletRequest request,HttpSession session) {
		String userId = SessionUtil.getUserName(session);
		if (!file.isEmpty()) {
            String saveFileName = file.getOriginalFilename();
            System.out.println(saveFileName);
            File saveFile = new File(request.getSession().getServletContext().getRealPath("/upload/"+userId+"/") + saveFileName);
            if (!saveFile.getParentFile().exists()) {
                saveFile.getParentFile().mkdirs();
            }
            try {
                BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(saveFile));
                out.write(file.getBytes());
                out.flush();
                out.close();
                return new ExtAjaxResponse(true,saveFileName);
            } catch (FileNotFoundException e) {
                e.printStackTrace();
                return new ExtAjaxResponse(false,"上传失败");
            } catch (IOException e) {
                e.printStackTrace();
                return new ExtAjaxResponse(false,"上传失败");
            }
        } else {
        	return new ExtAjaxResponse(false,"文件不能为空");
        }
    }
	
	@SystemControllerLog(description="下载附件")
	@RequestMapping("/downloadAttachment")
	public void downloadAttachment(@RequestParam("fileName") String fileName,HttpServletRequest request, HttpServletResponse response,HttpSession session) throws IOException  {
		String userId = SessionUtil.getUserName(session);
		//获取用户下载的文件名称
		fileName = new String(fileName.getBytes("ISO8859-1"),"UTF-8");
		//获取文件上传路径
		String basePath = request.getSession().getServletContext().getRealPath("/upload/"+userId+"/");
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
	
	@SystemControllerLog(description="删除附件")
	@PostMapping("/deleteAttachment")
    @ResponseBody
    public ExtAjaxResponse deleteAttachment(@RequestParam("fileName") String fileName, HttpServletRequest request,HttpSession session) {
		String userId = SessionUtil.getUserName(session);
		String path=request.getSession().getServletContext().getRealPath("/upload/"+userId+"/");
		String realPath=path+fileName;
		try {
			File fileTemp=new File(realPath);
			if(fileTemp.exists()) {
				fileTemp.delete();
				return new ExtAjaxResponse(true,"附件删除成功");
			}else {
				return new ExtAjaxResponse(false,"附件删除失败");
			}
		} catch (Exception e) {
			e.printStackTrace();
            return new ExtAjaxResponse(false,"附件删除失败");
		}
	}

}
