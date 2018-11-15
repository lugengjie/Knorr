package com.example.demo.common.utils;

//通过文件名后缀判断是否是图片
public class ImageCheckByName {
	
	public static boolean check(String fileName) {
		String suffix;
		try {
			suffix=fileName.substring(fileName.lastIndexOf("."));
		} catch (Exception e) {
			return false;
		}
		if(".jpg".equals(suffix)) {
			return true;
		}
		if(".jpeg".equals(suffix)) {
			return true;
		}
		if(".png".equals(suffix)) {
			return true;
		}
		if(".gif".equals(suffix)) {
			return true;
		}
		if(".tif".equals(suffix)) {
			return true;
		}
		if(".bmp".equals(suffix)) {
			return true;
		}
		return false;
		
	}
	
}
