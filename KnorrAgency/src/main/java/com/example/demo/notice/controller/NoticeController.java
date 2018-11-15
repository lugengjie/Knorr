package com.example.demo.notice.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.attence.entity.AttenceDTO;
import com.example.demo.attence.entity.AttenceQueryDTO;
import com.example.demo.common.controller.ExtjsPageRequest;
import com.example.demo.common.controller.SessionUtil;
import com.example.demo.log.config.SystemControllerLog;
import com.example.demo.notice.entity.Notice;
import com.example.demo.notice.service.INoticeService;

@RestController
@RequestMapping("/notice")
public class NoticeController {
	@Autowired
	INoticeService noticeService;
	@SystemControllerLog(description="查看公告")
	@GetMapping
	public Page<Notice> findNotice(ExtjsPageRequest extjsPageRequest) {
	   return noticeService.findAll(null, extjsPageRequest.getPageable());
	}
	@SystemControllerLog(description="保存公告")
	@PostMapping
	public void saveNotice(@RequestBody Notice notice) {
		noticeService.save(notice);
	}
}
