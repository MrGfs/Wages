package com.whl.mappers;


import java.util.List;

import org.springframework.stereotype.Repository;

import com.whl.model.Wages;

@Repository
public interface WagesMapper {
	/**
	 * 按条件查询收入
	 * @return
	 */
    List<Wages> selectWages(Wages wages);
    
    int WagesZnum(Wages wages);
    
    List<Integer> WagesAllNian();
    
    List<Integer> WagesAllYueOfNian(int nian);
    
    Wages WagesOfNy(Wages wages);
    
    int updateWages(Wages wages);
    
   }