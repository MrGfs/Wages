package com.whl.mappers;

import com.whl.model.Z;

import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface ZMapper {
	/**
	 * 查询年详细支出
	 * @param nian
	 * @return
	 */
    List<Z> yearOut(int nian);
    /**
     * 查询年详细收入
     * @param nian
     * @return
     */
    List<Z> yearIn(int nian); 
   }