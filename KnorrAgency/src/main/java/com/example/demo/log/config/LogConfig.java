package com.example.demo.log.config;

import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Enumeration;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.NamedThreadLocal;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.example.demo.common.controller.SessionUtil;
import com.example.demo.employee.domain.Employee;
import com.example.demo.employee.service.IEmployeeService;
import com.example.demo.log.entity.Log;
import com.example.demo.log.service.ILogService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Aspect
@Configuration
@Component
public class LogConfig {
	
	@Autowired
	private ILogService logService;
	
	@Autowired
	private IEmployeeService employeeService;
	
	private  static  final Logger logger = LoggerFactory.getLogger(LogConfig. class);
	
	private static final ThreadLocal<Date> beginTimeThreadLocal = new NamedThreadLocal<Date>("ThreadLocal beginTime");
	
	private static final ThreadLocal<Log> logThreadLocal = new NamedThreadLocal<Log>("ThreadLocal log");
	
	@Pointcut("execution(* com.example.demo.*.controller.*.*(..)) && !execution(* com.example.demo.log.controller.*.*(..))")
	public void excudeService(){}
		
	/**
     * 前置通知 用于拦截Controller层记录用户的操作的开始时间
     * @param joinPoint 切点
     * @throws InterruptedException 
     */
    @Before("excudeService()")
    public void before() {
    	HttpServletRequest request = null;
    	Date beginTime=new Date();
        beginTimeThreadLocal.set(beginTime);//线程绑定变量（该数据只有当前请求的线程可见）  
        if (logger.isDebugEnabled()){//这里日志级别为debug
            logger.debug("开始计时: {}  URI: {}", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS")
                .format(beginTime), request.getRequestURI());
        }
    }
    
    /**
     * 后置通知 用于拦截Controller层记录用户的操作
     * @param joinPoint 切点
     */
    @After("excudeService()")
    public void after(JoinPoint joinPoint) throws ClassNotFoundException {
    	
    	 //请求前处理
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();

        HttpServletRequest request = ((ServletRequestAttributes) requestAttributes).getRequest();

        Enumeration<String> headerNames = request.getHeaderNames();
        
        HttpSession session = request.getSession(); 
        String userId = SessionUtil.getUserName(session);

    	String title="";
        String type="info";                       //日志类型(info:入库,error:错误)
        String remoteAddr=request.getRemoteAddr();//请求的IP
        String requestUri=request.getRequestURI();//请求的Uri
        String method=request.getMethod();        //请求的方法类型(post/get)
        Map<String,String[]> params=request.getParameterMap(); //请求提交的参数
        
        try {
            title=getControllerMethodDescription(joinPoint);
        } catch (Exception e) {
            e.printStackTrace();
        }  
        
        // 打印JVM信息
        long beginTime = beginTimeThreadLocal.get().getTime();//得到线程绑定的局部变量（开始时间）  
        long endTime = System.currentTimeMillis();
        
        if (logger.isDebugEnabled()){
            logger.debug("计时结束：{}  URI: {}  耗时： {}   最大内存: {}m  已分配内存: {}m  已分配内存中的剩余空间: {}m  最大可用内存: {}m",
            new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS").format(endTime), 
            request.getRequestURI(), 
           // DateUtils.formatDateTime(endTime - beginTime),
            Runtime.getRuntime().maxMemory()/1024/1024, 
            Runtime.getRuntime().totalMemory()/1024/1024, 
            Runtime.getRuntime().freeMemory()/1024/1024, 
            (Runtime.getRuntime().maxMemory()-Runtime.getRuntime().totalMemory()+Runtime.getRuntime().freeMemory())/1024/1024); 
        }
        Date operateDate=beginTimeThreadLocal.get();
        Log log=new Log();
        Employee e=employeeService.EmployeeName(userId);
        if(e!=null) {
        	log.setEmployee(e);
        }
        log.setTitle(title);
        log.setType(type);
        log.setRemoteAddr(remoteAddr);
        log.setRequestUri(requestUri);
        log.setMethod(method);
        log.setMapToParams(params);
        log.setOperateDate(operateDate);
        log.setTime(endTime-beginTime);
        logService.save(log);
       
    }
    
    /**
       *  异常通知 记录操作报错日志
     * @param joinPoint
     * @param e
     */
    @AfterThrowing(pointcut = "excudeService()", throwing = "e")  
    public  void doAfterThrowing(JoinPoint joinPoint, Throwable e) {
    	Log log = logThreadLocal.get();
		if(log != null){
			log.setType("error");
			log.setException(e.toString());
			logService.save(log);			
		}
    }

    public static String getControllerMethodDescription(JoinPoint joinPoint) {
    	MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        Method method = signature.getMethod();
        SystemControllerLog controllerLog = method
                .getAnnotation(SystemControllerLog.class);
        String discription = controllerLog.description();
        return discription;
        
    }

}
