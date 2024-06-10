package com.example.syFinal.admin.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.admin.model.dto.AdminDTO;

@Repository
public class AdminDAOImpl implements AdminDAO {

	@Autowired
	SqlSession sqlSession;

	@Override
	public Map<String, Object> alogin(String a_id, String a_passwd) {
		Map<String, Object> map = new HashMap<>();
		map.put("a_id", a_id);
		map.put("a_passwd", a_passwd);
		return sqlSession.selectOne("admin.a_login", map);
	}

	@Override
	public List<AdminDTO> chart(String strToday) {
		return sqlSession.selectList("admin.Achart", strToday);
	}
}