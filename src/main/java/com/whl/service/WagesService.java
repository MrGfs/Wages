package com.whl.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.whl.mappers.WagesMapper;
import com.whl.model.Wages;

@Service
public class WagesService {
	@Autowired
	private WagesMapper wagesMapper;
	
	public List<Wages> selectWages(Wages wages){
		List<Wages> list=wagesMapper.selectWages(wages);
		if (list.size()>0) {
			return list;
		}
		return null;
	}
	public int WagesZnum(Wages wages){
		return wagesMapper.WagesZnum(wages);
		
	}
	
	public List<Integer> WagesAllNian() {
		return wagesMapper.WagesAllNian();
	}
	
	public List<Integer> WagesAllYueOfNian(int nian){
		return wagesMapper.WagesAllYueOfNian(nian);
	}
	
	public Wages WagesOfNy(Wages wages){
		return wagesMapper.WagesOfNy(wages);
	}
	
	public int updateWages(Wages wages){
		return wagesMapper.updateWages(wages);
	}
	
	
}
