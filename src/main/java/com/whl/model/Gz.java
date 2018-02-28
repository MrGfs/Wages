package com.whl.model;

import java.io.Serializable;

public class Gz implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int id;
	private int qnian;
	private int qyue;
	private int zyue;
	private boolean KN;
	
	public Gz(){}
	
	public Gz(int qnian){
		this.qnian=qnian;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getQnian() {
		return qnian;
	}
	public void setQnian(int qnian) {
		this.qnian = qnian;
	}
	public int getQyue() {
		return qyue;
	}
	public void setQyue(int qyue) {
		this.qyue = qyue;
	}
	public int getZyue() {
		return zyue;
	}
	public void setZyue(int zyue) {
		this.zyue = zyue;
	}

	public boolean isKN() {
		return KN;
	}

	public void setKN(boolean kN) {
		KN = kN;
	}

	
	
	

}
