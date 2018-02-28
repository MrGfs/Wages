package com.whl.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.whl.mappers.RiMapper;
import com.whl.model.Ri;

@Service
public class RiService {
	@Autowired
	private RiMapper riMapper;
	public List<Ri> selectRi(Ri ri){
		List<Ri> list=riMapper.selectRi(ri);
		if (list.size()>0) {
			return list;
		}
		return null;
	}
	public int RiZnum(Ri ri){
		return riMapper.RiZnum(ri);
	}
	public int AddShf(String[] data){
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("nian", data[0]);
		map.put("yue", data[1]);
		map.put("ri", data[2]);
		map.put("rjbgz", data[3]);
		map.put("shf", data[4]);
		map.put("bid", data[5]);
		map.put("chu", data[6]);
		riMapper.AddShf(map);
		return Integer.valueOf( map.get("flg").toString());
	}
	
}
