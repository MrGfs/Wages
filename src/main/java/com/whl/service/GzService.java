package com.whl.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.whl.mappers.GzMapper;
import com.whl.model.Gz;

@Service
public class GzService {
	@Autowired
	private GzMapper gzMapper;

	public Gz OYearOfNYear(int nian,int yue){
		Map<String, Integer> map=new HashMap<String, Integer>();
		map.put("NYear", nian);
		map.put("NYue", yue);
		List<Gz> gzs=gzMapper.OYearOfNYear(map);
		if (gzs.size()>0) {
			return gzs.get(0);
		}
		return null;
	}
	
	public Gz OfYear(int nian){
		Gz gz=new Gz(nian);
		List<Gz> gzs=gzMapper.OfYear(gz);
		if (gzs.size()>0) {
			return gzs.get(0);
		}
		return null;
	}
	
	public List<Gz> AllGz(){
		
		return gzMapper.AllGz();
	}
	
	public int AddGz(int qn,int qy,int zy){
		Map<String, Integer> map=new HashMap<String, Integer>();
		map.put("qnian", qn);
		map.put("qyue", qy);
		map.put("znian", zy);
		gzMapper.AddGz(map);
		return map.get("flg");
	}
	public int[] UpGz(int qn,int qy,int zy){
		Map<String, Integer> map=new HashMap<String, Integer>();
		map.put("qnian", qn);
		map.put("qyue", qy);
		map.put("znian", zy);
		gzMapper.UpGz(map);
		System.out.println(map.get("flg"));
		System.out.println(map.get("yue"));
		int da[]={map.get("flg"),map.get("yue")};
		return da;
	}
	
	
}
