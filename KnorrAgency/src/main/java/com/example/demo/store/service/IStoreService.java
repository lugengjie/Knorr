package com.example.demo.store.service;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import com.example.demo.store.domain.Store;
import com.example.demo.store.domain.StoreDTO;
import com.example.demo.store.domain.StoreDTO2;
import com.example.demo.store.domain.StoreDTO3;
import com.example.demo.store.domain.StoreName;
import com.example.demo.store.util.ExtAjaxResponse;



public interface IStoreService {
	public Page<StoreDTO> findAll(Specification<Store> spec, Pageable pageable, HttpSession session);
	public Store save(Store entity);
	public ExtAjaxResponse saveStore(StoreDTO storeDTO);
	public ExtAjaxResponse updateById(Long id, StoreDTO storeDTO);
	public ExtAjaxResponse deleteById(Long id);
	public Store findOne(Long id);
	//public List<String> findFatherStoreName(String storeName);
	public List<StoreDTO2> findFatherStoreName(String storeName, HttpSession session);
	public List<StoreDTO3> findstoreName(HttpSession session);
	//查询全部店名
	public List<StoreName> findAllStoreName();
}
