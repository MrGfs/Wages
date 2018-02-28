package com.whl.mappers;

import java.util.List;
import java.util.Map;

import com.whl.model.Gz;

import org.springframework.stereotype.Repository;

@Repository
public interface GzMapper {
	List<Gz> OYearOfNYear(Map<String, Integer> map);
	
	List<Gz> OfYear(Gz gz);
	
	List<Gz> AllGz();
	
	void AddGz(Map<String, Integer> map);
	
	void UpGz(Map<String, Integer> map);
	
   }