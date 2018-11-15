package com.example.demo.employee.service;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.activiti.engine.IdentityService;
import org.activiti.engine.identity.Group;
import org.activiti.engine.identity.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.attence.entity.Attence;
import com.example.demo.attence.repository.AttenceRepository;
import com.example.demo.common.utils.ListPageUtil;
import com.example.demo.common.utils.MD5;
import com.example.demo.contract.entity.Contract;
import com.example.demo.contract.repository.ContractRepository;
import com.example.demo.email.entity.Email;
import com.example.demo.email.repository.EmailRepository;
import com.example.demo.employee.domain.Employee;
import com.example.demo.employee.domain.EmployeeDTO;
import com.example.demo.employee.repository.EmployeeRepository;
import com.example.demo.employee.util.BeanUtils;
import com.example.demo.employee.util.ExtAjaxResponse;
import com.example.demo.store.domain.Store;
import com.example.demo.store.repository.StoreRepository;



@Service
@Transactional
public class EmployeeService implements IEmployeeService {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private StoreRepository storeRepository;
	
	@Autowired
	private IdentityService identityService;
	
	@Autowired
	private ContractRepository contractRepository;
	
	@Autowired
	private AttenceRepository attenceRepository;
	
	@Autowired
	private EmailRepository emailRepository;
	
	@Override
	public Employee save(Employee entity) {
		
		return employeeRepository.save(entity);
	}

	@Override
	public Optional<Employee> findById(Long id) {
		// TODO Auto-generated method stub
		return employeeRepository.findById(id);
	}

	@Override
	public boolean existsById(Long id) {
		// TODO Auto-generated method stub
		return employeeRepository.existsById(id);
	}

	@Override
	public long count() {
		// TODO Auto-generated method stub
		return employeeRepository.count();
	}
	
	//删除一行记录（删除一个employee）
	@Override
	public ExtAjaxResponse deleteById(Long id,HttpSession session) {
		try {
			if(id!=null) {
				Employee employee=employeeRepository.findById(id).get();
				employee.getLocalStore().getEmployeeList().remove(employee);
				employee.setLocalStore(null);
				/*-----------------修改工作流的操作---------------*/
				identityService.deleteMembership(employee.getEmployeeNumber(), employee.getPost());
				identityService.deleteUser(employee.getEmployeeNumber());
				/*-----------------end---------------*/
				/*-----------------删除关联的表-----------------*/
				List<Attence> attenceList=attenceRepository.findByEmployee(employee);
				for(Attence attence:attenceList) {
					attenceRepository.delete(attence);
				}
				List<Contract> contractList=contractRepository.findByEmployee(employee);
				for(Contract contract:contractList) {
					contractRepository.delete(contract);
				}
				List<Email> emailList=emailRepository.findByEmployee(employee);
				for(Email email:emailList) {
					emailRepository.delete(email);
				}
				/*-----------------end---------------*/
				/*-----------------删除图片----------------*/
				String oldFileName=employee.getPicture();
				if(!"default.jpg".equals(oldFileName)) {
					File deletePicture=new File(session.getServletContext().getRealPath("/resources/images/user-profile/")+oldFileName);
					//判断图片是否存在
					if(deletePicture.exists()) {
						deletePicture.delete();
					}
				}
				/*-----------------end---------------*/
				employeeRepository.delete(employee);
			}
			return new ExtAjaxResponse(true,"删除成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(true,"删除失败！");
		}
	}
	
	//适用于各种条件的查询employee方法
	@Override
	public Page<EmployeeDTO> findAll(Specification<Employee> spec, Pageable pageable,HttpSession session) {
		List<EmployeeDTO> results=null;
		List<Employee> employees = null;
		List<Employee> pageList=null;
		ListPageUtil<Employee> listPageUtil=null;//分页工具List
		
		//判断是admin还是人事经理，admin就查找所有，人事经理就查找当前store及旗下所有store的员工
		if(session.getAttribute("post").equals("admin")) {
			employees=employeeRepository.findAll(spec);
			Employee employee=employeeRepository.findByEmployeeNumber((String) session.getAttribute("employeeNumber"));
			employees.remove(employee);
			listPageUtil = new ListPageUtil<Employee>(employees
					,pageable.getPageNumber()+1, pageable.getPageSize());
			pageList=listPageUtil.getPagedList();
		}else {
			Employee entity=employeeRepository.findByEmployeeNumber((String) session.getAttribute("employeeNumber"));
			List<Store> storeList=new ArrayList<Store>();
			//找到所有旗下门店
			storeList=diguiFindStoreNameList(storeList,entity.getLocalStore());
			//将所有门店的员工加到employeeList中
			List<Employee> employeeList=new ArrayList<Employee>();
			for(Store store:storeList) {
				employeeList.addAll(store.getEmployeeList());
			}
			//查询表中所有员工
			employees=employeeRepository.findAll(spec);
			//移除自己的信息
			employees.remove(entity);
			//取employees和employeeList的交集
			employees.retainAll(employeeList);
			//除去post为admin的员工
			//增强循环遍历删除会出现迭代删除错误
			Iterator<Employee> it=employees.iterator();
			while(it.hasNext()) {
				Employee employee=it.next();
				if(employee.getPost().equals("admin")) {
					it.remove();
				}
			}
			
			listPageUtil = new ListPageUtil<Employee>(employees
					,pageable.getPageNumber()+1, pageable.getPageSize());
			pageList=listPageUtil.getPagedList();
		}

		if(null!=pageList) {
			results=new ArrayList<EmployeeDTO>();
			for(Employee entity : pageList) {
				
				EmployeeDTO employeeDTO=new EmployeeDTO();
				//注意，因为BeanUtils.copyProperties是让source把target里面相同的属性名的属性覆盖掉
				//即便source里相同属性名中有null，这里先让entity.getLocalStore()覆盖是因为
				//entity.getLocalStore()与entity中主键都叫id
				if(entity.getLocalStore()!=null) {
					BeanUtils.copyProperties(entity.getLocalStore(), employeeDTO);
				}
				BeanUtils.copyProperties(entity, employeeDTO);
				results.add(employeeDTO);
			}
		}
		//results是List，pageable是分页条件
		//employees.getTotalElements()是查询得到的结果的总数量，切记，这里踩过坑
		return new PageImpl<EmployeeDTO>(results, pageable, employees.size());
	}
	//通过递归查找当前人事经理的门店及其旗下所有门店
	private List<Store> diguiFindStoreNameList(List<Store> storeList, Store localStore) {
		if(localStore!=null) {
			storeList.add(localStore);
			for(Store store:localStore.getStoreList()) {
				storeList=diguiFindStoreNameList(storeList, store);
			}
		}
		return storeList;
	}
	
	
	@Override
	public void deleteAll(Long[] ids) {
		// TODO Auto-generated method stub
		List<Long> idLists=new ArrayList<Long>(Arrays.asList(ids));
		
		List<Employee> employees=(List<Employee>) employeeRepository.findAllById(idLists);
		if(employees!=null) {
			for(Employee employee:employees) {
				employee.getLocalStore().getEmployeeList().remove(employee);
				employee.setLocalStore(null);
				employeeRepository.delete(employee);
			}
		}
		
	}
	
	//保存Employee
	@Override
	public ExtAjaxResponse saveEmployee(EmployeeDTO employeeDTO) {
		try {
			if(StringUtils.isNotBlank(employeeDTO.getEmployeeName()) && 
					StringUtils.isNotBlank(employeeDTO.getPost()) && 
					StringUtils.isNotBlank(employeeDTO.getStoreName())) {
				
				Employee employee = new Employee();
				
				employee.setPicture("default.jpg");
				employee.setEmployeeName(employeeDTO.getEmployeeName());
				employee.setPost(employeeDTO.getPost());
				Store entity=storeRepository.findByStoreName(employeeDTO.getStoreName());
				
				//根据部门编号和时间戳生成工号，如果工号已存在则重新生成
				Long id=new Date().getTime();
				String employeeNumber=entity.getStoreNumber()+id.toString().substring(id.toString().length()-6);
				while(employeeRepository.findByEmployeeNumber(employeeNumber)!=null) {
					id=new Date().getTime();
					employeeNumber=entity.getStoreNumber()+id.toString().substring(id.toString().length()-6);
				}
				employee.setEmployeeNumber(employeeNumber);
				employee.setPassword(MD5.getMD5("123456"));
				//employee.setEmail(employeeNumber+"@knorr.com");
				
				//这里要先把entity添加到employee里的localStore，再把employee添加到entity里的List里
				//否则无法保存employee的信息
				employee.setLocalStore(entity);
				entity.getEmployeeList().add(employee);
				
				/*--------------------保存到工作流的操作----------------------*/
				Group group =identityService.newGroup(employee.getPost());
				group.setName(employee.getPost());
				identityService.saveGroup(group);
				
				User user=identityService.newUser(employee.getEmployeeNumber());
				user.setPassword("123456");
				identityService.saveUser(user);
				
				identityService.createMembership(employee.getEmployeeNumber(), employee.getPost());
				/*--------------------end-------------------------*/
				
				storeRepository.save(entity);
				//employeeRepository.save(employee);
				return new ExtAjaxResponse(true,"添加成功！");
			}else {
				return new ExtAjaxResponse(true,"添加失败！用户名或密码不能为空");
			}
		} catch (Exception e) {
			return new ExtAjaxResponse(true,"添加失败！");
		}
	}
	
	//更新数据
	@Override
	public ExtAjaxResponse updateById(Long id, EmployeeDTO employeeDTO) {
		try {
			Employee entity=employeeRepository.findById(id).get();
			if(entity != null) {
				if(StringUtils.isNotBlank(employeeDTO.getPost())) {
					/*-----------------修改工作流的操作---------------*/
					identityService.deleteMembership(entity.getEmployeeNumber(), entity.getPost());
					
					Group group=identityService.newGroup(employeeDTO.getPost());
					group.setName(employeeDTO.getPost());
					
					identityService.createMembership(entity.getEmployeeName(), employeeDTO.getPost());
					/*-----------------end-----------------------------*/
					
					entity.setPost(employeeDTO.getPost());
					
				}
				if(employeeDTO.getStoreName()!=null) {
					
					if(entity.getLocalStore()==null || employeeDTO.getStoreName()!=entity.getLocalStore().getStoreName()) {
						if(entity.getLocalStore()!=null) {
							entity.getLocalStore().getEmployeeList().remove(entity);
						}
						entity.setLocalStore(null);
						Store store=storeRepository.findByStoreName(employeeDTO.getStoreName());
						if(store!=null) {
							entity.setLocalStore(store);
							store.getEmployeeList().add(entity);
							storeRepository.save(store);
						}
						else employeeRepository.save(entity);
					}
					
				}
				employeeRepository.save(entity);
			}
			return new ExtAjaxResponse(true,"更新成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(true,"更新失败！");
		}
	}
	
	//登录验证
	@Override
	public boolean checkPassword(String employeeNumber, String password) {
		if(employeeRepository.checkPassword(employeeNumber, password)!=null) {
			return true;
		}else return false;
	}
	
	//通过工号查询employee
	@Override
	public Employee EmployeeNumber(String employeeNumber) {
		return employeeRepository.findByEmployeeNumber(employeeNumber);
	}
	
	@Override
	public Employee EmployeeName(String employeeName) {
		return employeeRepository.findByEmployeeName(employeeName);
	}

	@Override
	public Employee findByStoreNameandPost(String storeName, String post) {
		return employeeRepository.findByStoreNameandPost(storeName, post);
	}

}
