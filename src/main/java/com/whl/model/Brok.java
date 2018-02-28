package com.whl.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 经手人
 * @author Mr.G
 *
 */
public class Brok  implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private int b_id;
	private String b_name;
	public int getB_id() {
		return b_id;
	}
	public void setB_id(int b_id) {
		this.b_id = b_id;
	}
	public String getB_name() {
		return b_name;
	}
	public void setB_name(String b_name) {
		this.b_name = b_name;
	}
	
	public static List<Brok> toBeans(List<Map<String, Object>> brok){
		List<Brok> broks=new ArrayList<Brok>();
		for (Map<String, Object> da:brok) {
			Brok brok2=toBean(da);
			broks.add(brok2);
		}
		return broks;
		
	} 
	public static Brok toBean(Map<String, Object> da){
		Brok brok2=new Brok();
		brok2.setB_id(Integer.valueOf(da.get("b_id").toString()));
		brok2.setB_name(da.get("b_name").toString());
		return brok2;
		
	}
	
}
