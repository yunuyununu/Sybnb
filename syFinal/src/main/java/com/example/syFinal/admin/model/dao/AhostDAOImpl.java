package com.example.syFinal.admin.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.example.syFinal.admin.model.dto.AHostDTO;

@Repository
public class AhostDAOImpl implements AhostDAO {

	@Autowired
	SqlSession sqlSession;

	@Override
	public List<AHostDTO> list(String searchkey, String search) {
		Map<String, Object> map = new HashMap<>();
		map.put("search", search);
		map.put("searchkey", searchkey);
		return sqlSession.selectList("admin.ah_list", map);
	}
 
	@Override
	public String delete(int h_idx) {
		String result = "";
		try {
			sqlSession.delete("admin.ah_delete", h_idx);
			result = "success";
		} catch (Exception e) {
			result = "fail";
		}
		return result;
	}

	@Override
	public AHostDTO detail(int g_idx) {
		AHostDTO dto = sqlSession.selectOne("admin.ah_detail", g_idx);
		System.out.println("test");
		return dto;
	}
	
	@Override
	public AHostDTO check_file(int h_idx) {
		return sqlSession.selectOne("admin.a_fileCheck", h_idx);
	}

	@Override 
	public void a_approve(int h_idx) {
		sqlSession.update("admin.ah_approve", h_idx);
	}

}
 