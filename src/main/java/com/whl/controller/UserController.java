package com.whl.controller;


import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Reader;
import java.io.Writer;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;


import com.whl.model.CheckMobile;
import com.whl.service.BrokService;
import com.whl.service.WagesService;





@Controller
//获取内网ip
public class UserController {
	private StringBuffer ip=new StringBuffer();
	private InetAddress addr;
	private static String  UserAgent;
	private static String os;
	private static FileOutputStream outputStream=null;
	private static FileInputStream inputStream=null;
	private static int num=0;
	private static Date d;
	private static SimpleDateFormat sdf;
	private  boolean isFromMobile=false;  
	private String string="";
	@Autowired
	private BrokService brokService;
	
	
	@RequestMapping("/index")
	public String Login(HttpServletRequest request){
		
	
		UserAgent =request.getHeader("User-Agent");
		if(UserAgent.toLowerCase()==null){
			UserAgent = "";  
		}
		isFromMobile=CheckMobile.check(UserAgent);  
		  if(isFromMobile){  
              string="Mindex.jsp";
          } else {  
              string="index.jsp";
          }  
		Os(request,null,"网页端");
		try {
			addr = (InetAddress) InetAddress.getLocalHost();
			ip.delete(0, ip.length());
			ip.append("http://"+addr.getHostAddress().toString()+":8080/Wa");
			String flg="http://127.0.0.1:8080/Wa";
			if (ip.indexOf(flg)>0) {
				ip.delete(0, ip.length());
				ip.append("请确认电脑已经联入网络");
			}
			System.out.println(ip);
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
		  
		
			request.getSession().setAttribute("ip", ip);
			request.getSession().setAttribute("Broks", brokService.selectBrok());
		return string;
	}
	/**
	 * 保存访问记录
	 * @param request
	 */
	protected static void Os(HttpServletRequest request,String os,String info){
		
		if(request!=null){
			os=UserAgent.substring(UserAgent.indexOf("(")+1,UserAgent.indexOf(")"));
			System.out.println("UserAgent"+UserAgent);
			System.out.println(os);			
		}else{
			os="Android客户端"+os;
		
		}

		
		try {
			String p=System.getProperty("catalina.home");
			System.out.println(p);
			File log=new File(p+"/log.xml");
			if (!log.exists()) {
				log.createNewFile();
				num=1;
			}else{
				 String line;
				 StringBuffer stringBuffer = new StringBuffer(); 
				inputStream=new FileInputStream(log);
				 //Reader :1）抽象类，2）面向字符的 I/O操作（16 位的Unicode字符） 。   
	            Reader reader = new InputStreamReader(inputStream, "UTF-8");   
	            //增加缓冲功能   
	            BufferedReader bufferedReader = new BufferedReader(reader);   
	            while ((line = bufferedReader.readLine()) != null) {   
	                stringBuffer.append(line);   
	            }   
	            if (bufferedReader != null) {   
	                bufferedReader.close();   
	            }  
	            num=0;
	            for(int i=0;i<stringBuffer.length();i++) {
	            	
	                if(stringBuffer.indexOf("$-", i)!=-1){
	                  i=stringBuffer.indexOf("$-", i);
	                  num++;
	                }
	                
	              }
	            num++;
			}
			outputStream=new FileOutputStream(log,true);
			Writer writer = new OutputStreamWriter(outputStream, "UTF-8");
			BufferedWriter bufferedWriter = new BufferedWriter(writer);
			d = new Date();
			sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//			outputStream.write(("\r\n\r\n$-"+(num)+"\r\n\r\n"+sdf.format(d)+"\r\n\r\nUserAgent : "+UserAgent+"\r\n\r\nOs : "+os+"\r\n\r\n").getBytes());
			bufferedWriter.write(("<log>\n\t<id> $-"+(num)+" </id>\n\t<data> "+sdf.format(d)+" </data>\n\t<UserAgent> "+UserAgent+" </UserAgent>\n\t<Os> "+os+"</Os>\n\t<Info> "+info+" </Info>\n</log>"));
			bufferedWriter.write(("\r\n"));
			bufferedWriter.flush();
			bufferedWriter.close();
			
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
        
	}
	
}
