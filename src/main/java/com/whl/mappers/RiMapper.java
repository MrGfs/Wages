package com.whl.mappers;

import com.whl.model.Ri;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

@Repository
public interface RiMapper {
	/**
	 * 按条件查询生活费支取记录
	 * @param ri
	 * @return
	 */
    List<Ri> selectRi(Ri ri);
    /**
     * 统计记录数
     * @param ri
     * @return
     */
    int RiZnum(Ri ri);
    /**
     * 支取生活费
     * @param map
     * @return
     */
    int AddShf(Map<String, Object> map);
   }