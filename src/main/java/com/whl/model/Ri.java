package com.whl.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 生活费 经手人 天
 * @author Mr.G
 *
 */
public class Ri implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private int rid;
	private Wages ny;
	private int ri;
	private double shf;
	private Brok jsr;
	
	
	//esayUI
		private int page;//页数
		private int rows;//行数
	
	
	public Ri(){

	}
	public Ri(int page,int rows){
	
		page=(page<1?1:page);
		
		this.rows=(rows<1?1:rows);
		this.page=(page-1)*rows;
	}	
		
	

	public int getPage() {
		return page;
	}
	public int getRows() {
		return rows;
	}
	public int getRid() {
		return rid;
	}
	public void setRid(int rid) {
		this.rid = rid;
	}
	public Wages getNy() {
		return ny;
	}
	public void setNy(Wages ny) {
		this.ny = ny;
	}
	public int getRi() {
		return ri;
	}
	public void setRi(int ri) {
		this.ri = ri;
	}
	public double getShf() {
		return shf;
	}
	public void setShf(double shf) {
		this.shf = shf;
	}
	public Brok getJsr() {
		return jsr;
	}
	public void setJsr(Brok jsr) {
		this.jsr = jsr;
	}
	
	public static List<Ri> toBeans(List<Map<String,Object>> riMap){
		List<Ri> ris=new ArrayList<Ri>();
		for (Map<String,Object> map:riMap) {
			Ri ri=toBean(map);
			ris.add(ri);
		}
		return ris;
		
	}
	public static Ri toBean(Map<String,Object> map){
		
		Ri ri=new Ri();
		ri.setRid(Integer.valueOf(map.get("rid").toString()));
		Wages ny=Wages.toBean((Map<String, Object>) map.get("ny"));
		ri.setNy(ny);
		ri.setRi(Integer.valueOf(map.get("ri").toString()));
		Brok jsr=Brok.toBean((Map<String, Object>) map.get("jsr"));
		ri.setJsr(jsr);
		ri.setShf(Double.valueOf(map.get("shf").toString()));
		return ri;
	}
	
}
