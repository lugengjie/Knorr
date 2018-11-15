package com.example.demo.attence.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;

public class AttenceUtil {
	
	private static String url="http://api.map.baidu.com/location/ip?ak=sBlNFyaEHsReLGZcO4dluyc9VbwBXffV&coor=bd09ll";

	public static JSONObject readJsonFromUrl() throws IOException, JSONException {
		InputStream is = new URL(url).openStream();
		BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
		String jsonText = readAll(rd);
		JSONObject json=new JSONObject(jsonText);
		return json;
	}
	
	private static String readAll(Reader rd) throws IOException {
		StringBuilder sb = new StringBuilder();
		int cp;
		while ((cp = rd.read()) != -1) {
			sb.append((char) cp);
		}
		return sb.toString();
	}
	
	public static List<Date> findDates(Date dBegin, Date dEnd){
		  List<Date> lDate = new ArrayList<Date>();
		  //SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
		  //lDate.add(sd.format(dBegin));
		  lDate.add(dBegin);
		  Calendar calBegin = Calendar.getInstance();
		  // 使用给定的 Date 设置此 Calendar 的时间
		  calBegin.setTime(dBegin);
		  Calendar calEnd = Calendar.getInstance();
		  // 使用给定的 Date 设置此 Calendar 的时间
		  calEnd.setTime(dEnd);
		  // 测试此日期是否在指定日期之后
		  while (dEnd.after(calBegin.getTime()))
		  {
			   // 根据日历的规则，为给定的日历字段添加或减去指定的时间量
			   calBegin.add(Calendar.DAY_OF_MONTH, 1);
			   //lDate.add(sd.format(calBegin.getTime()));
			   lDate.add(calBegin.getTime());
		  }
		  return lDate;
	}
	
	
	//判断打卡时间和地点
	public static int isTimeAndLocation(Date date,String location,boolean work) throws JSONException, IOException {
		int flag=0;//正常状态
		//设置上班时间
		String workinTime="08:00:00";
		String[]array1 = workinTime.split(":");				
		int total1 = Integer.valueOf(array1[0])*3600+Integer.valueOf(array1[1])*60+Integer.valueOf(array1[2]);
		
		//设置下班时间
		String workoutTime="17:00:00";
		String[]array2 = workoutTime.split(":");				
		int total2 = Integer.valueOf(array2[0])*3600+Integer.valueOf(array2[1])*60+Integer.valueOf(array2[2]);
		
		//设置上班地点
		String workLocation="广东省东莞市";
		
		//获取打卡时间
		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
		String attenceTime=sdf.format(date);
		String[]array3 = attenceTime.split(":");				
		int total3 = Integer.valueOf(array3[0])*3600+Integer.valueOf(array3[1])*60+Integer.valueOf(array3[2]);
		
		if(location.equals(workLocation)) {
			if(work) {
				//上班
				if(total3>total1) {
					//迟到
					flag=-2;
				}
			}else {
				//下班
				if(total3<total2) {
					//早退
					flag=-3;
				}
			}
		}else {
			flag=-1; //打卡地错误
		}
		return flag;
	}
	
	public static Date getDateByYMD(Date date) {
		
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		// 将时分秒,毫秒域清零
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
		
		return cal.getTime();
	}
	
	
}
