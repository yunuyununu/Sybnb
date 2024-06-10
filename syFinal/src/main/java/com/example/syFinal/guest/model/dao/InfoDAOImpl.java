package com.example.syFinal.guest.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.guest.model.dto.GuestDTO;
import com.example.syFinal.guest.model.dto.MainDTO;

@Repository
public class InfoDAOImpl implements InfoDAO {
	@Autowired
	SqlSession sqlSession;
	
	@Override
	public int checkId(String g_email) {
		int count = sqlSession.selectOne("info.checkId", g_email);
		return count;
	}
	
	@Override
	public String join(String g_email, String g_passwd, String g_name, String g_phone) {
		String result = "";
		Map<String, Object> map = new HashMap<>();
		map.put("g_email", g_email);
		map.put("g_passwd", g_passwd);
		map.put("g_name", g_name);
		map.put("g_phone", g_phone);
		try {
			sqlSession.insert("info.join", map);
			result = "success";
		} catch (Exception e) {
			result = "fail";
		}
		
		return result;
	}
	
	@Override
	public GuestDTO detail(int g_idx) {
		GuestDTO dto = sqlSession.selectOne("info.detail", g_idx);
		return dto;
	}
	
	
	@Override
	public String update(GuestDTO dto) {
		String result = "";
		try {
			sqlSession.update("info.update", dto);
			result = "success";
		} catch (Exception e) {
			result = "fail";
		}
		return result;
	}
	
	@Override
	public int checkOrder(int g_idx) {
		return sqlSession.selectOne("info.checkOrder", g_idx);
	}
	
	@Override
	public String delete(int g_idx, String delete_id) {
		String result = "";
		Map<String, Object> map = new HashMap<>();
		map.put("g_idx", g_idx);
		map.put("delete_id", delete_id);
		try {
			sqlSession.delete("info.delete_message", g_idx);
			sqlSession.delete("info.delete", map);
			result = "success";
		} catch (Exception e) {
			result = "fail";
		}
		return result;
	}
	

}
