package com.example.demo.log.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.common.controller.ExtjsPageRequest;
import com.example.demo.log.config.SystemControllerLog;
import com.example.demo.log.entity.LogDTO;
import com.example.demo.log.entity.LogQueryDTO;
import com.example.demo.log.service.ILogService;

@RestController
@RequestMapping("/log")
public class LogController {
	
	@Autowired
	private ILogService logService;
	
	@SystemControllerLog(description="查看日志记录")
	@GetMapping
	public Page<LogDTO> findLog(HttpSession session,LogQueryDTO logQueryDTO,ExtjsPageRequest pageRequest){
		return logService.findAll(LogQueryDTO.getWhereClause(logQueryDTO), pageRequest.getPageable());
	}
	
	/*下载日志表*/
	@SystemControllerLog(description="下载日志表")
	@RequestMapping("/downloadLogExcel")
    public void downloadLogExcel(HttpServletRequest request, HttpServletResponse response)throws IOException
    {  
		
		
		List<LogDTO> attenceList=new ArrayList<LogDTO>();
		
		attenceList=logService.findAllLog(null);
		
	    //创建工作簿
		@SuppressWarnings("resource")
		XSSFWorkbook wb = new XSSFWorkbook();
		//创建一个sheet
		XSSFSheet sheet = wb.createSheet();
		
		// 创建单元格样式
		XSSFCellStyle style =  wb.createCellStyle();	
		
		//为单元格添加背景样式
		for (int i = 0; i < attenceList.size()+2; i++) { //需要6行表格
		    Row  row =	sheet.createRow(i); //创建行
			for (int j = 0; j < 10; j++) {//需要5列
				row.createCell(j).setCellStyle(style);
			}
		}
		
		//合并单元格
		sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 4));//合并单元格，cellRangAddress四个参数，第一个起始行，第二终止行，第三个起始列，第四个终止列
		
		//填入数据
		XSSFRow row = sheet.getRow(0); //获取第一行
		row.getCell(0).setCellValue("系统使用情况表"); //在第一行中创建一个单元格并赋值
		XSSFRow row1 = sheet.getRow(1);//获取第二行，为每一列添加字段
		row1.getCell(0).setCellValue("操作人姓名");
		row1.getCell(1).setCellValue("所属部门");
		row1.getCell(2).setCellValue("操作名");
		row1.getCell(3).setCellValue("Log类型");
		row1.getCell(4).setCellValue("请求的IP");
		row1.getCell(5).setCellValue("请求的Uri");
		row1.getCell(6).setCellValue("请求的方法类型");
		row1.getCell(7).setCellValue("请求提交的参数");
		row1.getCell(8).setCellValue("操作时间");
		row1.getCell(9).setCellValue("操作时长");
		
		//从第三行开始插数据
		for (int i = 2; i < attenceList.size()+2; i++) {
			XSSFRow Row = sheet.getRow(i);
			
			LogDTO log=(LogDTO)attenceList.get(i-2);
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Row.getCell(0).setCellValue(log.getEmployeeName());
			Row.getCell(1).setCellValue(log.getStoreName());
			Row.getCell(2).setCellValue(log.getTitle());
			Row.getCell(3).setCellValue(log.getType());
			Row.getCell(4).setCellValue(log.getRemoteAddr());
			Row.getCell(5).setCellValue(log.getRequestUri());
			Row.getCell(6).setCellValue(log.getMethod());
			Row.getCell(7).setCellValue(log.getParams());
			Row.getCell(8).setCellValue(sdf.format(log.getOperateDate()));
			Row.getCell(9).setCellValue(String.valueOf(log.getTime()));
			
			
		}
        response.setHeader("Content-disposition", "attachment;filename=Log.xlsx");//默认Excel名称
        response.flushBuffer();
        wb.write(response.getOutputStream());
    }
}
