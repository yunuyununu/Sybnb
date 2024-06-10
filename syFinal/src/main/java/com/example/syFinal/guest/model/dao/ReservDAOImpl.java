package com.example.syFinal.guest.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.guest.model.dto.ReservDTO;

@Repository
public class ReservDAOImpl implements ReservDAO {
	@Autowired
	SqlSession sqlSession;
	
	@Override
	public List<ReservDTO> list(int g_idx) {
		return sqlSession.selectList("reserv.list", g_idx);
	}
	
	@Override
	public ReservDTO lastDetail(int o_idx) {
		return sqlSession.selectOne("reserv.lastDetail", o_idx);
	}
	
	@Override
	public List<ReservDTO> reservReview(int g_idx) {
		return sqlSession.selectList("reserv.reservReview", g_idx);
	}
	
	@Override
	public ReservDTO delDetail(int o_idx) {
		return sqlSession.selectOne("reserv.delDetail", o_idx);
	}
	
	@Override
	public String cancel(int o_idx, int g_idx) {
		String result = "";
		try {
			sqlSession.update("reserv.cancel", o_idx);
			sqlSession.update("reserv.down_pro",g_idx);
			result = "success";
		} catch (Exception e) {
			result = "fail";
		}
		return result;
	}
	
	@Override
	public void gPoint(Map<String,Object> map) {
		sqlSession.selectOne("reserv.gPoint", map);
	}
	
	@Override
	public ReservDTO upDetail(int o_idx) {
		return sqlSession.selectOne("reserv.upDetail", o_idx);
	}
	
	@Override
	public String insert(int g_idx, int ru_idx, String ru_startDate, String ru_endDate, int ru_adult, int ru_child, int ru_baby) {
		Map<String, Object> map = new HashMap<>();
		map.put("ru_idx", ru_idx);
		map.put("ru_startDate", ru_startDate);
		map.put("ru_endDate", ru_endDate);
		map.put("ru_adult", ru_adult);
		map.put("ru_child", ru_child);
		map.put("ru_baby", ru_baby);
		String result = "";
		try {
			sqlSession.insert("reserv.insert", map);
			sqlSession.update("reserv.state",ru_idx);
			sqlSession.update("reserv.down_pro",g_idx);
			result = "success";
		} catch (Exception e) {
			result = "fail";
		}
		return result;
	}
	
	@Override
	public int check(int ru_idx) {
		return sqlSession.selectOne("reserv.check", ru_idx);
	}
	
	@Override
	public String update(int g_idx, int ru_idx, String ru_startDate, String ru_endDate, int ru_adult, int ru_child, int ru_baby) {
		Map<String, Object> map = new HashMap<>();
		map.put("ru_idx", ru_idx);
		map.put("ru_startDate", ru_startDate);
		map.put("ru_endDate", ru_endDate);
		map.put("ru_adult", ru_adult);
		map.put("ru_child", ru_child);
		map.put("ru_baby", ru_baby);
		String result = "";
		try {
			sqlSession.update("reserv.update", map);
			sqlSession.update("reserv.state",ru_idx);
			sqlSession.update("reserv.down_pro",g_idx);
			result = "success";
		} catch (Exception e) {
			result = "fail";
		}
		return result;
	}
	
	@Override
	public ReservDTO confirm(int ru_idx) {
		return sqlSession.selectOne("reserv.confirm", ru_idx);
	}
	
	@Override
	public List<ReservDTO> date(int o_idx, int ho_idx, int o_didx) {
		Map<String, Object> map = new HashMap<>();
		map.put("ho_idx", ho_idx);
		map.put("o_didx", o_didx);
		map.put("o_idx", o_idx);
		return sqlSession.selectList("reserv.imp_date", map);
	}
	
	@Override
	public int room_count(int o_idx) {
		return sqlSession.selectOne("reserv.roomCount", o_idx);
	}
}
