package com.example.demo.achievement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.contract.entity.Contract;
@Repository
public interface AchievementrRepository extends PagingAndSortingRepository<Contract, Long>,JpaSpecificationExecutor<Contract> {
	//根据月份和门店统计出员工销售总额排行
		@Query("select sum(c.total) from Contract c,Employee e where c.employee.id=e.id and e.localStore.storeName=?1 and extract(month from c.startTime)=?2 group by e.id order by sum(c.total) desc")
		public List<Object> getSumByStoreNameAndMonth(String storeName,int month);
		@Query("select e from Contract c,Employee e where c.employee.id=e.id and e.localStore.storeName=?1 and extract(month from c.startTime)=?2 group by e.id order by sum(c.total) desc")
		public List<Object> getEmployeeByStoreNameAndMonth(String storeName,int month);
}
