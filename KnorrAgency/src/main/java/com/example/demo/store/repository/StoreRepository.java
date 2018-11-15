package com.example.demo.store.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.store.domain.Store;
import com.example.demo.store.domain.StoreName;


@Repository
public interface StoreRepository extends PagingAndSortingRepository<Store, Long>,JpaSpecificationExecutor<Store>{
	
	@Query("from Store s where s.storeName = ?1")
	public Store findByStoreName(String storeName);
	
	//查全部店名
	@Query("select distinct s.storeName from Store s")
	public List<String> findAllStoreName();
}
