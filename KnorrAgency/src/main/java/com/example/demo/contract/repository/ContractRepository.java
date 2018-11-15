package com.example.demo.contract.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.contract.entity.Contract;
import com.example.demo.employee.domain.Employee;

@Repository
public interface ContractRepository extends PagingAndSortingRepository<Contract, Long>,JpaSpecificationExecutor<Contract>{
	
	//根据月份和门店名统计出某月某门店的每个员工的销售额
	@Query("select sum(c.total) from Contract c , Employee e where c.employee.id=e.id and month(c.startTime) like month(?1) and c.employee.localStore.storeName like ?2 group by c.employee.employeeName order by sum(c.total) desc")
	public List<Object> getSumByMonthAndStoreName(Date month,String storeName);
	
	@Query("select e from Contract c , Employee e where c.employee.id=e.id and month(c.startTime) like month(?1) and c.employee.localStore.storeName like ?2 group by c.employee.employeeName order by sum(c.total) desc")
	public List<Object> getEmployeeByMonthAndStoreName(Date month,String storeName);
	
	//根据月份统计出某月某门店的总销售额
	@Query("select sum(c.total) from Contract c where month(c.startTime) like month(?1) group by c.employee.localStore.storeName order by sum(c.total) desc")
	public List<Object> getSumByMonth(Date month);
	
	@Query("select e from Contract c , Employee e where month(c.startTime) like month(?1) group by c.employee.localStore.storeName order by sum(c.total) desc")
	public List<Object> getStoreNameByMonth(Date month);
	
	@Query("from Contract c where c.employee = ?1")
	public List<Contract> findByEmployee(Employee employee);

}
