package com.example.demo.person.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.example.demo.common.controller.ExtAjaxResponse;
import com.example.demo.common.utils.ImageCheckByName;
import com.example.demo.common.utils.MD5;
import com.example.demo.employee.domain.Employee;
import com.example.demo.employee.domain.EmployeeDTO;
import com.example.demo.employee.repository.EmployeeRepository;
import com.example.demo.employee.util.ExtjsPageRequest;

@RestController
@RequestMapping("/person")
public class PersonController {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	//查找你的所有同事
	@GetMapping(value="/getColleague")
	public Page<EmployeeDTO> getColleague(HttpSession session,ExtjsPageRequest pageable){
		String en=(String) session.getAttribute("employeeNumber");
		if(StringUtils.isNotBlank(en)) {
			Employee employee=employeeRepository.findByEmployeeNumber(en);
			if(employee!=null) {
				List<EmployeeDTO> employeeDTOList=new ArrayList<EmployeeDTO>();
				for(Employee entity:employee.getLocalStore().getEmployeeList()) {
					if(!entity.getEmployeeNumber().equals(en)) {
						EmployeeDTO employeeDTO=new EmployeeDTO();
						employeeDTO.setId(entity.getId());
						employeeDTO.setPicture(entity.getPicture());
						employeeDTO.setEmployeeNumber(entity.getEmployeeNumber());
						employeeDTO.setEmployeeName(entity.getEmployeeName());
						employeeDTO.setPost(entity.getPost());
						employeeDTOList.add(employeeDTO);
					}
				}
				return new PageImpl<EmployeeDTO>(employeeDTOList);
			}else return null;
		}else
			return null;
	}
	
	//查找你的个人信息
	@GetMapping(value="/getPersonal")
	public ExtAjaxResponse getPersonal(HttpSession session) {
		String en=(String) session.getAttribute("employeeNumber");
		if(StringUtils.isNotBlank(en)) {
			Employee employee=employeeRepository.findByEmployeeNumber(en);
			if(employee!=null) {
				Map<String, String> map=new HashMap<String, String>();
				map.put("picture", employee.getPicture());
				map.put("employeeNumber", employee.getEmployeeNumber());
				map.put("employeeName", employee.getEmployeeName());
				map.put("email", employee.getEmail());
				map.put("post", employee.getPost());
				map.put("storeName", employee.getLocalStore().getStoreName());
				map.put("storeNumber", employee.getLocalStore().getStoreNumber());
				map.put("storeArea", employee.getLocalStore().getStoreArea());
				map.put("quotation", employee.getQuotation());
				return new ExtAjaxResponse(true,map);
			}else return null;
		}else return null;
	}
	
	//修改你的个人信息，其实只能修改email和quotation。修改密码后面再说
	@GetMapping(value="/editPersonal")
	public ExtAjaxResponse editPersonal(@RequestParam("email") String email,@RequestParam("quotation") String quotation,HttpSession session) {
		String en=(String) session.getAttribute("employeeNumber");
		if(StringUtils.isNotBlank(en)) {
			Employee employee=employeeRepository.findByEmployeeNumber(en);
			if(employee!=null) {
				if(StringUtils.isNotBlank(email)) {
					employee.setEmail(email);
				}
				if(StringUtils.isNotBlank(quotation)) {
					employee.setQuotation(quotation);
				}
				employeeRepository.save(employee);
				return new ExtAjaxResponse(true,"更改成功！");
			}else return new ExtAjaxResponse(false,"更改失败！无法找到该用户！");
		}
		return new ExtAjaxResponse(false,"无法检测到用户！");
	}
	
	//修改密码
	@GetMapping(value="/changePassword")
	public ExtAjaxResponse changePassword(@RequestParam("oldPassword") String oldPassword,@RequestParam("newPassword1") String newPassword1
			,@RequestParam("newPassword2") String newPassword2,HttpSession session) {
		String en=(String) session.getAttribute("employeeNumber");
		if(StringUtils.isNotBlank(en)) {
			if(StringUtils.isNotBlank(oldPassword)) {
				Employee employee=employeeRepository.findByEmployeeNumber(en);
				if(employee!=null) {
					if(employee.getPassword().equals(MD5.getMD5(oldPassword))) {
						if(StringUtils.isNotBlank(newPassword1)) {
							if(newPassword1.equals(newPassword2)) {
								employee.setPassword(MD5.getMD5(newPassword1));
								employeeRepository.save(employee);
								return new ExtAjaxResponse(true,"修改密码成功！");
							}else return new ExtAjaxResponse(false,"两次输入的新原密码不一致！");
						}else return new ExtAjaxResponse(false,"输入的新原密码不能为空！");
					}else return new ExtAjaxResponse(false,"输入的原密码错误！");
				}else return new ExtAjaxResponse(false,"更改失败！无法找到该用户！");
			}else return new ExtAjaxResponse(false,"原密码不能为空！");
		}
		return new ExtAjaxResponse(false,"无法检测到用户！");
	}
	
	//记得导fileupload的包
	@PostMapping(value="/uploadPicture")
	public ExtAjaxResponse uploadPicture(HttpServletRequest request/*,@RequestParam("photo-path") String Filedata*/) {
		
		String en=(String) request.getSession().getAttribute("employeeNumber");
		Employee employee=employeeRepository.findByEmployeeNumber(en);
		if(employee==null) {
			return new ExtAjaxResponse(false,"无法找到该用户！");
		}
		
		MultipartFile mf = null;
		//判断是不是multipart/form-data的请求
		if (!(request instanceof MultipartHttpServletRequest)) {
			String errorMsg = "your post form is not support ENCTYPE='multipart/form-data' ";
			throw new RuntimeException(errorMsg);
		}
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		//前端的那个文件的name是photo-path
		List<MultipartFile> multipartFiles = multipartRequest.getFiles("photo-path");
		if (null != multipartFiles && multipartFiles.size() > 0) {
			//因为multipartFiles只有一个图片，所以直接拿第一个
			mf = multipartFiles.get(0);
			//判断是否是图片格式
			if(!ImageCheckByName.check(mf.getOriginalFilename())) {
				return new ExtAjaxResponse(false,"上传的文件不是图片格式！");
			}
			//2MB=2097152b，这里判断图片大小是否大于2MB
			if(mf.getSize()>2097152) {
				return new ExtAjaxResponse(false,"上传图片大于2MB！");
			}
			//给上传的文件命名
			UUID uuid = UUID.randomUUID();
			String fileName=uuid.toString().substring(5, 20)+
					mf.getOriginalFilename().substring(mf.getOriginalFilename().lastIndexOf("."));
			//这里是删除旧的图片
			String oldFileName=employee.getPicture();
			if(!"default.jpg".equals(oldFileName)) {
				File deletePicture=new File(request.getSession().getServletContext().getRealPath("/resources/images/user-profile/")+oldFileName);
				//这里是判断原图片是否存在
				if(deletePicture.exists()) {
					deletePicture.delete();
				}
			}
			//把新的文件名赋值给employee
			employee.setPicture(fileName);
			employeeRepository.save(employee);
			//request.getSession().getServletContext().getRealPath("/")
			//这一串东西是获取服务器的根路径
			String realPath = request.getSession().getServletContext().getRealPath("/resources/images/user-profile/")+fileName;
			//source指向要保存的目标路径的文件（文件目前还不存在）
			File source = new File(realPath);
			try {
				//把图片传到source文件
				mf.transferTo(source);
			} catch (Exception e) {
				String errorMsg = "Upload file " + source.getAbsoluteFile() + " Error!" + e.getMessage();
				throw new RuntimeException(errorMsg);
			}
		}
		return new ExtAjaxResponse(true,"上传成功！");
	}
}
