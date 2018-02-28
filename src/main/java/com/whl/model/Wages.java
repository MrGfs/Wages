package com.whl.model;

import java.io.Serializable;
import java.util.Map;

/**
 * 年月 出勤 日基本工资
 * @author Mr.G
 *
 */
public class Wages implements Serializable{
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	private int id;
	private int nian;
	private int yue;
	private int chu;
	private double yjbgz;
	
	//esayUI
	private int page;//页数
	private int rows;//行数
	
	
	public Wages(){

	}
	public Wages(int page,int rows){
	
		page=(page<1?1:page);
		
		this.rows=(rows<1?1:rows);
		this.page=(page-1)*rows;
	}	
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getNian() {
		return nian;
	}
	public void setNian(int nian) {
		this.nian = nian;
	}
	public int getYue() {
		return yue;
	}
	public void setYue(int yue) {
		this.yue = yue;
	}
	public int getChu() {
		return chu;
	}
	public void setChu(int chu) {
		this.chu = chu;
	}
	public double getYjbgz() {
		return yjbgz;
	}
	public void setYjbgz(double yjbgz) {
		this.yjbgz = yjbgz;
	}
	public int getPage() {
		return page;
	}
	public int getRows() {
		return rows;
	}
	
	public static Wages toBean(Map<String, Object> d){
		Wages wages=new Wages();
		wages.setId(Integer.valueOf(d.get("id").toString()));
		wages.setNian(Integer.valueOf(d.get("nian").toString()));
		wages.setYue(Integer.valueOf(d.get("yue").toString()));
		wages.setChu(Integer.valueOf(d.get("chu").toString()));
		wages.setYjbgz(Double.valueOf(d.get("yjbgz").toString()));
		return wages;
		
	}


	
	
	
}
