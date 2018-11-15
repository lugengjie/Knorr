package com.example.demo.calendar.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.calendar.entity.Calendar;
import com.example.demo.calendar.entity.Event;
import com.example.demo.calendar.service.IEventService;
import com.example.demo.common.controller.ExtAjaxResponse;
import com.example.demo.common.controller.ExtResultJson;
import com.example.demo.log.config.SystemControllerLog;

@RestController
@RequestMapping("/calendar")
public class EventController {
	
	@Autowired
	private IEventService eventService;
	
	//查找日历类型
	@SystemControllerLog(description="查看行程")
	@RequestMapping("/findCalendars")
	public @ResponseBody ExtResultJson<Calendar> findCalendar()
	{
		List<Calendar>  clist = new ArrayList<Calendar>();
		

		Calendar c1 = new Calendar();
		c1.setId(1L);
		c1.setTitle("Work");
		c1.setDescription("");
		c1.setColor("");
		c1.setAssignedColor("#F44336");
		c1.setHidden(false);
		c1.setEditable(true);
	
		Calendar c2 = new Calendar();
		c2.setId(2L);
		c2.setTitle("Personal");
		c2.setDescription("");
		c2.setColor("");
		c2.setAssignedColor("#3F51B5");
		c2.setHidden(false);
		c2.setEditable(true);
		
		
		Calendar c3 = new Calendar();
		c3.setId(3L);
		c3.setTitle("Test");
		c3.setDescription("");
		c3.setColor("");
//		c3.setAssignedColor("#DEFF88");
		c3.setAssignedColor("green");
		c3.setHidden(false);
		c3.setEditable(true);

		clist.add(c1);
		clist.add(c2);
		clist.add(c3);
		return new ExtResultJson<Calendar>(clist);
		
	}
	
	
	//按日历类型的id和时间区间查找对应的活动集合
	/**
	 *  calendar: Calendar类的Id
		startDate:开始时间,为UTC格式:2017-11-09T00:00:00.000Z
		endDate:结束时间:2018-03-11T00:00:00.000Z
	 *  
	 *  calendar:2
		startDate:2017-11-09T00:00:00.000Z
		endDate:2018-03-11T00:00:00.000Z
	 * @return
	 * @throws ParseException 
	 */
	@SystemControllerLog(description="查看行程")
	@RequestMapping("/finds")
	public @ResponseBody ExtResultJson<Event> findEvents(
			Long calendar,
			@DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") Date startDate,
			@DateTimeFormat(pattern="yyyy-MM-dd'T'HH:mm:ss.SSS'Z'") Date endDate)
	{
		ExtResultJson<Event> json = new ExtResultJson<Event>(new ArrayList<Event>());
		
		List<Event> eventStore1 = new ArrayList<Event>();
		List<Event> eventStore2 = new ArrayList<Event>();
		List<Event> eventStore3 = new ArrayList<Event>();
		
		List<Event> eventList = new ArrayList<Event>();
		eventList=eventService.findAll();
		
		for(Event e:eventList) {
			if(e.getCalendarId()==1L) {
				eventStore1.add(e);
			}
			if(e.getCalendarId()==2L) {
				eventStore2.add(e);
			}
			if(e.getCalendarId()==3L) {
				eventStore3.add(e);
			}
		}
		
		if(calendar==1L) {
			json.setLists(eventStore1);
		}else if(calendar==2L) {
			json.setLists(eventStore2);
		}else {
			json.setLists(eventStore3);
		}
		
		return json;
	}
	
	@SystemControllerLog(description="保存行程")
	@RequestMapping(value="/save",method=RequestMethod.POST)
	public ExtAjaxResponse save(@RequestBody Event event) {
		try {
			eventService.save(event);
			return new ExtAjaxResponse(true,"成功!");
		} catch (Exception e) {
			return new ExtAjaxResponse(false,"失败!");
		}
	}
	
	@SystemControllerLog(description="删除行程")
	@RequestMapping("/delete")
	public ExtAjaxResponse delete(@RequestParam(name="id") Long id) {
		try {
			eventService.deleteById(id);
			return new ExtAjaxResponse(true,"成功!");
		} catch (Exception e) {
			return new ExtAjaxResponse(false,"失败!");
		}
	}

}
