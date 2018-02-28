package com.whl.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.whl.mappers.BrokMapper;
import com.whl.model.Brok;

@Service
public class BrokService {
	@Autowired
	private BrokMapper brokMapper;
	public List<Brok> selectBrok(){
		List<Brok> list=brokMapper.selectBrok();
		if (list.size()>0) {
			return list;
		}
		return null;
	}
	
	public boolean AddBrok(String name){
		if(brokMapper.AddBrok(name)>0){
			return true;
		}
		return false;
	}
	
}
