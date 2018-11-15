package com.example.demo.store.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.log.config.SystemControllerLog;
import com.example.demo.store.domain.StoreDTO;
import com.example.demo.store.domain.StoreDTO2;
import com.example.demo.store.domain.StoreDTO3;
import com.example.demo.store.domain.StoreName;
import com.example.demo.store.domain.StoreQueryDTO;
import com.example.demo.store.service.IStoreService;
import com.example.demo.store.util.ExtAjaxResponse;
import com.example.demo.store.util.ExtjsPageRequest;


@RestController
@RequestMapping("/store")
public class StoreController {
	
	
	private static final Logger log = LoggerFactory.getLogger(StoreController.class);
	
	@Autowired
	private IStoreService storeService;
	
	//按条件查询
	@SystemControllerLog(description="查询门店信息")
	@GetMapping
	public Page<StoreDTO> findAll(StoreQueryDTO storeQueryDTO,HttpSession session,ExtjsPageRequest pageable){
		Page<StoreDTO> page;
		page=storeService.findAll(StoreQueryDTO.getWhereClause(storeQueryDTO), pageable.getPageable(),session);
		return page;
	}
	

	//获取可作为父store的storeName，子store不能作为父store
	//注意，这里返回的是DTO而不是String，因为这里返回的数据是给下拉框的
	//下拉框要有两个变量，一个是给用户看的变量，一个是实际的值，这里用DTO
	//狗东西
	@SystemControllerLog(description="查询门店信息")
	@GetMapping(value= {"/getStoreName","/getStoreName/{storeName}"})
	public List<StoreDTO2> findFatherStoreName(@PathVariable(value="storeName",required=false) String storeName,
			HttpSession session){
		
		return storeService.findFatherStoreName(storeName,session);
	}
	
	//这个也是下拉框，只不过是给Employee提供下拉框
	@SystemControllerLog(description="查询门店名")
	@GetMapping(value= {"/getStoreName2"})
	public List<StoreDTO3> findStoreName(HttpSession session){
		return storeService.findstoreName(session);
	}
	
	//插入记录
	@SystemControllerLog(description="增加门店信息")
	@RequestMapping(method=RequestMethod.POST)
	public ExtAjaxResponse saveStore(@RequestBody StoreDTO storeDTO) {
		return storeService.saveStore(storeDTO);
	}
	
	//修改记录
	@SystemControllerLog(description="修改门店信息")
	@RequestMapping(value="{id}",method=RequestMethod.PUT)
	public ExtAjaxResponse updateById(@PathVariable("id") Long id,@RequestBody StoreDTO storeDTO) {
		return storeService.updateById(id, storeDTO);
	}
	
	//删除记录，连子store和旗下所有的employee都删除
	@DeleteMapping(value="{id}")
	@SystemControllerLog(description="删除门店信息")
	public ExtAjaxResponse deleteById(@PathVariable("id") Long id) 
	{
		return storeService.deleteById(id);
	}
	
	
}
