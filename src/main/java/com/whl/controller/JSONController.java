package com.whl.controller;


import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;






import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


import com.sun.org.apache.regexp.internal.recompile;
import com.whl.model.Brok;
import com.whl.model.Gz;
import com.whl.model.Ri;
import com.whl.model.Wages;
import com.whl.model.Z;
import com.whl.service.BrokService;
import com.whl.service.GzService;
import com.whl.service.RiService;
import com.whl.service.WagesService;
import com.whl.service.ZService;

@Controller
public class JSONController {
	@Autowired
	private RiService riService;
	@Autowired
	private WagesService wagesService;
	@Autowired
	private ZService zService;
	@Autowired
	private BrokService brokService;
	@Autowired
	private GzService gzService;
	

	/**
	 * 按条件查询生活费支取记录
	 * @param page
	 * @param rows
	 * @param type
	 * @param nys
	 * @return
	 */
	//, method = RequestMethod.POST
	@RequestMapping(value="{shf}", method = RequestMethod.POST)	
	public @ResponseBody Map<String, Object> Shf( int page, int rows, String type, int ... nys ){
		System.out.println("页数"+page+"行数:"+rows);
		Ri ri=new Ri(page,rows);
		if(type!=null){
			try {
				type=new String(type.getBytes("ISO8859-1"),"UTF-8");
				
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
//		System.out.println("<"+type+","+nys[0]+">");
		 if (type!=null) {
			Wages ny=new Wages();
			if(type.equals("年")){
				ny.setNian(nys[0]);
				ri.setNy(ny);
			}
			if(type.equals("年月")){
				ny.setNian(nys[0]);
				ny.setYue(nys[1]);
				ri.setNy(ny);
			}
			if(type.equals("月")){
				ny.setYue(nys[0]);
				ri.setNy(ny);
			}
			if(type.equals("日")){
				ri.setRi(nys[0]);
				
			}
		}
		 

		 Map<String, Object> map=new HashMap<String, Object>();
		 map.put("total", riService.RiZnum(ri));
		 map.put("rows", riService.selectRi(ri));
		return map;
	} 
	/**
	 * 按条件查询月收入
	 * @param page
	 * @param rows
	 * @param type
	 * @param nys
	 * @return
	 */
	//, method = RequestMethod.POST
	@RequestMapping(value="sr.json", method = RequestMethod.POST)	
	public @ResponseBody Map<String, Object> Sr( int page, int rows, String type, int ... nys ){
		System.out.println("页数"+page+"行数:"+rows);
		Wages wages=new Wages(page,rows);
		if (type!=null) {
			try {
				type=new String(type.getBytes("ISO8859-1"),"UTF-8");
				
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			}
		}
		
		 if (type!=null) {
			
			if(type.equals("年")){
				wages.setNian(nys[0]);
			}
			if(type.equals("年月")){
				wages.setNian(nys[0]);
				wages.setYue(nys[1]);
				System.out.println("<"+type+","+nys[0]+":"+nys[1]+">");
			}
			if(type.equals("月")){
				wages.setYue(nys[0]);
			}
		}
		 
		 Map<String, Object> map=new HashMap<String, Object>();
		 map.put("total", wagesService.WagesZnum(wages));
		 map.put("rows", wagesService.selectWages(wages));
		return map;
	} 
	
	/**
	 * 年支出
	 * @param year
	 * @return
	 */
	@RequestMapping(value="yearOut.json", method = RequestMethod.POST)	
	public @ResponseBody List<Z> yearOut( int year) {
		return zService.yearOut(year);
	}
	/**
	 * 年收入
	 * @param year
	 * @return
	 */
	@RequestMapping(value="yearIn.json", method = RequestMethod.POST)	
	public @ResponseBody List<Z> yearIn( int year) {
		return zService.yearIn(year);
	}
	/**
	 * 支取生活费
	 * @param map
	 * @return
	 */
	@RequestMapping(value="AddShf", method = RequestMethod.POST)	
	public @ResponseBody int AddShf( String map){
		System.out.println(map);
		String[] data=map.split("-");
		for (String string : data) {
			System.out.println(string);
		}
		
		return riService.AddShf(data);
	}
	/**
	 * 添加经手人
	 * @param name
	 * @return
	 */
	@RequestMapping(value="AddJsr.action",method=RequestMethod.POST)
	public @ResponseBody boolean AddJsr( String name){
		if (!name.equals("")) {
			return brokService.AddBrok(name);
		}
		return false;
	}
	
	/**
	 * 设置工作时长
	 * @param nian
	 * @param yue
	 * @return
	 */
	@RequestMapping(value="YearGzsc",method=RequestMethod.POST)
	public @ResponseBody Gz YearGzsc(int nian,int yue){
		System.out.println("___________++++++++++++");
		Gz gzsc=new Gz();
		//上一年度是否包含nian年yue月
		Gz gz=gzService.OYearOfNYear(nian,yue);
		//是否有nian年度记录
		Gz gz2=null;
		
		if (gz==null) {
			gzsc.setKN(false);
			gz2=gzService.OfYear(nian);
		}else {
			gzsc.setKN(true);
			gz2=gzService.OfYear(nian-1);
		}
		
		if (gz2!=null){
			gz2.setKN(gzsc.isKN());
			gzsc=gz2;
		}
		
		return gzsc;
		
	}
	/**
	 * 用于Android连接测试的接口
	 * @param i
	 * @return
	 */
	@RequestMapping(value="Android",method=RequestMethod.POST)
	public @ResponseBody Map<String, Object> YearGzsc(int i){
		Map<String, Object> map=null;
		if (i==269048018) {
			map=new HashMap<String, Object>();
			UserController.Os(null,"连接成功","下载数据");
			//map.put("Mr.G", "Mr.G");
			Date  day=new Date();
			System.out.println(day.getYear()+1900);
			System.out.println(day.getMonth()+1);
			Gz gz=gzService.OYearOfNYear(day.getYear()+1900,day.getMonth()+1);
			int year=gz==null?day.getYear()+1900:gz.getQnian();
			
			map.put("yearout", yearOut(year));
			map.put("yearin", yearIn(year));
			map.put("shf", Shf(0, Integer.valueOf(Shf(0, 0, null, null).get("total").toString()), null, null).get("rows"));
			map.put("sr", Sr(0, Integer.valueOf(Sr(0, 0, null, null).get("total").toString()), null, null).get("rows"));
			
			
			map.put("AllBrok", AllBrok());
			map.put("AllGz", AllGz());
			System.out.println("-----------"+map.toString());
			return map;
		}
		return null;
		
	}
	/**
	 * 所有经手人
	 * @return
	 */
	@RequestMapping(value="AllBrok",method=RequestMethod.POST)
	public @ResponseBody List<Brok> AllBrok(){
		return brokService.selectBrok();
	}
	/**
	 * 所有工作时长
	 * @return
	 */
	@RequestMapping(value="AllGz",method=RequestMethod.POST)
	public @ResponseBody List<Gz> AllGz(){
		return gzService.AllGz();
	}
	
	
	/**
	 * 同步生活费
	 * @param ris
	 * @return
	 */
	@RequestMapping(value="TbRi",method=RequestMethod.POST)
	public @ResponseBody List<Ri>  AndroidTbRi(@RequestBody List<Map<String, Object>> ris){
		System.out.println(ris);
	
		List<Ri> ris2= Ri.toBeans(ris);
		List<Ri> ris3= new ArrayList<Ri>();
		for (Ri ri : ris2) {
			String [] data={String.valueOf(ri.getNy().getNian()),
					String.valueOf(ri.getNy().getYue()),
					String.valueOf(ri.getRi()),
					String.valueOf(ri.getNy().getYjbgz()),
					String.valueOf(ri.getShf()),
					String.valueOf(ri.getJsr().getB_id()),
					String.valueOf(ri.getNy().getChu())};
		
			if(riService.AddShf(data)>0){
				ris3.add(ri);
			}
		}
		if(ris3.size()>0){
			UserController.Os(null,null,"上传"+ris3.size()+"条生活费支取记录");
		}
		System.out.println(ris);
		return ris3;
	}
	/**
	 * 同步经手人
	 * @param brok
	 * @return
	 */
	@RequestMapping(value="TbBrok",method=RequestMethod.POST)
	public @ResponseBody List<Brok>  AndroidTbBrok(@RequestBody List<Map<String, Object>> brok){
		List<Brok> broks=Brok.toBeans(brok);
		List<Brok> broks2=new ArrayList<Brok>();
		for (Brok brok2 : broks) {
			if(brokService.AddBrok(brok2.getB_name())){
				broks2.add(brok2);
			}
		}	
		if(broks2.size()>0){
			UserController.Os(null,null,"上传"+broks2.size()+"条经手人信息");
		}
		return broks2;
	}
	
	
	/**
	 * 所有年
	 * @return
	 */
	@RequestMapping(value="WagesAllNian",method=RequestMethod.POST)
	public @ResponseBody List<Integer> WagesAllNian(){
		return wagesService.WagesAllNian();
	}
	/**
	 * x年所有月
	 * @param nian
	 * @return
	 */
	@RequestMapping(value="WagesAllYueOfNian",method=RequestMethod.POST)
	public @ResponseBody List<Integer> WagesAllYueOfNian(int nian){
		return wagesService.WagesAllYueOfNian(nian);
	}
	/**
	 * 按年月查询收入
	 * @param nian
	 * @param yue
	 * @return
	 */
	@RequestMapping(value="WagesOfNy",method=RequestMethod.POST)
	public @ResponseBody Wages WagesOfNy(int nian ,int yue){
		Wages wages=new Wages();
		wages.setNian(nian);
		wages.setYue(yue);
		return wagesService.WagesOfNy(wages);
	}
	/**
	 * 修改出勤  日基本工资
	 * @param nian
	 * @param yue
	 * @param yjbgz
	 * @param chu
	 * @return
	 */
	@RequestMapping(value="upWages",method=RequestMethod.POST)
	public @ResponseBody int updateWages(int nian ,int yue,double yjbgz,int chu){
		Wages wages=new Wages();
		wages.setNian(nian);
		wages.setYue(yue);
		wages.setChu(chu);
		wages.setYjbgz(yjbgz);
		return wagesService.updateWages(wages);
	}
	/**
	 * 添加年度时长
	 * @param qn
	 * @param qy
	 * @param zy
	 * @return
	 */
	@RequestMapping(value="AddGz",method=RequestMethod.POST)
	public @ResponseBody int AddGz(int qn,int qy,int zy){
		return gzService.AddGz(qn, qy, zy);
	}
	/**
	 * 按年查询年度时长
	 * @param nian
	 * @return
	 */
	@RequestMapping(value="OfYear",method=RequestMethod.POST)
	public @ResponseBody Gz OfYear(int nian){
		return gzService.OfYear(nian);
	}
	/**
	 * 修改年度时长
	 * @param qn
	 * @param qy
	 * @param zy
	 * @return
	 */
	@RequestMapping(value="UpGz",method=RequestMethod.POST)
	public @ResponseBody int[] UpGz(int qn,int qy,int zy){
		return gzService.UpGz(qn, qy, zy);
	}
	//直接接收对象
//	@RequestMapping(value="TbBrok",method=RequestMethod.POST)
//	public @ResponseBody List<Brok>  AndroidTbBrok(HttpServletRequest request){
//		
//	
//		
//		List<Brok> brok = null;
//		UserController.Os(null, "测试");
//		ServletInputStream in;
//		try {
//			in = request.getInputStream();
//			
//			  ObjectInputStream obj=new ObjectInputStream(in);
//			  brok=(List<Brok>) obj.readObject();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (ClassNotFoundException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		System.out.println(brok.size());
//		
//		
//		return brok;
//	}
	
	
	
	
}
