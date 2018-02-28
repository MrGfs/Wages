package com.whl.mappers;

import com.whl.model.Brok;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface BrokMapper {
	/**
	 * 查询所有经手人
	 * @return
	 */
    List<Brok> selectBrok();
    /**
     * 添加经手人
     * @param brok
     * @return
     */
    int AddBrok(String name);
   }