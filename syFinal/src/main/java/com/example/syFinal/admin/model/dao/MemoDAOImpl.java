package com.example.syFinal.admin.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.syFinal.admin.model.dto.MemoDTO;


@Repository
public class MemoDAOImpl implements MemoDAO {
	
	@Autowired
	SqlSession sqlSession;
	
	@Override
	public List<MemoDTO> list(int start, int end) {
		 Map<String, Integer> params = new HashMap<>();
	        params.put("start", start);
	        params.put("end", end);
	        return sqlSession.selectList("memo.list", params);
	}

	@Override
	public void insert(Map<String, Object> map) {
		 sqlSession.update("memo.insert", map);	  
		 }
	
	@Override
	public String delete(int me_idx) {	
		String result = "";
		try {
			sqlSession.delete("memo.delete", me_idx);
			result = "success";
		} catch (Exception e) {
			result = "fail";
		}
		return result;
	}

	@Override
	public void update(MemoDTO dto) {
		 sqlSession.update("memo.update", dto);	
	}

	@Override
	public int count() {
		return sqlSession.selectOne("memo.count");
	}
}