package com.example.syFinal.admin.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.admin.model.dto.AGuestDTO;

@Repository
public class AGuestDAOImpl implements AGuestDAO {

	@Autowired
	SqlSession sqlSession;

	// 회원목록
	@Override
	public List<AGuestDTO> list(String searchkey, String search) {
		Map<String, Object> map = new HashMap<>();
		map.put("search", search);
		map.put("searchkey", searchkey);
		System.out.println("DATIMPL : " + searchkey);
		return sqlSession.selectList("admin.ag_list", map);
	}

	@Override
	public AGuestDTO detail(int g_idx) {
		AGuestDTO dto = sqlSession.selectOne("admin.ag_detail", g_idx);
		return dto;
	}

	@Override
	public String delete(int g_idx) {
		String result = "";
		try {
			sqlSession.delete("admin.ag_delete", g_idx);
			result = "success";
		} catch (Exception e) {
			result = "fail";
		}
		return result;
	}

	@Override
	public String update(AGuestDTO dto) {
		String result = "";
		try {
			sqlSession.update("admin.ag_update", dto);
			result = "success";
		} catch (Exception e) {
			result = "fail";
		}
		return result;
	}
}

		