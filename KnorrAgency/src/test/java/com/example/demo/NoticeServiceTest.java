package com.example.demo;

import java.util.Date;

import javax.transaction.Transactional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.demo.notice.entity.Notice;
import com.example.demo.notice.repository.NoticeRepository;
import com.example.demo.notice.service.INoticeService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class NoticeServiceTest {
	@Autowired
	INoticeService noticeService;

	@Test
	public void saveData() {
		for(int i=0;i<10;i++) {
			Notice tmp=new Notice();
			tmp.setTime(new Date());
			tmp.setMessage("没什么事情"+i);
			noticeService.save(tmp);
		}
	}
	
}
