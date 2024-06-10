package com.example.syFinal.admin.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.admin.model.dto.ANoticeDTO;

@Repository
public class ANoticeDAOImpl implements ANoticeDAO {

	@Autowired
	SqlSession sqlSession;

	public List<ANoticeDTO> list(String searchkey, String search) {
		Map<String, Object> map = new HashMap<>();
		map.put("searchkey", searchkey);
		map.put("search", search);
		return sqlSession.selectList("notice.list", map);
	}

	public ANoticeDTO detail(int n_idx) {
		return sqlSession.selectOne("notice.detail", n_idx);
	}

	public String delete(int n_idx) {
		String result = "";
		try {
			sqlSession.delete("notice.delete", n_idx);
			result = "success";
		} catch (Exception e) {
			result = "fail";
		}
		return result;
	}

	@Override
	public void insert(Map<String, Object> map) {
		sqlSession.insert("notice.insert", map);

	}

	@Override
	public int update(int n_idx, String n_writer, String n_title, String n_content, String n_date) {
		Map<String, Object> params = new HashMap<>();
		params.put("n_idx", n_idx);
		params.put("n_writer", n_writer);
		params.put("n_title", n_title);
		params.put("n_content", n_content);
		params.put("n_date", n_date);
		return sqlSession.update("notice.update", params);
	}

}