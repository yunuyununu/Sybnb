package com.example.syFinal.host.model.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ChartDAOImpl implements ChartDAO {
	@Autowired
	SqlSession sqlSession;

	@Override
	public List lastSales(int h_idx) {
		List result = new ArrayList<>();
		try {
			List<Map<String, Object>> list = sqlSession.selectList("sales.lastMonth", h_idx);
			if (list != null && list.size() > 0) {
				for (Map<String, Object> map : list) {
					result.add(map.get("sales"));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public List thisSales(int h_idx) {
		List result = new ArrayList<>();
		try {
			List<Map<String, Object>> list = sqlSession.selectList("sales.thisMonth", h_idx);
			if (list != null && list.size() > 0) {
				for (Map<String, Object> map : list) {
					result.add(map.get("sales"));
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public List<Map<String, Object>> getHotelList(int h_idx) {
		List<Map<String, Object>> hotels = null;
		try {
			hotels = sqlSession.selectList("sales.getHotelList", h_idx);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return hotels;
	}

}
