package com.example.syFinal.guest.model.dao;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.guest.model.dto.MainDTO;

@Repository
public class WishDAOImpl implements WishDAO {
	@Autowired
	SqlSession sqlSession;

	@Override
	public List<MainDTO> wishlist(int g_idx) {
		return sqlSession.selectList("wish.wishlist", g_idx);
	}

	@Override
	public String firstRecent(int idx) {
		return sqlSession.selectOne("wish.firstRecent", idx);
	}

	@Override
	public int countWish(int g_idx) {
		int count = sqlSession.selectOne("wish.countWish", g_idx);
		return count;
	}

	@Override
	public List<MainDTO> firstWish(int g_idx) {
		return sqlSession.selectList("wish.firstWish", g_idx);
	}

	@Override
	public String delete(int w_idx) {
		String result = "";
		try {
			sqlSession.delete("wish.delete", w_idx);
			result = "success";
		} catch (Exception e) {
			result = "error";
		}
		return result;
	}

	@Override
	public MainDTO recentItem(Integer recentIdx) {
		return sqlSession.selectOne("wish.recentItem", recentIdx);
	}

	@Override
	public int recentCheck(int g_idx, Integer recentIdx) {
		Map<String, Object> map = new HashMap<>();
		map.put("recentIdx", recentIdx);
		map.put("g_idx", g_idx);
		return sqlSession.selectOne("wish.recentCheck", map);
	}

	@Override
	public String wishDelete(int g_idx, int h_idx) {
		String result = "";
		Map<String, Object> map = new HashMap<>();
		map.put("h_idx", h_idx);
		map.put("g_idx", g_idx);
		try {
			sqlSession.delete("wish.wishDelete", map);
			result = "success";
		} catch (Exception e) {
			result = "error";
		}
		return result;
	}

	@Override
	public String wishUpdate(int g_idx, int h_idx) {
		String result = "";
		Map<String, Object> map = new HashMap<>();
		map.put("h_idx", h_idx);
		map.put("g_idx", g_idx);
		try {
			sqlSession.update("wish.wishUpdate", map);
			result = "success";
		} catch (Exception e) {
			result = "error";
		}
		return result;
	}

	@Override
	public int sel_didx(int ho_idx) {
		return sqlSession.selectOne("wish.sel_didx", ho_idx);
	}

	

}
