package com.whl.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.whl.mappers.ZMapper;
import com.whl.model.Z;

@Service
public class ZService {
	@Autowired
	private ZMapper zMapper;
	
	public List<Z> yearOut(int nian){
		List<Z> list=zMapper.yearOut(nian);
		if (list.size()>0) {
			return list;
		}
		return null;
	}
	
	public List<Z> yearIn(int nian){
		List<Z> list=zMapper.yearIn(nian);
		if (list.size()>0) {
			return list;
		}
		return null;
	}

	
}
