package com.example.syFinal.guest.model.dao;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class LoginDAOImpl implements LoginDAO {
	@Autowired
	SqlSession sqlSession;

	@Override
	public String chkPw(String g_email) {
		String passwd = sqlSession.selectOne("login.chkPw", g_email);
		return passwd;
	}

	@Override
	public Map<String, Object> login(String g_email, String g_passwd) {
		Map<String, Object> map1 = new HashMap<>();
		map1.put("g_email", g_email);
		map1.put("g_passwd", g_passwd);
		Map<String, Object> map = sqlSession.selectOne("login.login", map1);
		return map;
	}
	

	@Override
	public String searchEmail(String g_name, String g_phone) {
		Map<String, Object> map = new HashMap<>();
		map.put("g_name", g_name);
		map.put("g_phone", g_phone);
		String email = sqlSession.selectOne("login.searchEmail", map);
		return email;
	}

	@Override
	public int searchPw(String g_email, String g_name, String g_phone) {
		Map<String, Object> map = new HashMap<>();
		map.put("g_name", g_name);
		map.put("g_phone", g_phone);
		map.put("g_email", g_email);
		int check = sqlSession.selectOne("login.searchPw", map);
		return check;
	}
	
	@Override
	public void randomPw(String g_email, String randomPw) {
		Map<String, Object> map = new HashMap<>();
		map.put("g_email", g_email);
		map.put("randomPw", randomPw);
		sqlSession.update("login.randomPw", map);
	}

}
