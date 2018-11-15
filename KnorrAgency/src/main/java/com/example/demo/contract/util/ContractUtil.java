package com.example.demo.contract.util;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import com.example.demo.contract.entity.ContractDTO;
import com.example.demo.employee.domain.Employee;

public class ContractUtil {

	public static Date toDate(String month) {
		
		HashMap<String, String> hashMap = new HashMap<String, String>();
		hashMap.put("一月", "01");
		hashMap.put("二月", "02");
		hashMap.put("三月", "03");
		hashMap.put("四月", "04");
		hashMap.put("五月", "05");
		hashMap.put("六月", "06");
		hashMap.put("七月", "07");
		hashMap.put("八月", "08");
		hashMap.put("九月", "09");
		hashMap.put("十月", "10");
		hashMap.put("十一月", "11");
		hashMap.put("十二月", "12");
		
		SimpleDateFormat sdf = new SimpleDateFormat("MM");
		Date dMonth=new Date();
		String str=null;
		try {
			str=hashMap.get(month);
			dMonth=sdf.parse(str);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dMonth;
	}
	
	public static List<ContractDTO> toContractDTOByEmployee(List<Object> sumList,List<Object> employeeList){
		
		List<ContractDTO> dtoLists = new ArrayList<ContractDTO>();
		
		for(int i=0;i<sumList.size();i++){
			ContractDTO dto=new ContractDTO();
			dto.setTotal((double)sumList.get(i));
			Employee e=(Employee)employeeList.get(i);
			dto.setEmployeeName(e.getEmployeeName());
			dto.setQuotation(e.getQuotation());
			dtoLists.add(dto);
		}
		return dtoLists;
	}
	
	public static List<ContractDTO> toContractDTOByStore(List<Object> sumList,List<Object> storeList){
		
		List<ContractDTO> dtoLists = new ArrayList<ContractDTO>();
		
		for(int i=0;i<sumList.size();i++){
			ContractDTO dto=new ContractDTO();
			dto.setTotal((double)sumList.get(i));
			Employee e=(Employee)storeList.get(i);
			dto.setStoreName(e.getLocalStore().getStoreName());
			dtoLists.add(dto);
		}
		return dtoLists;
	}
	
	//生成合同编号
	public static String getContractNumber(String contractType) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		Date date=new Date();
		String contractNumber=sdf.format(date);
		if(contractType.equals("出租合同")) {
			contractNumber="Knorr"+contractNumber+"R";
		}else {
			contractNumber="Knorr"+contractNumber+"S";
		}
		return contractNumber;
	}

}
