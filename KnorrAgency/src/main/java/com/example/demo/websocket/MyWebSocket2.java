package com.example.demo.websocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.springframework.stereotype.Component;

import com.example.demo.websocket.entity.Message;
import com.google.gson.Gson;

@ServerEndpoint(value = "/otherPage/{id}")
@Component
public class MyWebSocket2 {
    //静态变量，用来记录当前在线连接数。应该把它设计成线程安全的。
    private static int onlineCount = 0;

    //concurrent包的线程安全Set，用来存放每个客户端对应的MyWebSocket对象。
    private static CopyOnWriteArraySet<MyWebSocket2> webSocketSet = new CopyOnWriteArraySet<MyWebSocket2>();

    //与某个客户端的连接会话，需要通过它来给客户端发送数据
    private Session session;

    private String id;
    
    private static ArrayList<String> queue=new ArrayList<>();
    
    
	/**
     * 连接建立成功调用的方法*/
    @OnOpen
    public void onOpen(@PathParam(value="id") String id,Session session) {
        this.session = session;
        this.id=id;
        webSocketSet.add(this);     //加入set中
        addOnlineCount();           //在线数加1
        System.out.println("有新连接加入！当前在线人数为" + getOnlineCount());
        
    }

    /**
     * 连接关闭调用的方法
     */
    @OnClose
    public void onClose() {
    	deleteQueue(id);
        webSocketSet.remove(this);  //从set中删除
        subOnlineCount();
        //在线数减1
        System.out.println("有一连接关闭！当前在线人数为" + getOnlineCount());
    }

    /**
     * 收到客户端消息后调用的方法
     *
     * @param message 客户端发送过来的消息*/
    @OnMessage
    public void onMessage(String message, Session session) {
        System.out.println("来自客户端的消息:" + message);
        Message msg=new Gson().fromJson(message,Message.class);
        //转发建立房间请求
        if(msg.getEvent().equals("joinQueue")){
        	 //排队，返回房间已有id
        	int n=addQueue(this.id);	
        	Message tmp=new Message();
        	tmp.setEvent("agreeJoin");
        	ArrayList<String> idGroup=new ArrayList<>();
        	for(int i=0;i<n-1;i++) {
        		idGroup.add(queue.get(i)); 	
        	}
        	tmp.setGroup(idGroup);
        	String tmp2=new Gson().toJson(tmp);
        	sendOne(tmp2,this.id);  	
        }else if(msg.getEvent().equals("_offer")) {
        	//转发offer
        	sendOne(message,msg.getGroup().get(0));
        } else if(msg.getEvent().equals("_answer")) {
        	 //转发answer
        	sendOne(message,msg.getGroup().get(0));
        }else if(msg.getEvent().equals("_ice_candidate")) {
        	//转发answer
        	String n=msg.getGroup().get(0);
        	sendOne(message,n);
        }
    }
    
    /*
     * 群发消息
     */
    public void sendAll(String message) {
    	for (MyWebSocket2 item : webSocketSet) {
        	synchronized (item){
	            try {
	                item.sendMessage(message);
	            } catch (IOException e) {
	                e.printStackTrace();
	            }
        	}
        }
	}
    /*
     * 定向发送消息
     */
    public void sendOne(String message,String id) {
    	if(message!=null&&id!=null) {	
    		for(MyWebSocket2 item:webSocketSet) {
    			if(item.id.equals(id)) {
    				synchronized (item){
    		            try {
    		                item.sendMessage(message);
    		            } catch (IOException e) {
    		                e.printStackTrace();
    		            }
    	        	}
    				break;
    			}
    		}
    	}
	
	}
    
    /*
     * 发生错误时调用
     */
    @OnError
    public void onError(Session session, Throwable error) {
        System.out.println("发生错误");
        error.printStackTrace();
    }
    /**
      * 排队等待得到连接任务
     * @param id
     */
    public static synchronized int addQueue(String id) {
        queue.add(id);
        return queue.size();
        
    }
    /**
     * 退出队列删除元素
     * @param message
     * @throws IOException
     */
    public static synchronized void deleteQueue(String id) {
        queue.remove(id);
    }
    
    public void sendMessage(String message) throws IOException {
        this.session.getBasicRemote().sendText(message);
    }

    public static synchronized int getOnlineCount() {
        return onlineCount;
    }

    public static synchronized void addOnlineCount() {
        MyWebSocket2.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
        MyWebSocket2.onlineCount--;
    }
}