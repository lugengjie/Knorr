package com.example.demo.store.service;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.employee.domain.Employee;
import com.example.demo.employee.repository.EmployeeRepository;
import com.example.demo.store.domain.Store;
import com.example.demo.store.domain.StoreDTO;
import com.example.demo.store.domain.StoreDTO2;
import com.example.demo.store.domain.StoreDTO3;
import com.example.demo.store.domain.StoreName;
import com.example.demo.store.repository.StoreRepository;
import com.example.demo.store.util.BeanUtils;
import com.example.demo.store.util.ExtAjaxResponse;


@Service
@Transactional
public class StoreService implements IStoreService {
	
	@Autowired
	StoreRepository storeRepository;
	@Autowired
	EmployeeRepository employeeRepository;
	
	//按条件查询(按照当前employee权限查询)
	@Override
	public Page<StoreDTO> findAll(Specification<Store> spec, Pageable pageable,HttpSession session) {
		List<StoreDTO> results=null;
		Page<Store> stores=storeRepository.findAll(spec, pageable);
		//如果按条件查不到就直接返回null
		if(null!=stores) {
			//按条件查到了，但只能查所在门店旗下的所有门店
			Employee employee=employeeRepository.findByEmployeeNumber((String) session.getAttribute("employeeNumber"));
			List<String> storeNameList=new ArrayList<String>();
			if(employee==null) return null;
			else {
				//判断权限是否为admin
				if(!session.getAttribute("post").equals("admin")) {
					storeNameList=getStoreNameList(storeNameList, employee.getLocalStore().getStoreName());
					results=new ArrayList<StoreDTO>();
					for(Store entity:stores) {
						if(storeNameList.contains(entity.getStoreName())) {
							StoreDTO storeDTO=new StoreDTO();
							BeanUtils.copyProperties(entity, storeDTO);
							if(entity.getFatherStore()!=null) {
								storeDTO.setFatherStoreName(entity.getFatherStore().getStoreName());
							}
							results.add(storeDTO);
						}
					}
				}else {
					results=new ArrayList<StoreDTO>();
					for(Store entity:stores) {
							StoreDTO storeDTO=new StoreDTO();
							BeanUtils.copyProperties(entity, storeDTO);
							if(entity.getFatherStore()!=null) 
								storeDTO.setFatherStoreName(entity.getFatherStore().getStoreName());
							results.add(storeDTO);
					}
				}
			}
		}
		return new PageImpl<StoreDTO>(results,pageable,stores.getTotalElements());
	}
	public List<String> getStoreNameList(List<String> storeNameList, String storeName){
		Store store=storeRepository.findByStoreName(storeName);
		if(store!=null) {
			storeNameList.add(storeName);
			if(store.getStoreList().isEmpty()) {
				return storeNameList;
			}else {
				for(Store entity:store.getStoreList()) {
					storeNameList=getStoreNameList(storeNameList, entity.getStoreName());
				}
				return storeNameList;
			}
		}
		return storeNameList;
	}
	
	
	//保存记录
	@Override
	public Store save(Store entity) {
		// TODO Auto-generated method stub
		return storeRepository.save(entity);
	}
	
	//保存store
	@Override
	public ExtAjaxResponse saveStore(StoreDTO storeDTO) {
		// TODO Auto-generated method stub
		try {
			if(StringUtils.isNotBlank(storeDTO.getStoreName()) && 
					StringUtils.isNotBlank(storeDTO.getStoreNumber()) && 
					StringUtils.isNotBlank(storeDTO.getStoreArea()) &&
					StringUtils.isNotBlank(storeDTO.getFatherStoreName())) {
				System.out.println(storeDTO.getStoreArea()+storeDTO.getStoreNumber()+storeDTO.getStoreName());
				Store store = new Store();
				store.setStoreArea(storeDTO.getStoreArea());
				store.setStoreName(storeDTO.getStoreName());
				store.setStoreNumber(storeDTO.getStoreNumber());
				Store fatherStore=storeRepository.findByStoreName(storeDTO.getFatherStoreName());
				store.setFatherStore(fatherStore);
				fatherStore.getStoreList().add(store);
				storeRepository.save(fatherStore);
				return new ExtAjaxResponse(true,"添加成功！");
			}else {
				return new ExtAjaxResponse(true,"添加失败！用户名或密码不能为空");
			}
		} catch (Exception e) {
			return new ExtAjaxResponse(true,"添加失败！");
		}
	}
	
	//更新记录
	@Override
	public ExtAjaxResponse updateById(Long id, StoreDTO storeDTO) {
		try {
			Store entity=storeRepository.findById(id).get();
			if(entity!=null) {
				if(StringUtils.isNotBlank(storeDTO.getStoreName())) {
					entity.setStoreName(storeDTO.getStoreName());
				}
				if(StringUtils.isNotBlank(storeDTO.getStoreNumber())) {
					entity.setStoreNumber(storeDTO.getStoreNumber());
				}
				if(StringUtils.isNotBlank(storeDTO.getStoreArea())) {
					entity.setStoreArea(storeDTO.getStoreArea());
				}
				storeRepository.save(entity);
			}
			return new ExtAjaxResponse(true,"更新成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(true,"更新失败！");
		}
	}
	
	//删除记录
	@Override
	public ExtAjaxResponse deleteById(Long id) {
		try {
			if(id!=null) {
				Store store=storeRepository.findById(id).get();
				store.getFatherStore().getStoreList().remove(store);
				store.setFatherStore(null);
				storeRepository.delete(store);
			}
			return new ExtAjaxResponse(true,"删除成功！");
		} catch (Exception e) {
			return new ExtAjaxResponse(true,"删除失败！");
		}
	}
	
	//查询可作为父store的storeName(现在暂时以“大家都是老乡”为主门店)，用于下拉框
	//这里用DTO，DTO里面有两个变量，用来一个是用来看的，另一个是实际值
		@Override
		public List<StoreDTO2> findFatherStoreName(String storeName,HttpSession session) {
			if(StringUtils.isNotBlank(storeName)) {
				List <StoreDTO2> storeList=new ArrayList<StoreDTO2>();
				String en=(String) session.getAttribute("employeeNumber");
				if(StringUtils.isNotBlank(en)) {
					Employee entity=employeeRepository.findByEmployeeNumber(en);
					storeList=diguiFindFatherStoreNameList(storeList,entity.getLocalStore().getStoreName(), storeName);
					return storeList;
				}else return null;
			}else {
				List <StoreDTO2> storeList=new ArrayList<StoreDTO2>();
				String en=(String) session.getAttribute("employeeNumber");
				if(StringUtils.isNotBlank(en)) {
					if(session.getAttribute("post").equals("admin")) {
						List<Store> stores=(List<Store>) storeRepository.findAll();
						for(Store store:stores) {
							StoreDTO2 storeDTO2=new StoreDTO2();
							storeDTO2.setFatherStoreName(store.getStoreName());
							storeDTO2.setFatherStoreNameView(store.getStoreName());
							storeList.add(storeDTO2);
						}
						return storeList;
					}else {
						Employee entity=employeeRepository.findByEmployeeNumber(en);
						storeList=diguiFindFatherStoreNameList(storeList,entity.getLocalStore().getStoreName());
						return storeList;
					}
				}else return null;
			}
		}
		
		//没有forbidStoreName作为参数，用于store增加功能中的tbar
		public List<StoreDTO2> diguiFindFatherStoreNameList(List<StoreDTO2> storeNameList,
				String nowStoreName){
					StoreDTO2 storeDTO2=new StoreDTO2();
					storeDTO2.setFatherStoreName(nowStoreName);
					storeDTO2.setFatherStoreNameView(nowStoreName);
					storeNameList.add(storeDTO2);
					Store nowStore=storeRepository.findByStoreName(nowStoreName);
					if(nowStore!=null) {
						for(Store entity:nowStore.getStoreList()) {
							storeNameList=diguiFindFatherStoreNameList(storeNameList, entity.getStoreName());
						}
					}
					return storeNameList;
		}
		//有forbidStoreName作为参数，用于store修改功能中的tbar
		public List<StoreDTO2> diguiFindFatherStoreNameList(List<StoreDTO2> storeNameList,
				String nowStoreName,String forbidStoreName){
					StoreDTO2 storeDTO2=new StoreDTO2();
					storeDTO2.setFatherStoreName(nowStoreName);
					storeDTO2.setFatherStoreNameView(nowStoreName);
					storeNameList.add(storeDTO2);
					Store nowStore=storeRepository.findByStoreName(nowStoreName);
					if(nowStore!=null) {
						for(Store entity:nowStore.getStoreList()) {
							if(entity.getStoreName()!=forbidStoreName) {
								storeNameList=diguiFindFatherStoreNameList(storeNameList, entity.getStoreName(), forbidStoreName);
							}
						}
					}
					return storeNameList;
		}
		
		//查询employee的storeName下拉框
		@Override
		public List<StoreDTO3> findstoreName(HttpSession session) {
			List <StoreDTO3> storeList=new ArrayList<>();
			String en=(String) session.getAttribute("employeeNumber");
			if(StringUtils.isNotBlank(en)) {
				if(session.getAttribute("post").equals("admin")) {
					List<Store> stores=(List<Store>) storeRepository.findAll();
					for(Store store:stores) {
						StoreDTO3 storeDTO3=new StoreDTO3();
						storeDTO3.setStoreName(store.getStoreName());
						storeDTO3.setStoreNameView(store.getStoreName());
						storeList.add(storeDTO3);
					}
					return storeList;
				}else {
					Employee entity=employeeRepository.findByEmployeeNumber(en);
					storeList=diguiFindFatherStoreNameList2(storeList,entity.getLocalStore().getStoreName());
					return storeList;
				}
			}else return null;
		}
		public List<StoreDTO3> diguiFindFatherStoreNameList2(List<StoreDTO3> storeNameList,
				String nowStoreName){
					StoreDTO3 storeDTO3=new StoreDTO3();
					storeDTO3.setStoreName(nowStoreName);
					storeDTO3.setStoreNameView(nowStoreName);
					storeNameList.add(storeDTO3);
					Store nowStore=storeRepository.findByStoreName(nowStoreName);
					if(nowStore!=null) {
						for(Store entity:nowStore.getStoreList()) {
							storeNameList=diguiFindFatherStoreNameList2(storeNameList, entity.getStoreName());
						}
					}
					return storeNameList;
		}
		@Override
		public Store findOne(Long id) {
			return storeRepository.findById(id).get();
		}
		
		public List<StoreName> findAllStoreName(){
			List<StoreName> nameList=new ArrayList<StoreName>();
			List<String> tmps=storeRepository.findAllStoreName();	
			for(String tmp:tmps) {
				StoreName storeName=new StoreName();
				storeName.setStoreName(tmp);	
				nameList.add(storeName);
			}
			return nameList;
		}
}		
